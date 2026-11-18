# Staff knowledge base: business rules

This knowledge base lists the rules the suma software enforces, written for staff who are not engineers. There is one file per area. Each file is a set of tables, and each table row is one rule.

How to read a row:

- **Rule (plain English)**: what the software does or refuses to do.
- **Symptom staff would see**: what you or a member would notice when the rule applies, such as an error message or a missing item.
- **Fix in admin**: what to change in the admin app to resolve it. Some rows say an engineer is needed.
- **Severity**: `error` means something is blocked or broken, `warning` means it works but can surprise you, `info` is background knowledge.
- **file:line**: where the rule lives in the code. You can ignore it. Give it to an engineer if you need to ask about the rule.

A row marked **UNVERIFIED** could not be fully confirmed from the code. Treat it as a lead, and ask an engineer before relying on it.

Rules that involve two areas appear in both files, under "Cross-area rules". Each file ends with a "Skipped (plumbing)" list of code that was checked and holds no business rule.

## Areas

| Area | File | Rules | UNVERIFIED |
|---|---|---|---|
| checkout | [checkout.md](checkout.md) | 81 | 4 |
| offerings | [offerings.md](offerings.md) | 78 | 2 |
| orders | [orders.md](orders.md) | 57 | 6 |
| products | [products.md](products.md) | 71 | 2 |
| programs | [programs.md](programs.md) | 60 | 1 |

Rule counts include the "Rules" and "Cross-area rules" sections of each file. A cross-area rule is counted once in each file it appears in.

## Top rules most likely to break things for members

