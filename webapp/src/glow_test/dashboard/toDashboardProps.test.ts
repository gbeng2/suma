import {
  currentMember,
  dashboard,
  ledgersOverview,
  money,
  program,
} from "../fixtures/builders.ts";
import { DashboardApiData, DashboardNotInApiYet } from "../fixtures/dashboard.ts";
import toDashboardProps from "./toDashboardProps.ts";
import { describe, expect, it } from "vitest";

/**
 * Tests for the mapping layer.
 * Because `toDashboardProps` is a plain function (data in, data out), each test
 * is three steps: build API data, call the function, check the result.
 * Run with: npx vitest run src/glow_test
 */

function apiData(o: Partial<DashboardApiData> = {}): DashboardApiData {
  return {
    user: currentMember(),
    dashboard: dashboard(),
    ledgers: ledgersOverview({ lifetimeSavings: money(0) }),
    ...o,
  };
}

const nothingExtra: DashboardNotInApiYet = {
  paidCents: null,
  unclaimedOrderSummary: null,
};

describe("toDashboardProps", () => {
  it("returns empty lists and zero savings for a new member", () => {
    const props = toDashboardProps(apiData(), nothingExtra);
    expect(props).toEqual({ alerts: [], savedCents: 0, paidCents: null, programs: [] });
  });

  it("reads savings from the ledgers overview", () => {
    const props = toDashboardProps(
      apiData({ ledgers: ledgersOverview({ lifetimeSavings: money(36260) }) }),
      { ...nothingExtra, paidCents: 8840 }
    );
    expect(props.savedCents).toBe(36260);
    expect(props.paidCents).toBe(8840);
  });

  it("turns a server alert into a title and text", () => {
    const props = toDashboardProps(
      apiData({
        dashboard: dashboard({
          alerts: [
            {
              localizationKey: "dashboard.negative_cash_balance_v2",
              localizationParams: { amount: money(-5000) },
              variant: "danger",
            },
          ],
        }),
      }),
      nothingExtra
    );
    expect(props.alerts).toEqual([
      {
        id: "dashboard.negative_cash_balance_v2",
        color: "danger",
        icon: "prohibit",
        title: "Your balance is -$50.",
        text: "Please pay to regain access.",
        to: "/funding",
      },
    ]);
  });

  it("shows the key for a server alert with no known text", () => {
    const props = toDashboardProps(
      apiData({
        dashboard: dashboard({
          alerts: [
            {
              localizationKey: "dashboard.new_thing",
              localizationParams: {},
              variant: "x",
            },
          ],
        }),
      }),
      nothingExtra
    );
    expect(props.alerts[0]).toMatchObject({
      title: "dashboard.new_thing",
      color: "primary",
    });
  });

  it("adds an alert when the member has orders to claim", () => {
    const props = toDashboardProps(
      apiData({ user: currentMember({ unclaimedOrdersCount: 2 }) }),
      { ...nothingExtra, unclaimedOrderSummary: "Holiday Demo · 1 item" }
    );
    expect(props.alerts).toEqual([
      {
        id: "unclaimed-orders",
        color: "primary",
        icon: "info",
        title: "Your order is ready",
        text: "Holiday Demo · 1 item",
        to: "/unclaimed-orders",
      },
    ]);
  });

  it("puts server alerts before client alerts", () => {
    const props = toDashboardProps(
      apiData({
        user: currentMember({ unclaimedOrdersCount: 1 }),
        dashboard: dashboard({
          alerts: [
            { localizationKey: "a.key", localizationParams: {}, variant: "danger" },
          ],
        }),
      }),
      nothingExtra
    );
    expect(props.alerts.map((a) => a.id)).toEqual(["a.key", "unclaimed-orders"]);
  });

  it("maps a program, with and without image and link", () => {
    const props = toDashboardProps(
      apiData({
        dashboard: dashboard({
          programs: [
            program({ image: { url: "/img.png", caption: "Dinner" } }),
            program({ name: "No link", appLink: "", appLinkText: "" }),
          ],
        }),
      }),
      nothingExtra
    );
    expect(props.programs[0]).toMatchObject({
      imageUrl: "/img.png",
      imageAlt: "Dinner",
      buttonLabel: "Explore deals",
      to: "/food",
    });
    expect(props.programs[1]).toMatchObject({
      imageUrl: null,
      buttonLabel: null,
      to: null,
    });
    // Ids must differ even when two programs share a name.
    expect(props.programs[0].id).not.toBe(props.programs[1].id);
  });
});
