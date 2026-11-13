import { t } from "../../localization";
import { appError } from "../../modules/feedback.ts";
import { RoutePath, untypedRoutePath } from "../../routing/RoutePath.ts";
import Button from "../../ui/Button";
import Card from "../../ui/Card.tsx";
import CardBody from "../../ui/CardBody.tsx";
import FormFeedback from "../../ui/FormFeedback";
import Icon from "../../ui/Icon.tsx";
import TODO from "../TODO.tsx";
import DrawerContents from "./DrawerContents";
import DrawerContentsLoading from "./DrawerContentsLoading.tsx";
import DrawerTitle from "./DrawerTitle";
import MicromobilityRate from "./MicromobilityRate";
import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";
import React from "react";

interface PreTripProps {
  loading?: boolean;
  /** Can be null while loading is true. */
  vehicle: MobilityDetailedVehicle | null;
  onReserve: (vehicle: MobilityDetailedVehicle) => void;
  reserveError?: any;
}

/**
 * Card that shows when you click a scooter on the map.
 */
export default function DrawerContentsPreTrip({
  loading,
  vehicle,
  onReserve,
  reserveError,
}: PreTripProps) {
  if (loading) {
    return <DrawerContentsLoading />;
  }
  if (!vehicle) {
    return <TODO>error page, vehicle must be passed, is static/dev error</TODO>;
  }

  const handleReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    onReserve(vehicle!);
  };

  let action: React.ReactNode;
  if (vehicle.usageProhibitedReason) {
    action = <FormFeedback feedback={appError(vehicle.usageProhibitedReason)} />;
  } else if (vehicle.gotoPrivateAccount) {
    action = (
      <>
        <p className="mb-0">
          {t("mobility.setup_private_account_with_vendor", {
            vendorName: vehicle.vendorService.vendorName,
          })}
        </p>
        <ActionButton to="/private-accounts">{t("forms.get_started")}</ActionButton>
      </>
    );
  } else if (vehicle.deeplink) {
    action = (
      <>
        <ActionButton to={untypedRoutePath(vehicle.deeplink)}>
          {t("mobility.open_app_ride", {
            vendorName: vehicle.vendorService.vendorName,
          })}
        </ActionButton>
        <MoreInfoCard>
          {t("mobility.relink_private_account_with_vendor", {
            vendorName: vehicle.vendorService.vendorName,
          })}
        </MoreInfoCard>
      </>
    );
  } else {
    action = (
      <Button size="sm" className="w-100" onClick={handleReserve}>
        {t("mobility.reserve_scooter")}
      </Button>
    );
  }

  let matchDiv: React.ReactNode;
  if (vehicle?.subsidyMatchPercentage > 0) {
    matchDiv = (
      <div className="font-size-body-sm color-secondary-mute">
        <Icon icon={SparklesIcon} className="mr-3" />
        {t("mobility.rate_additional_savings", {
          percentage: vehicle.subsidyMatchPercentage,
        })}
      </div>
    );
  }

  return (
    <DrawerContents>
      <DrawerTitle>{vehicle.vendorService.name}</DrawerTitle>
      <MicromobilityRate rate={vehicle.rate} />
      {reserveError && <FormFeedback feedback={reserveError} />}
      {matchDiv}
      {action}
    </DrawerContents>
  );
}

function ActionButton({ to, children }: { to: RoutePath; children: React.ReactNode }) {
  return (
    <div className="d-flex align-items-center flex-column">
      <Button size="sm" to={to}>
        {children}
      </Button>
    </div>
  );
}

function MoreInfoCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="mt-5 shadow-0 font-size-body-sm">
      <CardBody>{children}</CardBody>
    </Card>
  );
}
