export const meta = {
  name: 'staff-kb-rules',
  description: 'Extract, review and fix staff-facing business rule tables per area, then build the index',
  phases: [
    { title: 'Extract', detail: 'one extractor per area writes the rule table' },
    { title: 'Review', detail: 'independent reviewer re-opens every file:line' },
    { title: 'Fix', detail: 'fixer applies review, marks UNVERIFIED' },
    { title: 'Index', detail: 'write INDEX.md with counts and top rules' },
  ],
}

const AREAS = args.areas
const DIR = 'docs/staff-kb/rules'

const COMMON = `Repository: suma (Ruby, Sequel models, Grape APIs), working directory is the repo root.
Audience of the knowledge base: suma staff who are NOT engineers. Plain American English, no Ruby jargon in the Rule/Symptom/Fix columns.
Hard rules:
- Every rule must be based on code you actually opened and read. Never guess. Cite file:line (repo-relative path, real line number) for each rule.
- Skip database plumbing (associations, timestamps, serialization, pagination, indexes) unless it changes behavior staff or members would notice.
- Do not modify any file outside ${DIR}/. Do not commit.`

const TABLE = `| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |`

const scope = a => `Area: "${a.name}".
Starting files: ${a.files.join(', ')}.
Also read the member API (lib/suma/api/, mainly ${a.api.join(', ')}) and the admin API (lib/suma/admin_api/, mainly ${a.admin.join(', ')}) where they touch this area, and follow calls out of these files into other areas (carts, checkout, orders, inventory, programs, eligibility, payment, vendors, etc.) when they enforce a rule on this area.`

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    wrong: { type: 'array', items: { type: 'object', properties: {
      rule: { type: 'string' }, fileLine: { type: 'string' }, problem: { type: 'string' }, correction: { type: 'string' } },
      required: ['rule', 'fileLine', 'problem'] } },
    missing: { type: 'array', items: { type: 'object', properties: {
      rule: { type: 'string' }, symptom: { type: 'string' }, fix: { type: 'string' }, severity: { type: 'string' }, fileLine: { type: 'string' } },
      required: ['rule', 'fileLine'] } },
    unconfirmable: { type: 'array', items: { type: 'object', properties: {
      rule: { type: 'string' }, fileLine: { type: 'string' }, reason: { type: 'string' } }, required: ['rule', 'reason'] } },
    confirmedCount: { type: 'integer' },
  },
  required: ['wrong', 'missing', 'unconfirmable', 'confirmedCount'],
}

const FIX_SCHEMA = {
  type: 'object',
  properties: {
    area: { type: 'string' }, file: { type: 'string' },
    ruleCount: { type: 'integer' }, unverifiedCount: { type: 'integer' },
    correctionsApplied: { type: 'integer' }, rulesAdded: { type: 'integer' },
    topMemberBreakingRules: { type: 'array', items: { type: 'object', properties: {
      rule: { type: 'string' }, fileLine: { type: 'string' } }, required: ['rule', 'fileLine'] } },
  },
  required: ['area', 'file', 'ruleCount', 'unverifiedCount', 'topMemberBreakingRules'],
}

