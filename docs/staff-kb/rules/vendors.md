# vendors rules

A vendor is an outside company suma works with (for example a scooter company, a ride company, or a farm). Each vendor can have **services** (what members can use, with a start and end date), **rates** (what a service costs), **categories** (labels that decide which money can pay for what), and a **private account setup** ("vendor configuration") that lets a member link to the vendor's own app without sharing their real email or phone. For each member, suma keeps a **private account** ("vendor account") per vendor configuration, and a **private contact** ("member contact": a stand-in email or phone number). This page lists the rules the software enforces for all of these, what you or a member will see when a rule is hit, and where to fix it in the admin app.

## Rules

### Vendors

| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |
|---|---|---|---|---|
| A new vendor must have a name (not blank) and an image. | Saving a new vendor fails with a message about the missing name or image. | Vendor create page: fill in Name and upload an Image. | error | lib/suma/admin_api/vendors.rb:33 |
| When editing a vendor, the name cannot be changed to blank. | Save fails. | Vendor edit page: enter a name. | error | lib/suma/admin_api/vendors.rb:51 |
| A vendor's short web name ("slug") is made automatically from its name when the vendor is created. It does not change later when the name is edited, and admin has no field to edit it. | The slug shown on the vendor page still matches the old name after a rename. | No admin fix - needs engineer. | info | lib/suma/vendor.rb:21 |
| Two vendors cannot have the same slug. Because the slug comes from the name, creating a second vendor with the same name fails. | Creating the vendor fails with an "invalid" error that mentions the slug. | Use a different name for the new vendor. | error | lib/suma/vendor.rb:52 |
| Every new vendor automatically gets its own payment account. | A payment account for the vendor appears without anyone creating it. | Nothing to fix. | info | lib/suma/vendor.rb:26 |
| Deleting a vendor also deletes its services and its private account setup. Products, payment accounts, images, and off-platform payment records that point to the vendor are not removed automatically, so a vendor that has any of these cannot be deleted. Since every vendor is given a payment account and an image when created, expect the Delete button to fail for most vendors. | Delete fails with a server error. If it does succeed, the vendor's services and private account setup vanish with it. | No admin fix - needs engineer. | warning | lib/suma/vendor.rb:56 |
| Viewing vendors needs the "commerce" admin permission. Creating, editing, or deleting vendors needs the "management" admin permission. | "You are not permitted to write on admin_management" (or similar) error. | Ask a manager to change your role. | error | lib/suma/admin_api/access.rb:61 |

### Vendor services

| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |
|---|---|---|---|---|
| A new vendor service must have a vendor, an image, an internal name, an external (member-facing) name, a start time, and an end time. | Save fails and names the missing field. | Vendor service create page: fill in every required field. | error | lib/suma/admin_api/vendor_services.rb:44 |
| The vendor of a service cannot be changed after the service is created. | The edit page has no way to change the vendor; any change sent is ignored. | Create a new service under the right vendor. | info | lib/suma/admin_api/vendor_services.rb:66 |
| A service is only offered to members between its start and end time. Outside that window, its prices and vehicles are left out of the member app. | Scooters or bikes for a vendor disappear from the member's map, even though the program and price are set up. | Vendor service edit page: change the Period begin / Period end. | warning | lib/suma/vendor/service.rb:42 |
| A member who is not yet verified cannot use any vendor service. | Member's map shows the service as unusable; starting a ride fails with a "read only / unverified" message. | Member page: verify the member (finish onboarding). | error | lib/suma/vendor/service.rb:55 |
| A member whose cash balance is too low (or has stayed negative too long) cannot use any vendor service. See the payment rows under Cross-area rules for the exact limits. | Member's map shows the service as unusable; starting a ride fails with a "cash balance" message. | Member needs to add money or pay off the balance. Staff can review the member's cash ledger on the Member page. | error | lib/suma/vendor/service.rb:56 |
| **UNVERIFIED** (the rule is confirmed in code; the exact "payment method required" wording shown to the member was not confirmed) If a service's rate costs anything (a per-unit price or a starting fee above $0), the member must have a default payment method on file. Free rates do not need one. | Member's map shows the service as unusable with a "payment method required" message; starting a ride fails. | Member adds a card or bank account in the app. Or, if the service should be free, attach a $0 rate in the program pricing. | error | lib/suma/vendor/service.rb:57 |
| Each service has one "mobility adapter" setting: "No Adapter/Non-Mobility", "Deep Linking (suma sends receipts)", "Deep Linking (vendor sends receipts)", or one of the built-in ride connections ("MaaS: ..."). | Shown as the Mobility adapter choice on the vendor service page. | Vendor service edit page: Mobility adapter setting. | info | lib/suma/vendor/service.rb:64 |
| Choosing "No Adapter/Non-Mobility" removes the service's existing ride connection. | The service stops working for rides after the change. | Vendor service edit page: pick the correct Mobility adapter setting again. | warning | lib/suma/vendor/service.rb:91 |
| A service whose vehicles show on the map must have a Mobility adapter setting other than "No Adapter/Non-Mobility". The vehicle detail screen asks the adapter whether the member needs to link a private account, and fails if there is no adapter. | Member taps a vehicle and gets a general server error instead of the vehicle details. | Vendor service edit page: pick a Deep Linking or MaaS Mobility adapter setting. | error | lib/suma/api/mobility.rb:281 |
| Choosing any "MaaS" ride connection always means suma sends the receipts. With "Deep Linking" you choose whether suma or the vendor sends them. | Members get (or do not get) suma receipts for rides. | Vendor service edit page: Mobility adapter setting. | info | lib/suma/vendor/service.rb:94 |
| **UNVERIFIED** (the rule is confirmed in code; how the admin Constraints field behaves when left empty was not confirmed) A service can list "constraints" that limit which vehicles it accepts from the vendor's vehicle feed. With no constraints, every vehicle is accepted. With constraints, a vehicle type is accepted only if it matches every detail of at least one constraint. | Some of a vendor's vehicle types never show on the map. | Vendor service edit page: Constraints field (leave empty to accept everything). | warning | lib/suma/vendor/service.rb:123 |
| Vendor services cannot be deleted in admin. | There is no delete button. | End the service by setting its Period end to a past time. Removal: No admin fix - needs engineer. | info | lib/suma/admin_api/vendor_services.rb:27 |
| Viewing and editing vendor services needs the "commerce" admin permission. | "You are not permitted to..." error. | Ask a manager to change your role. | error | lib/suma/admin_api/access.rb:58 |

