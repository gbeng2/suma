import { untypedRoutePath } from "../routing/RoutePath.ts";
import Alert from "../ui/Alert.tsx";
import { DemoStack } from "./helpers.tsx";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/preact-vite";

const meta = {
  title: "Styleguide/Alerts",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <DemoStack>
      <Alert text="Something terrible has happened!" color="danger" />
      <Alert text="Something great has happened!" color="success" />
      <Alert title="This also has a title" text="Something terrible has happened!" />
      <Alert title="This only has a title" color="info" />
      <Alert text="This only has text" color="warning" />
      <Alert title="This has a custom icon" icon={ShoppingBagIcon} />
      <Alert
        title="This goes somewhere"
        text="Check the hash."
        to={untypedRoutePath("#hello")}
      />
      <Alert
        text="Make sure the icon text passes through."
        to={untypedRoutePath("#hello")}
        color="danger"
      />
      <Alert color="info" icon="loader" text="Something is happening" />
    </DemoStack>
  ),
};
