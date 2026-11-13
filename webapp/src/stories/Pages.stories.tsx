import ErrorPage from "../components/ErrorPage.tsx";
import LoadingPage from "../components/LoadingPage.tsx";
import Page from "../ui/Page.tsx";
import TextHeader from "../ui/TextHeader.tsx";
import { DemoStack } from "./helpers.tsx";
import type { Meta, StoryObj } from "@storybook/preact-vite";

const meta = {
  title: "Styleguide/Pages",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorPageBack: Story = {
  render: () => (
    <DemoStack>
      <ErrorPage variant="back" page={true} />
    </DemoStack>
  ),
};

export const ErrorPageHome: Story = {
  render: () => (
    <DemoStack>
      <ErrorPage variant="home" page={true} />
    </DemoStack>
  ),
};

export const ErrorPageHeader: Story = {
  render: () => (
    <DemoStack>
      <ErrorPage
        variant="home"
        page={true}
        header={<TextHeader title="Some title" subtitle="Some subtitle" />}
      />
    </DemoStack>
  ),
};

export const ErrorPageEmbedded: Story = {
  render: () => (
    <DemoStack>
      <Page>
        <TextHeader title="This is outside ErrorPage" />
        <ErrorPage variant="home" page={false} />
      </Page>
    </DemoStack>
  ),
};

export const LoadingPageSimple: Story = {
  render: () => (
    <DemoStack>
      <LoadingPage page={true} />
    </DemoStack>
  ),
};

export const LoadingPageHeader: Story = {
  render: () => (
    <DemoStack>
      <LoadingPage
        page={true}
        header={<TextHeader title="Some title" subtitle="Some subtitle" />}
      />
    </DemoStack>
  ),
};

export const LoadingPageEmbedded: Story = {
  render: () => (
    <DemoStack>
      <Page>
        <TextHeader title="This is outside LoadingPage" />
        <LoadingPage page={false} />
      </Page>
    </DemoStack>
  ),
};