### Vendor service rates

| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |
|---|---|---|---|---|
| A new rate must have an internal name, an external name, a per-unit amount, a surcharge (starting fee), and a unit offset (number of free units). | Save fails and names the missing field. | Vendor service rate create page: fill in all fields (use 0 where nothing applies). | error | lib/suma/admin_api/vendor_service_rates.rb:28 |
| After a rate is created, its per-unit amount, surcharge, and unit offset cannot be edited. Only the names, the "undiscounted rate", and the ordering number can change. | The price fields are not editable on the edit page. | Create a new rate with the right prices and point the program pricing at it. | warning | lib/suma/admin_api/vendor_service_rates.rb:47 |
| Editing a rate without sending an ordering number resets the ordering number to 0. | A rate's ordering number drops back to 0 after an edit, which can change which price a member gets (see next row). | Vendor service rate edit page: re-enter the Ordinal each time you save. | warning | lib/suma/admin_api/vendor_service_rates.rb:51 |
| When a member qualifies for more than one price on the same service (through different programs), the rate with the highest ordering number is the one used. | A member is charged a different price than staff expected. | Vendor service rate edit page: raise the Ordinal on the rate that should win. | warning | lib/suma/program/pricing.rb:24 |
| Cost of a use = starting fee + per-unit amount x (units used minus the free units). Free units never push the cost below the starting fee. | Trip cost on a charge. | Nothing to fix; create a new rate to change pricing. | info | lib/suma/vendor/service_rate.rb:26 |
| A rate can point to an "undiscounted rate". The discount shown to members is the difference between the two. A rate with no undiscounted rate shows no discount. | Member sees (or does not see) a crossed-out higher price and savings. | Vendor service rate edit page: Undiscounted rate. | info | lib/suma/vendor/service_rate.rb:38 |
| A rate counts as "costs money" if its per-unit amount or its starting fee is above $0. This is what triggers the payment-method requirement. | See the payment method rows above and under Private accounts. | Use a $0 rate for free services. | info | lib/suma/vendor/service_rate.rb:21 |
| Rates cannot be deleted in admin. | There is no delete button. | No admin fix - needs engineer. | info | lib/suma/admin_api/vendor_service_rates.rb:16 |

### Vendor service categories

| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |
|---|---|---|---|---|
| A new category must have a name. A parent category is optional. | Save fails without a name. | Vendor service category create page: enter a Name. | error | lib/suma/admin_api/vendor_service_categories.rb:35 |
| If no slug is typed in, one is made from the name. Two categories cannot share a slug. | Save fails with an "invalid" error that mentions the slug. | Enter a different Name or Slug. | error | lib/suma/vendor/service_category.rb:109 |
| Categories form a tree. A category covers itself and everything beneath it. Lists show children indented under their parent, sorted by name. | Category pickers show an indented list. | Vendor service category edit page: Parent. | info | lib/suma/vendor/service_category.rb:78 |
| The "Cash" category is built in. The system creates it on its own if it is missing. | A "Cash" category exists even if nobody made it. | Do not rename it. Changes: No admin fix - needs engineer. | info | lib/suma/vendor/service_category.rb:28 |
| Creating a vendor service category automatically creates a matching ledger on the suma platform account. | A new platform ledger appears shortly after a category is created. | Nothing to fix. | info | lib/suma/async/ledger_create_for_category.rb:12 |
| Vehicles are loaded from a vendor's vehicle feed only for that vendor's services that carry the "mobility" category. | A service has a program price and correct dates, but no scooters or bikes ever appear on the member map. | Vendor service edit page: add the "mobility" category. | warning | lib/suma/mobility/gbfs/vendor_sync.rb:10 |
| Categories cannot be deleted in admin. | There is no delete button. | No admin fix - needs engineer. | info | lib/suma/admin_api/vendor_service_categories.rb:22 |
| Any admin can view categories. Creating or editing them needs the "management" admin permission. | "You are not permitted to write..." error. | Ask a manager to change your role. | error | lib/suma/admin_api/access.rb:60 |

