# Staff KB handoff

Note for the next session continuing the staff knowledge base of business rules.

## Done

- `rules/offerings.md`: 78 rules, 2 UNVERIFIED.
- `rules/products.md`: 71 rules, 2 UNVERIFIED.
- `rules/checkout.md`: 81 rules, 4 UNVERIFIED.
- `rules/orders.md`: 57 rules, 6 UNVERIFIED.
- `rules/programs.md`: 60 rules, 1 UNVERIFIED.
- `rules/INDEX.md`: counts and top member-breaking rules.

## How to run

Run `staff-kb-rules.workflow.js` (in this directory) with the Workflow tool, passing `args.areas`.
Each area is `{name, files, api, admin}`. Per area it runs extractor, reviewer, fixer in sequence, then one index agent.
The last run used 7 agents and about 1.04M subagent tokens for 2 areas.
Check `rules/` first and leave out areas that already have a file. The script does not check this itself.
Commit and push to the session branch when done.

## Next areas, in order

1. `eligibility` (`lib/suma/eligibility/`). A program with no eligibility requirements is available to nobody.
2. `payments` (`lib/suma/payment/`).
3. `members`.

Later: `vendors`, `mobility`, `organizations`. Confirm file lists before running.
The second run used 10 agents and about 1.48M subagent tokens for 3 areas.

## Open items

- Likely bugs found, not fixed, not filed: a product with no category makes the offering page fail (`lib/suma/payment/ledger.rb:220-225`); a negative customer price saves and then fails (`lib/suma/admin_api/commerce_offering_products.rb:27-28`).
- The 15 UNVERIFIED rows need an engineer.
- Found in the second run, not filed: a cart item does not reliably use the open listing after a re-price (`lib/suma/commerce/cart_item.rb:14-36`); "unfulfill" after canceling a fulfilled order leaves stock held (`lib/suma/commerce/order.rb:182-188`).
- Agent citations were checked only by the workflow reviewer, not by hand.
- Shared admin rules (`lib/suma/admin_api/common_endpoints.rb`, `access.rb`, role access) repeat in every area file. Consider one `admin-access.md` area.
