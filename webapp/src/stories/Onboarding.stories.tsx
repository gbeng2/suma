import Drawer from "../components/mobilitymap/Drawer.tsx";
import DrawerContentsGeneralError from "../components/mobilitymap/DrawerContentsGeneralError.tsx";
import DrawerContentsLoading from "../components/mobilitymap/DrawerContentsLoading.tsx";
import DrawerContentsOngoingTrip from "../components/mobilitymap/DrawerContentsOngoingTrip.tsx";
import DrawerContentsPostTrip from "../components/mobilitymap/DrawerContentsPostTrip.tsx";
import DrawerContentsPreTrip from "../components/mobilitymap/DrawerContentsPreTrip.tsx";
import DrawerContentsVehicleError from "../components/mobilitymap/DrawerContentsVehicleError.tsx";
import MapWithDrawer from "../components/mobilitymap/MapWithDrawer.tsx";
import { appError } from "../modules/feedback.ts";
import Home from "../pages/onboarding/Home.tsx";
import OneTimePassword from "../pages/onboarding/OneTimePassword.tsx";
import Start from "../pages/onboarding/Start.tsx";
import { mobilityTrip, money, rate, vendorService } from "./fixtures.ts";
import { DemoStack } from "./helpers.tsx";
import mapBackgroundPng from "./map-background.png";
import type { Meta, StoryObj } from "@storybook/preact-vite";
import noop from "lodash/noop";

const meta = {
  title: "Styleguide/Onboarding",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Homepage: Story = {
  render: () => <Home />,
};

export const Startpage: Story = {
  render: () => <Start />,
};

export const OneTimePasswords: Story = {
  parameters: {
    initialEntries: [{ pathname: "/", state: { phoneNumber: "+15551234567" } }],
  },
  render: () => <OneTimePassword />,
};