### Private account setup (vendor configurations)

| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |
|---|---|---|---|---|
| Private account setups cannot be created or deleted in admin, only edited. | There is no create or delete button. | No admin fix - needs engineer. | info | lib/suma/admin_api/anon_proxy_vendor_configurations.rb:21 |
| A vendor can have only one private account setup. | (An engineer adding a second one gets an error.) | No admin fix - needs engineer. | info | lib/suma/anon_proxy/vendor_configuration.rb:65 |
| Deleting a private account setup (or the vendor it belongs to) also deletes every member's private account for that setup, along with their saved messages and registrations. | All vendor accounts for that vendor disappear. | No admin fix - needs engineer. Cannot be undone. | warning | lib/suma/anon_proxy/vendor_configuration.rb:75 |
| Staff can edit only: Enabled, the app install link, and the four texts (description, help, terms, success instructions). The way suma signs members in to the vendor and the way it reads the vendor's messages are fixed. | Those two settings are not on the edit page. | No admin fix - needs engineer. | info | lib/suma/admin_api/anon_proxy_vendor_configurations.rb:40 |
| A setup that is not Enabled is hidden from members. No new private accounts are made for it, and members who already have one can no longer use it. | The vendor card disappears from the member's private accounts list. A member with an old screen open sees an error ("Anon proxy vendor config is not enabled"). | Vendor configuration edit page: turn on Enabled. | error | lib/suma/api/anon_proxy.rb:26 |
| A setup is shown only to members who qualify for at least one of the programs attached to it. A setup with no programs attached is hidden from every member (see next row). | A member does not see the vendor card. | Vendor configuration page: attach at least one program. Also check the member's eligibility for that program. | warning | lib/suma/anon_proxy/vendor_account.rb:42 |
| A private account setup with no programs attached is shown to no members at all. (The "open to everyone when empty" behavior is on only in test systems.) | The setup is Enabled, but no member sees the vendor card and no private accounts are created for it. | Vendor configuration page: attach at least one program. | warning | lib/suma/program/has.rb:37 |
| Every program attached to a setup must be an existing program. | "Unknown program: (number)" error when saving programs. | Vendor configuration page: pick programs from the list again. | error | lib/suma/admin_api/common_endpoints.rb:386 |
| Changing the programs on a setup is written to its activity history. | A "programchange" entry appears in the setup's audit activities. | Nothing to fix. | info | lib/suma/admin_api/common_endpoints.rb:390 |

### Private accounts (vendor accounts)

| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |
|---|---|---|---|---|
| Members who are not yet verified get no private accounts at all. | Member's private accounts list is empty. | Member page: verify the member. | error | lib/suma/anon_proxy/vendor_account.rb:40 |
| A private account is created automatically the first time a verified, eligible member opens the private accounts list. Staff do not create them. | New vendor accounts appear in admin with no one creating them. | Nothing to fix. | info | lib/suma/anon_proxy/vendor_account.rb:51 |
| A member has at most one private account per vendor setup. | Never two accounts for the same member and vendor. | Nothing to fix. | info | lib/suma/anon_proxy/vendor_account.rb:280 |
| A member can only act on their own private account. | Member sees "No anonymous proxy vendor account with that id". | Nothing to fix (this is a safety check). | error | lib/suma/api/anon_proxy.rb:24 |
| A member cannot link (or re-link) a private account while their cash balance blocks service use. | Member sees an "Account cannot use services" error when pressing the link button. | Member adds money or pays off the balance. | error | lib/suma/api/anon_proxy.rb:40 |
| A member is asked to add a payment method before linking only when one of the member's programs for that setup has a price above $0 on a service from the same vendor. | The linking screens show (or skip) an "add payment method" step. | To remove the step: use a $0 rate in the program pricing. To add it: attach a paid rate. | info | lib/suma/anon_proxy/vendor_account.rb:79 |
| The member's vendor card shows one of three states: "link" (not linked yet), "add payment" (linked, payment needed but none on file), or "re-link" (everything fine). | Member describes one of these three buttons. | Depends on the state; see the other rows. | info | lib/suma/anon_proxy/vendor_account.rb:144 |
| If a member has a payment method but owes money on their cash balance, the app tells them the balance must be paid off before re-linking. | Member sees a "pay off balance" notice. | Member pays the balance. | warning | lib/suma/anon_proxy/vendor_account.rb:152 |
| A sign-in link (magic link) is shown to the member for only 10 minutes after it arrives. | Member says the link vanished or the button does nothing. | Member presses link / re-link again to get a new one. Staff can also read the latest link on the Vendor account page. | warning | lib/suma/anon_proxy/vendor_account.rb:13 |
| **UNVERIFIED** (the wait times are confirmed in code; the spinner and "try again" wording come from the member app and were not confirmed) After a member asks for a sign-in link, the app waits up to about 25 seconds for it, checking every 3 seconds. | Member sees a spinner, then "try again" if the vendor's email was slow. | Member tries again. If it keeps failing, check the Vendor account page for incoming messages. Changing the wait times: No admin fix - needs engineer. | warning | lib/suma/api/anon_proxy.rb:70 |
| For vendors that link right away (Lyft Pass), there is no waiting; the app reports success immediately. | No spinner for these vendors. | Nothing to fix. | info | lib/suma/api/anon_proxy.rb:54 |
| The access code and the time it was set must go together. An access code cannot be blank text. | Saving a Vendor account in admin with a code but no "set at" time (or the reverse) fails. | Vendor account edit page: fill in or clear both Latest access code and Latest access code set at. | error | lib/suma/anon_proxy/vendor_account.rb:287 |
| Staff can edit only the access code, magic link, the two access code times, and "pending closure" on a private account. | Other fields are not editable. | No admin fix - needs engineer. | info | lib/suma/admin_api/anon_proxy_vendor_accounts.rb:67 |
| Deleting a private account also deletes its stored messages and registrations. | History is gone after delete. | Cannot be undone. | warning | lib/suma/anon_proxy/vendor_account.rb:295 |
| Viewing and editing private accounts and private contacts needs the "commerce" admin permission. | "You are not permitted to..." error. | Ask a manager to change your role. | error | lib/suma/admin_api/access.rb:17 |

### Lime accounts

| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |
|---|---|---|---|---|
| A Lime private account needs linking whenever it has no private contact attached. | Member's card says "Link Lime account". | Member presses the link button. | info | lib/suma/anon_proxy/auth_to_vendor/lime.rb:80 |
| Linking a Lime account gives the member a private email (if they do not have one for this account), asks Lime to email a sign-in link to it, and records that email as a registration. | A member contact and a registration row appear on the Vendor account page. | Nothing to fix. | info | lib/suma/anon_proxy/auth_to_vendor/lime.rb:32 |
| Only emails from Lime's no-reply address are treated as Lime sign-in emails. Other mail to the private address is ignored. | A message the member expected never shows up. | No admin fix - needs engineer. | info | lib/suma/anon_proxy/message_handler/lime.rb:12 |
| A Lime email with no recognizable sign-in link is ignored (for example marketing mail). | Nothing is forwarded to the member. | Nothing to fix. | info | lib/suma/anon_proxy/message_handler/lime.rb:31 |
| When a Lime sign-in link arrives, suma saves it on the private account and sends the member a message with the link (shortened when link shortening is on). | Member gets a text/email with the Lime link; the link shows on the Vendor account page. | Nothing to fix. | info | lib/suma/anon_proxy/message_handler/lime.rb:71 |
| If the member no longer qualifies for the Lime setup, or their cash balance blocks services, the sign-in link is NOT sent to them. Engineers get an alert ("Prohibited Lime user requested access code"). | Member says they never got the Lime link. | Fix the member's eligibility or balance, then have them link again. | error | lib/suma/anon_proxy/message_handler/lime.rb:52 |
| The "Revoke Lime Login" button is shown on every Lime private account. It marks the account "pending closure", clears the saved link, and asks Lime for a new sign-in link. | Button on the Vendor account page with a warning prompt. | After pressing it, refresh the page until a Magic Link shows, open that link yourself to sign in (this logs the member out), then press "Finish Lime Revocation". | warning | lib/suma/anon_proxy/vendor_account.rb:218 |
| Pressing "Revoke Lime Login" on a Lime account that has no private contact creates a new private email for the member and asks Lime to send a sign-in link to it. The button is shown on every Lime account, linked or not. | A new member contact and a new registration appear on an account that was never linked or was already closed. The account is also marked "pending closure". | Only press the button on accounts that have a private contact. To undo: delete the new Member contact and untick Pending closure on the Vendor account edit page. | warning | lib/suma/program/service_revoker.rb:119 |
| The "Finish Lime Revocation" button only appears while the account is "pending closure". | Button is missing. | Press "Revoke Lime Login" first. | info | lib/suma/anon_proxy/vendor_account.rb:228 |
| "Finish Lime Revocation" fails if no sign-in link has arrived yet. | "Magic link was never set on the account. Wait longer, or try revoking Lime again." | Wait and refresh, or press "Revoke Lime Login" again. | error | lib/suma/admin_api/anon_proxy_vendor_accounts.rb:103 |
| Finishing a Lime revocation turns off "pending closure" and detaches the private contact, so the member must link again from scratch with a new private email. | Member's card goes back to "Link Lime account". | Nothing to fix; the member can link again when allowed. | info | lib/suma/admin_api/anon_proxy_vendor_accounts.rb:105 |
| While a Lime account is "pending closure", incoming Lime sign-in links are saved for staff but not sent to the member. | Member gets no link; the link shows on the Vendor account page. | Finish the revocation (see above), or untick Pending closure on the Vendor account edit page if it was set by mistake. | warning | lib/suma/anon_proxy/message_handler/lime.rb:37 |
| Revoking a Lime login is written to the member's activity history. | "revokelime" entry on the Member page. | Nothing to fix. | info | lib/suma/admin_api/anon_proxy_vendor_accounts.rb:93 |
| Lime rides listed in Lime's trip report are matched to members by the private email saved on the account's registrations. A ride whose email matches no registration is skipped and engineers are alerted ("Lime trip taken by unknown user"). Deleting a private account deletes its registrations, so later rides for that email cannot be matched. | A member's Lime rides never show up as trips or charges in suma. | Do not delete Lime vendor accounts that may still have rides coming in. Recovery: No admin fix - needs engineer. | warning | lib/suma/lime/sync_trips_from_report.rb:137 |
| Emails from Lime to a member's private address with "Service Violation Notification" or "Parking violation" in the subject (from the last 2 weeks) are turned into support tickets. The ticket names the member when the private email still matches a member contact. This runs only when the Lime violations setting is switched on (it is off by default). | Support tickets titled with the Lime violation subject appear, with the original email attached. If the member contact was deleted, the ticket has no member name. | Nothing to fix. Turning the feature on or off: No admin fix - needs engineer. | info | lib/suma/lime/handle_violations.rb:12 |

