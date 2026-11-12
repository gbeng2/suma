import IndeterminateLoader from "../ui/IndeterminateLoader";
import { DemoStack } from "./helpers.tsx";
import type { Meta, StoryObj } from "@storybook/preact-vite";

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed ligula blandit, " +
  "dictum massa quis, lobortis metus. Nunc ac justo nec ante tincidunt euismod ut vel " +
  "libero. Sed gravida porta malesuada. Sed iaculis pretium urna vel elementum.";

const meta = {
  title: "Styleguide/Loaders",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {
  render: () => (
    <DemoStack>
      <DemoStack row>
        <IndeterminateLoader variant="plain" size={20} />
        <IndeterminateLoader variant="plain" size={40} />
        <IndeterminateLoader variant="plain" />
      </DemoStack>
      <DemoStack row>
        <IndeterminateLoader variant="plain" size={20} color="primary" />
        <IndeterminateLoader variant="plain" size={40} color="danger" />
        <IndeterminateLoader variant="plain" color="success" />
      </DemoStack>
    </DemoStack>
  ),
};

export const Content: Story = {
  render: () => (
    <DemoStack>
      <p>{LOREM_IPSUM}</p>
      <div className="position-relative">
        <p>{LOREM_IPSUM}</p>
        <p>{LOREM_IPSUM}</p>
        <p>{LOREM_IPSUM}</p>
        <IndeterminateLoader variant="content" />
      </div>
      <p>{LOREM_IPSUM}</p>
    </DemoStack>
  ),
};

export const Screen: Story = {
  render: () => (
    <DemoStack>
      <div className="position-relative">
        <p>{LOREM_IPSUM}</p>
        <IndeterminateLoader variant="screen" />
      </div>
    </DemoStack>
  ),
};
