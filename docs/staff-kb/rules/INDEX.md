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
| offerings | [offerings.md](offerings.md) | 78 | 2 |
| products | [products.md](products.md) | 71 | 2 |

Rule counts include the "Rules" and "Cross-area rules" sections of each file. A cross-area rule is counted once in each file it appears in.

## Top rules most likely to break things for members

1. **An offering with no programs attached is hidden from every member**, even when its dates are right. A member must also be eligible through one of the offering's programs to see its products or check out. Attach at least one program on the Offering page. (offerings, products: `lib/suma/program/has.rb:36-39`; `lib/suma/eligibility.rb:13`)
2. **A product with no category breaks the whole offering page.** Price calculation fails, and every member gets an "internal error" when any product in the offering has no category. The product form lets staff save a product without a category. (products: `lib/suma/payment/ledger.rb:220-225`; `lib/suma/admin_api/commerce_products.rb:54`)
3. **Members can only see and use an offering while the current time is inside its open period.** Outside it, the offering is missing from the list, and direct links, cart changes, and starting checkout return "Forbidden" (403). (offerings: `lib/suma/api/commerce.rb:29,36-37,82,98`; `lib/suma/commerce/offering.rb:149,166-168`)
4. **Changing a price or closing an offering product while a member is checking out breaks that checkout.** The member gets "max quantity exceeded" (403) at the final step even though stock is available, and must start checkout again. Every save of the Update Offering Product form closes the listing and creates a new one, even with no price change, and resets the per-member purchase count. (offerings, products: `lib/suma/commerce/checkout.rb:118,246-256`; `lib/suma/commerce/cart.rb:115`; `lib/suma/commerce/offering_product.rb:90`; `lib/suma/api/commerce.rb:181-182`; `lib/suma/admin_api/commerce_offering_products.rb:39-49`)
5. **A negative customer price can be saved on an offering product.** Nothing stops staff from saving it. Members then get an "internal error" when opening the offering or checking out. (products: `lib/suma/admin_api/commerce_offering_products.rb:27-28`; `lib/suma/payment/account.rb:110`)
6. **Once the offering's "max ordered items cumulative" total is reached, every product in the offering shows as out of stock for everyone.** Canceled orders do not count toward the total. (offerings: `lib/suma/commerce/cart.rb:131-133`; `lib/suma/commerce/offering.rb:113,140-146`)
7. **With Limited Quantity on, a product is out of stock when Quantity On Hand minus Quantity Pending Fulfillment is zero or less.** Members see "Out of stock" and cannot order it. Staff can type any number into these fields, including a wrong one. (products: `lib/suma/commerce/cart.rb:122-123`; `lib/suma/admin_api/commerce_products.rb:55-60`)
8. **Checkout cannot start if any cart item no longer has an open listing in the offering.** This happens when its offering product was closed. The member gets "product unavailable" (409) until staff re-open the listing or the member removes the item. (offerings: `lib/suma/commerce/cart.rb:260`; `lib/suma/commerce/cart_item.rb:38-42`; `lib/suma/api/commerce.rb:105-106`)