1. **An offering with no programs attached is closed to every member**, even when its dates are right. A member can only see an offering, change the cart, start checkout, or place the order if they are eligible right now for at least one program attached to it. Otherwise they get a 403 "eligibility_violation" error. Attach at least one program on the Offering page. (checkout, offerings, orders, products, programs: `lib/suma/program/has.rb:23-39`; `lib/suma/eligibility.rb:13`; `lib/suma/api/commerce.rb:29,38,159`; `lib/suma/api.rb:49-52`)
2. **A program with no eligibility requirements is available to nobody in the live system.** A brand-new program, and every offering, vendor account, and mobility pricing attached only to it, shows for no members until a requirement is attached. (programs: `lib/suma/eligibility.rb:13`; `lib/suma/eligibility/resource.rb:61-73`; `lib/suma/eligibility/evaluation.rb:75`)
3. **A member only gets a program while the current time is inside its period.** The moment the period ends, the program and everything attached only to it disappears from the app. (programs: `lib/suma/eligibility/resource.rb:36-48,77-78`)
4. **Members can only see and use an offering while the current time is inside its open period.** Outside it, the offering is missing from the list, and direct links, cart changes, and starting checkout return "Forbidden" (403). (offerings: `lib/suma/api/commerce.rb:29,36-37,82,98`; `lib/suma/commerce/offering.rb:149,166-168`)
5. **A member who is not verified cannot place an order.** When "onboarding verified" is empty, they see a red "not verified" message and no button to place the order. (checkout: `lib/suma/commerce/checkout.rb:117,176-181`; `lib/suma/member.rb:254-255`; `webapp/src/pages/FoodCheckout.jsx:370-372,420-425`)
6. **A product with no category breaks the whole offering page.** Price calculation fails, and every member gets an "internal error" when any product in the offering has no category. The product form lets staff save a product without a category. (products: `lib/suma/payment/ledger.rb:220-225`; `lib/suma/admin_api/commerce_products.rb:54`)
7. **Checkout cannot start if any cart item has no open listing or its quantity is above the current maximum.** The maximum comes from stock, the per-member limit, the offering limits, or the default of 12. Limits are not checked when the cart is changed, only at checkout. A closed offering product gives the member "product unavailable" (409) until staff re-open the listing or the member removes the item. (checkout, offerings: `lib/suma/commerce/cart.rb:81-101,114-145,258-263`; `lib/suma/commerce/cart_item.rb:38-42`; `lib/suma/api/commerce.rb:103-108`)
8. **Stock and order limits are checked again when the order is placed, and eligibility is too.** If any item is over what is still allowed, no order is created and the member gets a 403 "max quantity exceeded" error. If the program closed or the member lost eligibility after starting checkout, the order is not placed. (checkout, orders, programs: `lib/suma/commerce/checkout.rb:246-256`; `lib/suma/api/commerce.rb:156-159,181-182`; `lib/suma/api.rb:49-52`)
9. **Changing a price or closing an offering product while a member is checking out breaks that checkout.** The member gets "max quantity exceeded" (403) at the final step even though stock is available, and must start checkout again. Every save of the Update Offering Product form closes the listing and creates a new one, even with no price change, and resets the per-member purchase count. (offerings, products: `lib/suma/commerce/checkout.rb:118,246-256`; `lib/suma/commerce/cart.rb:115`; `lib/suma/commerce/offering_product.rb:90`; `lib/suma/api/commerce.rb:181-182`; `lib/suma/admin_api/commerce_offering_products.rb:39-49`)
10. **When a product has more than one listing in an offering (after a re-price or re-list), a cart item does not reliably use the open one.** A member with the product already in the cart can still get "product unavailable" or see the old price. No admin fix; an engineer is needed. (checkout: `lib/suma/commerce/cart_item.rb:14-36,38-42`; `lib/suma/commerce/cart.rb:65,260-264`)
11. **A negative customer price can be saved on an offering product.** Nothing stops staff from saving it. Members then get an "internal error" when opening the offering or checking out. (products: `lib/suma/admin_api/commerce_offering_products.rb:27-28`; `lib/suma/payment/account.rb:110`)
12. **A missing out-of-stock message gives members an "internal error" (500) instead of the offering page.** This happens when a product has no text for its out-of-stock reason and the "cart_quantity_reason.out_of_stock" static string is also missing. (checkout: `lib/suma/commerce/cart.rb:153-155`; `lib/suma/i18n/static_string.rb:61-64`; `lib/suma/postgres/model_utilities.rb:171-180`; `lib/suma/service.rb:249-272`)
13. **Once the offering's "max ordered items cumulative" total is reached, every product in the offering shows as out of stock for everyone.** Canceled orders do not count toward the total. (offerings: `lib/suma/commerce/cart.rb:131-133`; `lib/suma/commerce/offering.rb:113,140-146`)
14. **With Limited Quantity on, a product is out of stock when Quantity On Hand minus Quantity Pending Fulfillment is zero or less.** Members see "Out of stock" and cannot order it. Staff can type any number into these fields, including a wrong one. (products: `lib/suma/commerce/cart.rb:122-123`; `lib/suma/admin_api/commerce_products.rb:55-60`)
15. **Placing an order holds stock, and cancel and fulfillment steps done in the wrong order leave the held number wrong.** "Quantity pending fulfillment" goes up when an order is placed. Pressing "unfulfill" after canceling a fulfilled order leaves stock held forever, so a limited-quantity product looks out of stock when it is not. (orders: `lib/suma/commerce/order.rb:109-112,143,182-188`; `lib/suma/commerce/checkout.rb:258`)
16. **If the offering has no "begin fulfillment at" time, orders never start fulfillment on their own.** They sit at "unfulfilled" and members never get a "claim" option until staff press "begin fulfillment" on each order. (orders: `lib/suma/commerce/order.rb:216`; `lib/suma/commerce/offering.rb:162-164,177`; `lib/suma/async/offering_schedule_fulfillment.rb:15`)
17. **A member can claim an order only while it is "fulfilling" and only for pickup (or no fulfillment option).** Delivery orders can never be claimed by the member; staff must use "end fulfillment". Otherwise the member gets a 409 "Order cannot be claimed" error. (orders: `lib/suma/commerce/order.rb:104-106,220-226`; `lib/suma/api/commerce.rb:242-246`)
18. **Starting a mobility trip is refused in three cases.** The member is read-only, their cash balance is below the minimum (any negative balance with default settings), or the rate costs money and they have no default payment method. (programs: `lib/suma/vendor/service.rb:47-50,54-61`; `lib/suma/mobility/trip.rb:61`; `lib/suma/payment.rb:125-136`)
