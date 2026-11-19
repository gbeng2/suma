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
- `rules/vendors.md`: 118 rules, 3 UNVERIFIED. Includes private vendor accounts (`lib/suma/anon_proxy/`).
- `rules/mobility.md`: 108 rules, 2 UNVERIFIED.
- `rules/organizations.md`: 104 rules, 4 UNVERIFIED. Includes registration links.
- `rules/lime.md`: 115 rules, 0 UNVERIFIED. Lime member journey: link account, ride, trip import, charging, violations, revocation.
- `rules/lyft.md`: 73 rules, 3 UNVERIFIED. Lyft Pass member journey.
- `rules/INDEX.md`: counts and top member-breaking rules.

## How to run

Run `staff-kb-rules.workflow.js` (in this directory) with the Workflow tool, passing `args.areas`.
Each area is `{name, files, api, admin}`. Per area it runs extractor, reviewer, fixer in sequence, then one index agent.
The last run used 7 agents and about 1.04M subagent tokens for 2 areas.
Check `rules/` first and leave out areas that already have a file. The script does not check this itself.
Commit and push to the session branch when done.

## Next areas

All eleven planned areas are done, plus `lime` and `lyft`. Candidates not yet covered: messaging (`lib/suma/message/`), a shared `admin-access` area (see open items), and marketing or other directories under `lib/suma/` with no rules file.
Confirm file lists before running.
The second run used 10 agents and about 1.48M subagent tokens for 3 areas.
The third run used 10 agents and about 1.73M subagent tokens for 3 areas.
The fourth run used 10 agents and about 1.66M subagent tokens for 3 areas. Its first attempt failed on a usage limit and was resumed with `resumeFromRunId`.
The fifth run (lime, lyft) used 7 agents and about 1.18M subagent tokens. A scope note was passed as the last entry of `files`, since the script has no note field.

## Open items

- Likely bugs found, not fixed, not filed: a product with no category makes the offering page fail (`lib/suma/payment/ledger.rb:220-225`); a negative customer price saves and then fails (`lib/suma/admin_api/commerce_offering_products.rb:27-28`).
- The 35 UNVERIFIED rows (1,196 rules total) need an engineer.
- Found in the second run, not filed: a cart item does not reliably use the open listing after a re-price (`lib/suma/commerce/cart_item.rb:14-36`); "unfulfill" after canceling a fulfilled order leaves stock held (`lib/suma/commerce/order.rb:182-188`).
- Found in the third run, to confirm with an engineer: the SMS allow list defaults to empty, so production must set it or no sign-in codes are sent (`lib/suma/message/transport/sms.rb:10,54-56`); a failed "add funds" request shows members a generic 500 (`lib/suma/api/payments.rb:18-28`); paying by bank account outside banking hours fails with a generic server error (`lib/suma/payment/funding_transaction/increase_ach_strategy.rb:31-33`).
- Found in the fourth run, to confirm with an engineer: the member map shows the price from the rate with the highest ordinal, but the Lime trip import charges with the lowest (`lib/suma/api/mobility.rb:41-42`; `lib/suma/lime/sync_trips_from_report.rb:196`); one bad Lime report blocks all later Lime trip imports (`lib/suma/lime/sync_trips_from_report.rb:172-174`); editing a rate without re-entering its ordering number resets it to 0 (`lib/suma/program/pricing.rb:24`); a service on the map with no mobility adapter gives a server error on vehicle tap (`lib/suma/api/mobility.rb:281`).
- Found in the fifth run, to confirm with an engineer: free minutes on a rate ("unit offset") are not taken off imported Lime trips (`lib/suma/mobility/trip_importer.rb:92-97`); a wrong Lyft Pass Program ID on one program stops the whole Lyft trip import and is not checked on save (`lib/suma/lyft/pass.rb:280-288`); two programs whose Lyft programs share an owner account get the same rides (`lib/suma/lyft/pass.rb:308-317`).
- Fixers write only their own area file, so cross-area rules found in the fourth run were not added back to the older files.
- Agent citations were checked only by the workflow reviewer, not by hand.
- Shared admin rules (`lib/suma/admin_api/common_endpoints.rb`, `access.rb`, role access) repeat in every area file. Consider one `admin-access.md` area.
