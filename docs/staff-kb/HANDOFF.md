# Staff KB handoff

Note for the next session continuing the staff knowledge base of business rules.

## Done

- `rules/offerings.md`: 78 rules, 2 UNVERIFIED.
- `rules/products.md`: 71 rules, 2 UNVERIFIED.
- `rules/checkout.md`: 81 rules, 4 UNVERIFIED.
- `rules/orders.md`: 57 rules, 6 UNVERIFIED.
- `rules/programs.md`: 60 rules, 1 UNVERIFIED.
- `rules/eligibility.md`: 75 rules, 3 UNVERIFIED.
- `rules/payments.md`: 140 rules, 3 UNVERIFIED.
- `rules/members.md`: 116 rules, 2 UNVERIFIED.
- `rules/INDEX.md`: counts and top member-breaking rules.

## How to run

Run `staff-kb-rules.workflow.js` (in this directory) with the Workflow tool, passing `args.areas`.
Each area is `{name, files, api, admin}`. Per area it runs extractor, reviewer, fixer in sequence, then one index agent.
The last run used 7 agents and about 1.04M subagent tokens for 2 areas.
Check `rules/` first and leave out areas that already have a file. The script does not check this itself.
Commit and push to the session branch when done.

## Next areas, in order

1. `vendors` (`lib/suma/vendor/`).
2. `mobility` (`lib/suma/mobility/`).
3. `organizations` (`lib/suma/organization/`, including registration links).

Confirm file lists before running.
The second run used 10 agents and about 1.48M subagent tokens for 3 areas.
The third run used 10 agents and about 1.73M subagent tokens for 3 areas.

## Open items

- Likely bugs found, not fixed, not filed: a product with no category makes the offering page fail (`lib/suma/payment/ledger.rb:220-225`); a negative customer price saves and then fails (`lib/suma/admin_api/commerce_offering_products.rb:27-28`).
- The 23 UNVERIFIED rows (678 rules total) need an engineer.
- Found in the second run, not filed: a cart item does not reliably use the open listing after a re-price (`lib/suma/commerce/cart_item.rb:14-36`); "unfulfill" after canceling a fulfilled order leaves stock held (`lib/suma/commerce/order.rb:182-188`).
- Found in the third run, to confirm with an engineer: the SMS allow list defaults to empty, so production must set it or no sign-in codes are sent (`lib/suma/message/transport/sms.rb:10,54-56`); a failed "add funds" request shows members a generic 500 (`lib/suma/api/payments.rb:18-28`); paying by bank account outside banking hours fails with a generic server error (`lib/suma/payment/funding_transaction/increase_ach_strategy.rb:31-33`).
- Agent citations were checked only by the workflow reviewer, not by hand.
- Shared admin rules (`lib/suma/admin_api/common_endpoints.rb`, `access.rb`, role access) repeat in every area file. Consider one `admin-access.md` area.
