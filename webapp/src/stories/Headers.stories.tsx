import { RoutePath } from "../routing/RoutePath.ts";
import Breadcrumb from "../ui/Breadcrumb.tsx";
import ImageHeader from "../ui/ImageHeader.tsx";
import ProgressStepHeader from "../ui/ProgressStepHeader.tsx";
import TextHeader from "../ui/TextHeader.tsx";
import { DemoStack } from "./helpers.tsx";
import type { Meta, StoryObj } from "@storybook/preact-vite";

const meta = {
  title: "Styleguide/Headers",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressSteps: Story = {
  render: () => (
    <DemoStack>
      <ProgressStepHeader step={1} steps={5} />
      <ProgressStepHeader step={4} steps={5} />
      <ProgressStepHeader step={5} steps={5} />
    </DemoStack>
  ),
};

export const Breadcrumbs: Story = {
  render: () => (
    <DemoStack className="align-items-start">
      <h2>Back</h2>
      <Breadcrumb />
      <Breadcrumb>Hello</Breadcrumb>
      <h2>Left</h2>
      <Breadcrumb variant="left" />
      <Breadcrumb variant="left">Hello</Breadcrumb>
      <h2>Right</h2>
      <Breadcrumb variant="right" />
      <Breadcrumb variant="right">Hello</Breadcrumb>
    </DemoStack>
  ),
};

export const ImageHeaders: Story = {
  render: () => (
    <DemoStack>
      <ImageHeader backTo={"#" as RoutePath} backLabel="Home" bottomFlow>
        <div style={{ backgroundColor: "var(--fill-primary-strong)", height: "120px" }} />
      </ImageHeader>
      <hr />
      <ImageHeader>
        <div style={{ backgroundColor: "var(--fill-primary-strong)", height: "120px" }} />
      </ImageHeader>
    </DemoStack>
  ),
};

export const TextHeaders: Story = {
  render: () => (
    <DemoStack>
      <TextHeader
        backTo={"#" as RoutePath}
        backLabel="Home"
        title="Offers"
        subtitle="4 offers currently available"
      />
      <hr />
      <TextHeader title="Offers" subtitle="4 offers currently available" />
      <hr />
      <TextHeader
        variant="section"
        title="Offers"
        subtitle="4 offers currently available"
      />
    </DemoStack>
  ),
};
