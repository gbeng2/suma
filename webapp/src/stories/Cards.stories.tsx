import BrandCard from "../ui/BrandCard";
import Button from "../ui/Button";
import Card from "../ui/Card";
import CardBody from "../ui/CardBody";
import CardImage from "../ui/CardImage";
import CardText from "../ui/CardText";
import CheckableCard from "../ui/CheckableCard";
import Stack from "../ui/Stack";
import Tile from "../ui/Tile";
import { DemoStack } from "./helpers.tsx";
import type { Meta, StoryObj } from "@storybook/preact-vite";

const meta = {
  title: "Styleguide/Cards",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <DemoStack>
      <Card>
        <CardBody>
          <CardText variant="title">Your savings so far</CardText>
          <CardText>Across every offer you have used</CardText>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardText variant="title">Roasted Turkey Dinner</CardText>
          <CardText variant="subtitle">Local Market</CardText>
          <CardText variant="text">Turkey, stuffing, gravy and rolls.</CardText>
          <CardText variant="subtext">Feeds 4–6. Limit 1 per person</CardText>
        </CardBody>
      </Card>
      <Card>
        <CardBody padding={10}>
          <CardText variant="title">Different padding</CardText>
        </CardBody>
      </Card>
    </DemoStack>
  ),
};

export const CheckableStates: Story = {
  render: () => (
    <DemoStack>
      <CheckableCard checked={false}>
        <CardBody>
          <CardText>This card is unchecked.</CardText>
        </CardBody>
      </CheckableCard>
      <CheckableCard checked>
        <CardBody>
          <CardText>This card is checked.</CardText>
        </CardBody>
      </CheckableCard>
      <CheckableCard checked={false} className="is-focus-visible">
        <CardBody>
          <CardText>This card has focus.</CardText>
        </CardBody>
      </CheckableCard>
      <CheckableCard checked={false} disabled>
        <CardBody>
          <CardText>This card is disabled.</CardText>
        </CardBody>
      </CheckableCard>
    </DemoStack>
  ),
};

export const CheckableWithTile: Story = {
  render: () => (
    <DemoStack>
      <CheckableCard checked={false} style={{ maxWidth: 150 }}>
        <CardBody>
          <Tile>RC</Tile>
          <CardText variant="subtitle">Rosewod Commons</CardText>
          <CardText variant="subtext">Affordable housing</CardText>
        </CardBody>
      </CheckableCard>
      <CheckableCard checked style={{ maxWidth: 150 }}>
        <CardBody>
          <Tile>RC</Tile>
          <CardText variant="subtitle">Rosewod Commons</CardText>
          <CardText variant="subtext">Affordable housing</CardText>
        </CardBody>
      </CheckableCard>
    </DemoStack>
  ),
};

export const WithImage: Story = {
  render: () => (
    <DemoStack>
      <Card>
        <CardImage>
          <div style={{ backgroundColor: "var(--fill-success-strong)", height: 100 }} />
        </CardImage>
        <CardBody>
          <Stack col gap={3}>
            <h3>Card with flush image</h3>
            <p>Here is detail text.</p>
          </Stack>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Stack col gap={3}>
            <CardImage variant="inset">
              <div
                style={{ backgroundColor: "var(--fill-success-strong)", height: 100 }}
              />
            </CardImage>
            <h3>Card with inset image</h3>
            <p>Here is detail text.</p>
          </Stack>
        </CardBody>
      </Card>
    </DemoStack>
  ),
};

export const Brand: Story = {
  render: () => (
    <DemoStack>
      <BrandCard
        pillText={<span>IN REVIEW &bull; Aug 7, 2026</span>}
        title={<span>We&rsquo;re verifying your details</span>}
        text="Our staff is verifying your details with Roseway Commons.
            We will message you when we've confirmed."
        helpText={
          <span>Call or text (555) 123-1234 &bull; 9am - 5pm, Monday to Friday</span>
        }
      >
        <Button>Contact Support</Button>
      </BrandCard>
      <BrandCard text="Are you ready to claim your order at Local Farmers Market?">
        <Button className="mt-4 w-100">Yes</Button>
        <Button variant="outline" className="mt-2 w-100">
          Back
        </Button>
      </BrandCard>
    </DemoStack>
  ),
};
