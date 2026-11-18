# Staff KB handoff

Note for the next session continuing the staff knowledge base of business rules.

## Done

- `rules/offerings.md`: 78 rules, 2 UNVERIFIED.
- `rules/products.md`: 71 rules, 2 UNVERIFIED.
- `rules/INDEX.md`: counts and top member-breaking rules.

## How to run

Run `staff-kb-rules.workflow.js` (in this directory) with the Workflow tool, passing `args.areas`.
Each area is `{name, files, api, admin}`. Per area it runs extractor, reviewer, fixer in sequence, then one index agent.
The last run used 7 agents and about 1.04M subagent tokens for 2 areas.
Check `rules/` first and leave out areas that already have a file. The script does not check this itself.
Commit and push to the session branch when done.

## Next areas, in order

1. `checkout` (carts and checkout). Most cited outside code in the two finished files: `cart.rb` 65 citations, `checkout.rb` 36.
   - files: `lib/suma/commerce/cart.rb`, `cart_item.rb`, `checkout.rb`, `checkout_item.rb`
   - api: `lib/suma/api/commerce.rb`; admin: none of its own
2. `orders`.
   - files: `lib/suma/commerce/order.rb`, `order_audit_log.rb`
   - api: `lib/suma/api/commerce.rb`; admin: `lib/suma/admin_api/commerce_orders.rb`
3. `programs`. An offering with no program is hidden from all members.
   - files: `lib/suma/program.rb`, `lib/suma/program/has.rb`, `pricing.rb`, `service_revoker.rb`
   - admin: `lib/suma/admin_api/programs.rb`, `program_pricings.rb`

Later: `eligibility` (`lib/suma/eligibility/`), `payments` (`lib/suma/payment/`), `members`, `vendors`, `mobility`, `organizations`.

## Open items

- Likely bugs found, not fixed, not filed: a product with no category makes the offering page fail (`lib/suma/payment/ledger.rb:220-225`); a negative customer price saves and then fails (`lib/suma/admin_api/commerce_offering_products.rb:27-28`).
- The 4 UNVERIFIED rows need an engineer.
- Agent citations were checked only by the workflow reviewer, not by hand.
- Shared admin rules (`lib/suma/admin_api/common_endpoints.rb`, `access.rb`, role access) repeat in every area file. Consider one `admin-access.md` area.
