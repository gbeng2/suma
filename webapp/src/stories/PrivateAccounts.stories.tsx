import PrivateAccountDetail, {
  PrivateAccountDetailApiCalls,
} from "../components/PrivateAccountDetail.tsx";
import PrivateAccountsList from "../components/PrivateAccountsList.tsx";
import useLazyRef from "../state/useLazyRef.ts";
import {
  anonProxyVendorAccount,
  currentMember,
  money,
  sequencedResponseMocker,
} from "./fixtures.ts";
import { DemoStack } from "./helpers.tsx";
import type { Meta, StoryObj } from "@storybook/preact-vite";
import noop from "lodash/noop";

const meta = {
  title: "Styleguide/PrivateAccounts",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccountsList: Story = {
  render: () => (
    <DemoStack>
      <PrivateAccountsList
        accounts={[
          anonProxyVendorAccount({ indexCardMode: "link" }),
          anonProxyVendorAccount({ indexCardMode: "relink" }),
          anonProxyVendorAccount({
            indexCardMode: "payment",
            helpText:
              "In the real app, this help text can be Markdown with normal behavior.",
          }),
        ]}
      />
    </DemoStack>
  ),
};

export const EmptyAccountsList: Story = {
  render: () => (
    <DemoStack>
      <PrivateAccountsList accounts={[]} />
    </DemoStack>
  ),
};

export const DetailStepsView: Story = {
  render: () => (
    <DemoStack row wrap>
      <DemoDiv>
        <PrivateAccountDetail
          user={currentMember()}
          setUser={noop}
          id={1}
          apiCalls={makeApiCalls({ accounts: [anonProxyVendorAccount()] })}
        />
      </DemoDiv>
      <DemoDiv>
        <PrivateAccountDetail
          user={currentMember()}
          setUser={noop}
          id={1}
          apiCalls={makeApiCalls({
            accounts: [
              anonProxyVendorAccount({
                requiresPaymentMethod: true,
                balancePayoffNeeded: false,
                hasPaymentMethod: false,
              }),
            ],
          })}
        />
      </DemoDiv>
      <DemoDiv>
        <PrivateAccountDetail
          user={currentMember()}
          setUser={noop}
          id={1}
          apiCalls={makeApiCalls({
            accounts: [
              anonProxyVendorAccount({
                requiresPaymentMethod: true,
                balancePayoffNeeded: true,
                hasPaymentMethod: false,
              }),
            ],
          })}
        />
      </DemoDiv>
      <DemoDiv>
        <PrivateAccountDetail
          user={currentMember()}
          setUser={noop}
          id={1}
          apiCalls={makeApiCalls({
            accounts: [
              anonProxyVendorAccount({
                requiresPaymentMethod: true,
                balancePayoffNeeded: false,
                hasPaymentMethod: true,
              }),
            ],
          })}
        />
      </DemoDiv>
      <DemoDiv>
        <PrivateAccountDetail
          user={currentMember()}
          setUser={noop}
          id={1}
          apiCalls={makeApiCalls({
            accounts: [
              anonProxyVendorAccount({
                requiresPaymentMethod: true,
                balancePayoffNeeded: true,
                hasPaymentMethod: true,
              }),
            ],
          })}
        />
      </DemoDiv>
    </DemoStack>
  ),
};

export const DetailBalanceView: Story = {
  render: () => (
    <DemoStack row wrap>
      <DemoDiv>
        <PrivateAccountDetail
          initialStep="balance"
          user={currentMember({ chargeableCashBalance: money(-120) })}
          setUser={noop}
          id={1}
          apiCalls={makeApiCalls({
            accounts: [
              anonProxyVendorAccount({
                requiresPaymentMethod: true,
                balancePayoffNeeded: true,
                hasPaymentMethod: true,
              }),
            ],
            charges: [currentMember()],
          })}
        />
      </DemoDiv>
    </DemoStack>
  ),
};

export const DetailTermsView: Story = {
  render: () => (
    <DemoStack row wrap>
      <DemoDiv>
        <PrivateAccountDetail
          initialStep="terms"
          user={currentMember()}
          setUser={noop}
          id={1}
          apiCalls={makeApiCalls({
            accounts: [anonProxyVendorAccount()],
          })}
        />
      </DemoDiv>
    </DemoStack>
  ),
};

export const DetailLinkView: Story = {
  render: () => {
    const va = useLazyRef(() => anonProxyVendorAccount());
    return (
      <DemoStack row wrap>
        <DemoDiv>
          <h2>Endless polling</h2>
          <PrivateAccountDetail
            initialStep="link"
            user={currentMember()}
            setUser={noop}
            id={1}
            apiCalls={makeApiCalls({
              accounts: [va],
              auths: [va],
              polls: [
                {
                  foundChange: false,
                  successInstructions: "Here are success instructions.",
                  vendorAccount: va,
                },
              ],
            })}
          />
        </DemoDiv>
        <DemoDiv>
          <h2>Success polling</h2>
          <PrivateAccountDetail
            initialStep="link"
            user={currentMember()}
            setUser={noop}
            id={1}
            apiCalls={makeApiCalls({
              accounts: [va],
              auths: [va],
              polls: [
                {
                  foundChange: true,
                  successInstructions: "Here are success instructions.",
                  vendorAccount: va,
                },
              ],
            })}
          />
        </DemoDiv>
      </DemoStack>
    );
  },
};

function DemoDiv({ children }: { children: any }) {
  return <div style={{ maxWidth: 330 }}>{children}</div>;
}

interface BuildApiCallsParams {
  accounts?: AnonProxyVendorAccount[];
  charges?: CurrentMember[];
  polls?: AnonProxyVendorAccountPollResult[];
  auths?: AnonProxyVendorAccount[];
}

function makeApiCalls(params: BuildApiCallsParams): PrivateAccountDetailApiCalls {
  return {
    processAccount: sequencedResponseMocker("processAccount", params.accounts ?? []),
    chargeLedgerBalance: sequencedResponseMocker(
      "chargeLedgerBalance",
      params.charges ?? [],
      250
    ),
    pollForNewPrivateAccountMagicLink: sequencedResponseMocker(
      "pollForNewPrivateAccountMagicLink",
      params.polls ?? [],
      500
    ),
    makeAuthRequest: sequencedResponseMocker("makeAuthRequest", params.auths ?? [], 500),
  };
}