### Lyft Pass accounts

| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |
|---|---|---|---|---|
| A Lyft Pass account needs linking when the member qualifies for a program that has a Lyft Pass program ID and the member is not currently registered in it. | Member's card says "Link" again after being added to a new Lyft program. | Member presses the link button. To change which programs count: Program edit page, Lyft Pass program ID. | info | lib/suma/anon_proxy/auth_to_vendor/lyft_pass.rb:26 |
| Linking invites the member's own phone number into each missing Lyft Pass program and records a registration for each. If nothing is missing, nothing happens. | Registrations appear on the Vendor account page. | Nothing to fix. | info | lib/suma/anon_proxy/auth_to_vendor/lyft_pass.rb:10 |
| A registration that has been revoked no longer counts, so the member can be invited again later. | Old registrations show an "unregistered at" time. | Nothing to fix. | info | lib/suma/anon_proxy/vendor_account_registration.rb:14 |
| The "Revoke Lyft Pass" button only appears on Lyft Pass accounts that have at least one registration. | Button is missing. | Nothing to revoke; no fix needed. | info | lib/suma/anon_proxy/vendor_account.rb:236 |
| The "Revoke Lyft Pass" button stays visible after a revoke, because revoked registrations are kept and still count for showing the button. Pressing it again contacts Lyft again and re-stamps the "unregistered at" time. | Button still shows on an account whose registrations all have an "unregistered at" time. | Nothing to fix; no need to press it again. | info | lib/suma/anon_proxy/vendor_account.rb:236 |
| "Revoke Lyft Pass" removes the member from every Lyft Pass program on that account and is written to the member's activity history. | Confirmation prompt, then "revokelyft" entry on the Member page. | The member can link again from the app if they still qualify. | warning | lib/suma/admin_api/anon_proxy_vendor_accounts.rb:116 |

### Private contacts (member contacts) and message forwarding

| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |
|---|---|---|---|---|
| A private contact is either an email or a phone number, never both and never neither. | Saving a contact with both or neither filled in fails. | Member contact edit page: fill in exactly one of Email or Phone. | error | lib/suma/anon_proxy/member_contact.rb:83 |
| Staff can create a private contact for a member by choosing the member and a type of "email" or "phone" only. | Any other type is rejected. | Member contact provision form: pick email or phone. | error | lib/suma/admin_api/anon_proxy_member_contacts.rb:22 |
| The member chosen for a new private contact must exist. | "Forbidden" error. | Pick a valid member. | error | lib/suma/admin_api/anon_proxy_member_contacts.rb:26 |
| A private phone number can only be bought for a member whose own phone is on the system's allowed-numbers list for texting. | "Member[...] phone ... is not in the SMS_ALLOWLIST" error. | No admin fix - needs engineer (the allowed list is a system setting). | error | lib/suma/anon_proxy/relay/signalwire.rb:11 |
| If the phone provider has no numbers available, a private phone number cannot be created. | Server error when provisioning a phone contact. | Try again later. If it persists: No admin fix - needs engineer. | error | lib/suma/anon_proxy/relay/signalwire.rb:18 |
| Private email addresses look like "m(member number).(time)@(suma mail domain)". On test systems the system name is added in front. | Odd-looking addresses on the Member contact page are normal. | Nothing to fix. | info | lib/suma/anon_proxy/relay/postmark.rb:9 |
| Two private accounts for the same vendor setup cannot share one private contact. | Error when an engineer or script tries to reuse a contact. | No admin fix - needs engineer. | info | lib/suma/anon_proxy/vendor_account.rb:279 |
| Staff can type a new email or phone straight onto a private contact, and can delete private contacts and private accounts. suma does not check the new address with the mail or phone provider. | After a hand edit, vendor messages stop matching the account and are dropped. | Member contact edit page: restore the original address, or delete the contact and have the member link again. | warning | lib/suma/admin_api/anon_proxy_member_contacts.rb:51 |
| Deleting a private contact detaches it from any private account. A Lime account then shows "Link" again; Lyft Pass accounts are not affected, because they do not use a private contact. If the contact was a private phone number, the number is also released with the phone provider in the background; private emails have nothing to release. | A member's Lime card goes back to "Link Lime account". | Member links Lime again to get a new private email. | warning | lib/suma/anon_proxy/member_contact.rb:87 |
| If the provider says a number was bought too recently to release, suma retries on its own one hour after the date the provider allows. | The number stays in the provider's account for a while after delete. | Nothing to fix. | info | lib/suma/anon_proxy/relay/signalwire.rb:57 |
| Incoming vendor emails older than 5 minutes are ignored. | A delayed vendor email never reaches the member. | Member requests a new link. | warning | lib/suma/anon_proxy/message_handler.rb:62 |
| Incoming vendor emails and texts are picked up only while the inbound message integration (a system setting) is switched on. When it is off, no Lime sign-in link is ever picked up. | No member ever receives a Lime link; nothing appears under Messages on any Vendor account page. | No admin fix - needs engineer (system setting). | warning | lib/suma/async/process_anon_proxy_inbound_webhookdb_relays.rb:29 |
| An incoming message is dropped if suma does not recognize the sender, or cannot match the address to a private account for that vendor. | Nothing shows under Messages on the Vendor account page. | Check that the Member contact address matches what the vendor has. Otherwise: No admin fix - needs engineer. | warning | lib/suma/anon_proxy/message_handler.rb:64 |
| Only messages suma acted on are saved in the private account's message history. | Ignored mail (marketing, unknown) is not listed. | Nothing to fix. | info | lib/suma/anon_proxy/message_handler.rb:89 |
| Texts sent to a member's private phone number are forwarded to the member's real phone as "From (sender): (text)", sent from suma's relay number. | Member gets vendor texts from a suma number. | Nothing to fix. | info | lib/suma/api/anon_proxy.rb:119 |
| A text to a private number is silently dropped (and engineers alerted) if that number is not on the allowed-numbers list or does not match any private contact. | Member says a vendor text never arrived. | Check the Member contact page for the number. Otherwise: No admin fix - needs engineer. | warning | lib/suma/api/anon_proxy.rb:110 |
| System settings (not in admin): mail domain for private emails, relay phone number, which email and phone providers are used (test stand-ins by default), and the 25-second / 3-second link wait times. | - | No admin fix - needs engineer. | info | lib/suma/anon_proxy.rb:7 |

### Admin pages in general (apply to every page above)

| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |
|---|---|---|---|---|
| Opening or changing a record that does not exist gives a "forbidden" error, not "not found". | "Forbidden" when following an old link. | Go back to the list and find the record again. | error | lib/suma/admin_api/common_endpoints.rb:247 |
| When a save fails partway, none of the changes in that save are kept. | After an error, the record looks exactly as before. | Fix the problem and save again. | info | lib/suma/admin_api/common_endpoints.rb:180 |
| Removing a linked item that is still used somewhere else is refused. | "One of these resources could not be removed because it is used elsewhere. Please modify it instead..." | Edit the item instead of removing it. | error | lib/suma/admin_api/common_endpoints.rb:147 |

## Cross-area rules