const results = await pipeline(
  AREAS,
  a => agent(`${COMMON}

You are the EXTRACTOR. ${scope(a)}

Step 1 - Find rules. In every file you read, find each:
- raise / forbidden! / merror! / other error responses, and model validations (validate, validates_*, DB constraints surfaced as errors)
- guard (unless, return if, return unless, next if/unless)
- yes/no method ending in ?
- limit, default value, config setting, or constant that controls behavior
For each, work out what it means for staff: what the rule is, what staff or a member would see when it trips, and how to fix it in the admin app (name the admin page/field when the admin API code shows one; write "No admin fix - needs engineer" when the code shows none).

Step 2 - Sweep. Grep the files you covered for: raise, forbidden!, merror!, validat, unless, return if, return unless, next if, next unless, "?$" method definitions (def .*\\?), DEFAULT, MAX, MIN, LIMIT, setting, configurable. Every hit must either map to a rule row or be listed under "Skipped (plumbing)" with file:line and a few words on why.

Step 3 - Write ${DIR}/${a.name}.md (create the directory if needed) with:
# ${a.name} rules
One short intro paragraph for staff.
## Rules
${TABLE}
(one row per rule; group related rows with ### subheadings each having its own table if helpful; Severity: error = blocks the action, warning = allowed but risky/surprising, info = good to know)
## Cross-area rules
Same table format: rules enforced in or shared with other areas (say which area in the Rule text). These rows also count as rules.
## Skipped (plumbing)
Bullet list: file:line - why skipped.

Return a short text summary: files covered, rule count, anything you could not resolve.`,
    { label: `extract:${a.name}`, phase: 'Extract' }),

  (_prev, a) => agent(`${COMMON}

You are the REVIEWER, independent of whoever wrote the file. Do NOT edit any file. ${scope(a)}

Read ${DIR}/${a.name}.md. Then:
1. Re-open every file:line cited in every table row. Confirm the code at that line really says what the Rule, Symptom, Fix and Severity columns claim. Line number off, rule misstated, symptom or admin fix invented, wrong severity -> report under "wrong" with the correct file:line and a correction.
2. If you cannot confirm a row from code (cited code does not exist, or the claim depends on something not in the repo) -> report under "unconfirmable".
3. Search for MISSED rules: independently grep the area's models, member API and admin API, and the code they call, for raise, forbidden!, merror!, validations, guards (unless / return if / next if), methods ending in ?, limits/defaults/settings. Also check the "Skipped (plumbing)" list for items that actually change behavior. Report each missed rule under "missing" with file:line and proposed plain-English row content.
Default to reporting when in doubt. confirmedCount = rows you fully confirmed.`,
    { label: `review:${a.name}`, phase: 'Review', schema: REVIEW_SCHEMA }),

  (review, a) => agent(`${COMMON}

You are the FIXER for ${DIR}/${a.name}.md. Apply this review to that file (edit in place, keep the format: ${TABLE}).

Review JSON:
${JSON.stringify(review, null, 2)}

- For each "wrong" item: open the cited code yourself, then correct the row (rule text, symptom, fix, severity, file:line). If the reviewer is mistaken, keep the row as is.
- For each "missing" item: open the cited code, confirm it, add a row in the right section. Do not add anything you cannot see in code.
- For each "unconfirmable" item, and any wrong/missing item you cannot confirm from code either way: keep the row but prefix the Rule cell with **UNVERIFIED** and say briefly why.
- Keep the "Skipped (plumbing)" list consistent (remove entries promoted to rules).
Then count: ruleCount = total table rows across Rules and Cross-area rules sections (excluding headers); unverifiedCount = rows marked UNVERIFIED. Pick the up-to-5 rules most likely to break things for members (blocked checkout, hidden offerings/products, wrong prices, out-of-stock, etc.) as topMemberBreakingRules, in plain English with file:line.`,
    { label: `fix:${a.name}`, phase: 'Fix', schema: FIX_SCHEMA }),
)

const done = results.filter(Boolean)
const failed = AREAS.filter((a, i) => !results[i]).map(a => a.name)
if (failed.length) log(`Areas that did not finish: ${failed.join(', ')}`)

phase('Index')
const index = await agent(`${COMMON}

Write or update ${DIR}/INDEX.md. If it exists, keep rows for areas not listed below and replace rows for areas listed below. List every *.md area file present in ${DIR}/ (except INDEX.md).

Areas completed this run (JSON from the fixers):
${JSON.stringify(done, null, 2)}

Before writing, verify the counts yourself by reading each area file: count table rows in the Rules and Cross-area rules sections, and rows containing UNVERIFIED. Use your verified counts if they differ.

INDEX.md content:
# Staff knowledge base: business rules
Short intro for non-engineers on how to read the tables.
## Areas
| Area | File | Rules | UNVERIFIED |
## Top rules most likely to break things for members
Numbered list, plain English, each with area and file:line, drawn from topMemberBreakingRules (dedupe cross-area repeats).

Return the verified per-area counts.`,
  { label: 'index', phase: 'Index', schema: {
    type: 'object',
    properties: { areas: { type: 'array', items: { type: 'object', properties: {
      area: { type: 'string' }, ruleCount: { type: 'integer' }, unverifiedCount: { type: 'integer' } },
      required: ['area', 'ruleCount', 'unverifiedCount'] } } },
    required: ['areas'] } })

return { fixers: done, index, failed }
