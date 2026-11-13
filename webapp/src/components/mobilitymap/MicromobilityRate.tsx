import { t } from "../../localization";
import Chip from "../../ui/Chip.tsx";
import Stack from "../../ui/Stack.tsx";

export default function MicromobilityRate({ rate }: { rate: Rate | SimpleRate }) {
  // MobilityMapProvider only carries a SimpleRate, which has no discount info;
  // the discount-related fields are only present on a full Rate.
  const fullRate = rate as Rate;
  if (!fullRate.undiscountedRate) {
    return (
      <p className="mb-0">
        {t("mobility.rate_micromobility", {
          surcharge: rate.surcharge,
          unitAmount: rate.unitAmount,
        })}
      </p>
    );
  }

  return (
    <Stack gap={3} col align="start">
      <Chip variant="success">{fullRate.name}</Chip>
      <p className="h3 font-weight-medium color-success">
        {t("mobility.rate_micromobility", {
          surcharge: rate.surcharge,
          unitAmount: rate.unitAmount,
        })}
      </p>
      <p className="font-size-body-sm color-secondary-mute text-strikethrough">
        {t("mobility.rate_micromobility", {
          surcharge: fullRate.undiscountedRate.surcharge,
          unitAmount: fullRate.undiscountedRate.unitAmount,
        })}
      </p>
    </Stack>
  );
}