| Rule (plain English) | Symptom staff would see | Fix in admin | Severity (error/warning/info) | file:line |
|---|---|---|---|---|
| (Payments) A member is blocked from vendor services when their cash balance is below the system minimum (normally $0, or slightly below to allow for amounts too small to charge). | "Cash balance" block on rides and on linking private accounts. | Member adds funds. Changing the minimum: No admin fix - needs engineer. | error | lib/suma/payment.rb:132 |
| (Payments) If the system minimum is set below $0, a member with a negative balance above the minimum is still blocked once the balance has stayed negative for the whole grace period (18 hours by default). | Member could ride yesterday with a small negative balance but is blocked today. | Member pays off the balance. | error | lib/suma/payment.rb:143 |
| (Payments) A payment account with no member attached (such as a vendor's own account) can never use services. | - | Nothing to fix. | info | lib/suma/payment.rb:121 |
| (Members) A member counts as "read only" when not verified, or when their account is missing its cash ledger (a technical fault). Both block vendor services. | "read_only_unverified" or "read_only_technical_error" message. | Verify the member on the Member page. For the technical error: No admin fix - needs engineer. | error | lib/suma/member.rb:255 |
| (Programs) Once a day, suma looks for members whose cash balance blocks services and whose balance changed in the last 4 days, then logs them out of Lime and removes them from Lyft Pass programs. By default this runs in "dry run" mode: it only writes a log and removes nothing. | Members lose Lime / Lyft access after going negative (only when dry run is off). | Manual version: "Revoke Lime Login" / "Revoke Lyft Pass" on the Vendor account page. Turning dry run off: No admin fix - needs engineer. | warning | lib/suma/program/service_revoker.rb:72 |
| (Programs) Automatic Lime logout only touches Lime accounts that still have a private contact attached. | Already-closed accounts are skipped. | Nothing to fix. | info | lib/suma/program/service_revoker.rb:100 |
| (Programs) When a Lyft Pass is revoked, the registration is kept but stamped as "unregistered". If the member has no phone on record, Lyft is not contacted but the stamp is still added. | "Unregistered at" time on the registration. | Nothing to fix. | info | lib/suma/program/service_revoker.rb:163 |
| (Programs) A member only sees a vendor service, and gets its price, through a program pricing they qualify for. A program can have only one price per service. | Service missing from member's map; or an error adding a second price for the same service to one program. | Program page: Pricings (service + rate). Check member eligibility. | error | lib/suma/program/pricing.rb:43 |
| (Mobility) A "Deep Linking" service sends the member to their private accounts page when they have no private account with that vendor, or it needs linking. | Member tapping a vehicle is sent to link their account first. | Make sure the vendor has an enabled private account setup attached to the member's program. | info | lib/suma/mobility/vendor_adapter.rb:53 |
| (Mobility) A "Deep Linking" service must not have a ride connection, and a non-deep-linking service must use one of the known ride connections. | Save fails with "deeplinks do not use trip managers" or an invalid choice error. | Vendor service edit page: pick a setting from the Mobility adapter list. | error | lib/suma/mobility/vendor_adapter.rb:75 |
| (Mobility) A ride can be started inside the suma app only on a service with a "MaaS" adapter setting. Deep Linking services have no ride connection, so starting a ride in suma on one fails. Members are meant to ride in the vendor's own app for these services. | Server error when a ride is started in suma for a deep-linking service. | No admin fix - needs engineer. | warning | lib/suma/mobility/vendor_adapter.rb:21 |
| (Mobility) Starting a ride first runs the vendor service checks (verified, balance, payment method). A member can have only one ride at a time. | "Already in a trip" or a read-only message when starting a ride. | Member ends the current trip; or fix the block shown. | error | lib/suma/mobility/trip.rb:61 |
| (Mobility) A member only sees and can open vehicles from services they have a current price for. | "No vehicle matching criteria was found" / "Vehicle does not exist". | Program page: Pricings; Vendor service page: Period. | error | lib/suma/api/mobility.rb:110 |
| (Products) Every product must belong to a vendor, and can carry vendor service categories. | Product save fails without a vendor. | Product edit page: Vendor and Categories. | error | lib/suma/admin_api/commerce_products.rb:53 |
| (Payments / ledgers) A ledger can pay for a product or service only if one of the ledger's categories is the same as, or a parent of, one of the item's categories. An item with no categories cannot be paid for by anything, and a ledger with no categories cannot pay for anything. | Checkout fails or a subsidy is not applied; engineers see "has no categories so cannot be purchased by anything". | Product edit page or Vendor service edit page: add Categories. Ledger categories: see the payments page of this knowledge base. | error | lib/suma/payment/ledger.rb:221 |
| (Offerings / member shop) The member shop lists the vendors of the products in an offering; each product shows its vendor's name. | Vendor name appears next to products in the member app. | Vendor edit page: Name. Product edit page: Vendor. | info | lib/suma/api/commerce.rb:49 |
| (Admin access) Read / write permission needed per record type: vendors (commerce / management), vendor services and rates (commerce / commerce), categories (any admin / management), private account setups, accounts, contacts (commerce / commerce). | "You are not permitted to (read or write) on ..." | Ask a manager to change your role. | error | lib/suma/service/helpers.rb:113 |

## Skipped (plumbing)

- lib/suma/vendor/has_service_categories.rb:11-12 - developer-only check that code declares categories; never seen by staff.
- lib/suma/vendor/service.rb:48-49 - wrapper that raises the block reason; covered by rows for service.rb:55-57.
- lib/suma/vendor/service.rb:76-86 - reads back the adapter setting name for display; covered by the setting rows.
- lib/suma/vendor/service.rb:103-110 - creates the adapter record with a placeholder default.
- lib/suma/vendor/service_category.rb:22-26, 30-76, 85-104 - lookup caching, tree sorting and label drawing helpers.
- lib/suma/vendor/service_rate.rb:42-55 - discount arithmetic helpers; covered by the undiscounted rate row.
- lib/suma/anon_proxy.rb:6, 15-32 - settings block header and message data shape.
- lib/suma/anon_proxy/auth_to_vendor.rb:30, 35, 38 - "not implemented" placeholders for engineers.
- lib/suma/anon_proxy/auth_to_vendor/fake.rb:35-36 - test-only stand-in.
- lib/suma/anon_proxy/auth_to_vendor/lime.rb:8-9, 13-29 - fixed technical headers sent to Lime.
- lib/suma/anon_proxy/auth_to_vendor/lime.rb:63, 79 - token exchange error (no longer used by any flow read) and a fixed "wait for link" flag covered by the waiting row.
- lib/suma/anon_proxy/auth_to_vendor/lyft_pass.rb:20-21 - yes/no wrappers covered by Lyft rows.
- lib/suma/anon_proxy/vendor_configuration.rb:33 - yes/no wrapper for Enabled; covered.
- lib/suma/anon_proxy/member_contact.rb:39-42 - phone/email yes/no and display formatting.
- lib/suma/anon_proxy/relay.rb:12-49 - "not implemented" placeholders for engineers.
- lib/suma/anon_proxy/relay/fake_*.rb - test-only stand-ins.
- lib/suma/anon_proxy/relay/signalwire.rb:43-55 - provider error parsing for number release; outcome covered by the retry row.
- lib/suma/anon_proxy/message_handler.rb:21, 27, 42, 88 - placeholders and a developer type check.
- lib/suma/anon_proxy/message_handler.rb:44-47 - eligibility/balance check; covered by Lime row (lime.rb:52).
- lib/suma/anon_proxy/message_handler/lime.rb:27 - loop over link patterns.
- lib/suma/anon_proxy/message_handler/noop.rb:6, message_handler/fake.rb:18-25 - handler that never matches; test stand-in.
- lib/suma/anon_proxy/vendor_account.rb:46 - "only create if missing" loop guard; covered by auto-create row.
- lib/suma/anon_proxy/vendor_account.rb:63 - wrapper for "needs linking".
- lib/suma/anon_proxy/vendor_account.rb:95-97 - avoids creating two contacts at once.
- lib/suma/anon_proxy/vendor_account.rb:112-114 - 10 minute check; covered by row for line 13.
- lib/suma/anon_proxy/vendor_account.rb:120-133 - helper listing last 5 recent message texts; not shown by any endpoint read.
- lib/suma/anon_proxy/vendor_account.rb:210-213 - step numbering for the member screens.
- lib/suma/anon_proxy/vendor_account.rb:288 - leftover check on an old, unused column.
- lib/suma/anon_proxy/vendor_account_registration.rb:44 - blank-text check on an internal ID.
- lib/suma/api/anon_proxy.rb:83 - secret check on the inbound mail notification from the mail system.
- lib/suma/api/anon_proxy.rb:92-99 - required fields on the phone provider's notification.
- lib/suma/api/mobility.rb:21, 40, 113-116, 159, 176 - map filtering, duplicate-vehicle handling, end-trip and trip list (mobility area).
- lib/suma/api/commerce.rb (all other lines) - carts, checkout and orders; no vendor rules beyond the row above.
- lib/suma/admin_api/vendor_services.rb:23-24, 38-40, 82 - display fields, setting hand-off, options list.
- lib/suma/admin_api/anon_proxy_vendor_accounts.rb:85 - missing record gives "forbidden"; covered by general row.
- lib/suma/admin_api/common_endpoints.rb:17-24, 54-120, 169, 191, 279-282 - generic save machinery.
- lib/suma/admin_api/common_endpoints.rb:342, 363, 384 - missing record gives "forbidden"; covered by general row.
- lib/suma/admin_api/common_endpoints.rb:411-454 - notes and status-change endpoints not used by vendor pages.
- lib/suma/admin_api/access.rb:6-12, 69-73 - permission name shortcuts and lookup helpers; covered by permission rows.
- lib/suma/async/process_anon_proxy_inbound_webhookdb_relays.rb:28 - skips message providers that have no inbound message table.
- lib/suma/program/service_revoker.rb:13-18, 58, 60, 145 - engineer safety checks and empty-list guards.
