import Drawer from "../components/mobilitymap/Drawer.tsx";
import DrawerContentsGeneralError from "../components/mobilitymap/DrawerContentsGeneralError.tsx";
import DrawerContentsLoading from "../components/mobilitymap/DrawerContentsLoading.tsx";
import DrawerContentsOngoingTrip from "../components/mobilitymap/DrawerContentsOngoingTrip.tsx";
import DrawerContentsPostTrip from "../components/mobilitymap/DrawerContentsPostTrip.tsx";
import DrawerContentsPreTrip from "../components/mobilitymap/DrawerContentsPreTrip.tsx";
import DrawerContentsVehicleError from "../components/mobilitymap/DrawerContentsVehicleError.tsx";
import MapWithDrawer from "../components/mobilitymap/MapWithDrawer.tsx";
import { appError } from "../modules/feedback.ts";
import { mobilityTrip, money, rate, vendorService } from "./fixtures.ts";
import { DemoStack } from "./helpers.tsx";
import mapBackgroundPng from "./map-background.png";
import type { Meta, StoryObj } from "@storybook/preact-vite";
import noop from "lodash/noop";

const meta = {
  title: "Styleguide/Map",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const mapVendorService: MobilityMapProvider = {
  ...vendorService(),
  usageProhibitedReason: "usage_prohibited_cash_balance",
  rate: rate(),
};

const baseVehicle: MobilityDetailedVehicle = {
  precision: 1,
  vendorService: vendorService(),
  vehicleId: "vehicle1",
  loc: [40, 120],
  rate: rate(),
  subsidyMatchPercentage: 0,
  deeplink: "",
  gotoPrivateAccount: "",
  usageProhibitedReason: "",
};

const prohibitedVehicle = {
  ...baseVehicle,
  usageProhibitedReason: "usage_prohibited_cash_balance",
};

const deeplinkVehicle = {
  ...baseVehicle,
  deeplink: "#deeplink",
};

const privateAccountVehicle = {
  ...baseVehicle,
  gotoPrivateAccount: "#private-accounts",
};

const trip = mobilityTrip();

export const Cards: Story = {
  render: () => (
    <DemoStack className="page-padding">
      <h1>Pre trip</h1>

      <h3>Deeplink</h3>
      <Drawer noPosition>
        <DrawerContentsPreTrip vehicle={deeplinkVehicle} onReserve={noop} />
      </Drawer>
      <h3>Go-to private account</h3>
      <Drawer noPosition>
        <DrawerContentsPreTrip vehicle={privateAccountVehicle} onReserve={noop} />
      </Drawer>
      <h3>Usage prohibited</h3>
      <Drawer noPosition>
        <DrawerContentsPreTrip vehicle={prohibitedVehicle} onReserve={noop} />
      </Drawer>
      <h3>With subsidy</h3>
      <Drawer noPosition>
        <DrawerContentsPreTrip
          vehicle={{ ...deeplinkVehicle, subsidyMatchPercentage: 20 }}
          onReserve={noop}
        />
      </Drawer>
      <h3>With discounted rate</h3>
      <Drawer noPosition>
        <DrawerContentsPreTrip
          vehicle={{
            ...deeplinkVehicle,
            rate: rate({
              surcharge: money(0),
              unitAmount: money(7),
              undiscountedRate: rate({
                surcharge: money(100),
                unitAmount: money(25),
              }),
            }),
          }}
          onReserve={noop}
        />
      </Drawer>

      <h1>Ongoing trip</h1>

      <Drawer noPosition>
        <DrawerContentsOngoingTrip
          trip={trip}
          onCloseTrip={noop}
          onEndTrip={noop}
          lastLocation={{ latlng: { lat: 1, lng: 1 } }}
        />
      </Drawer>

      <h1>Completed trip</h1>

      <Drawer noPosition>
        <DrawerContentsPostTrip endTrip={trip} onCloseTrip={noop} />
      </Drawer>

      <h2>Misc States</h2>

      <h3>Loading</h3>
      <Drawer noPosition>
        <DrawerContentsLoading />
      </Drawer>

      <h3>Page error</h3>
      <Drawer noPosition>
        <DrawerContentsGeneralError error={appError("read_only_technical_error")} />
      </Drawer>

      <h3>Vehicle error</h3>
      <Drawer noPosition>
        <DrawerContentsVehicleError
          error={appError("read_only_technical_error")}
          provider={mapVendorService}
        />
      </Drawer>
    </DemoStack>
  ),
};

export const Map: Story = {
  render: () => (
    <DemoStack>
      <h2>Map with Card</h2>
      <div style={{ width: 360, height: 500 }}>
        <MapWithDrawer
          map={
            <img
              src={mapBackgroundPng}
              alt=""
              height={500}
              width={360}
              style={{ objectFit: "cover", objectPosition: "bottom" }}
            />
          }
          content={
            <DrawerContentsGeneralError error={appError("read_only_technical_error")} />
          }
        />
      </div>
    </DemoStack>
  ),
};
