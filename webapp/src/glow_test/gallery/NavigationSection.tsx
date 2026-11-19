import { untypedRoutePath } from "../../routing/RoutePath.ts";
import offeringCover from "../assets/offering-header-cover.png";
import programCover from "../assets/program-header-cover.png";
import Alert from "../components/Alert.tsx";
import BackButton from "../components/BackButton.tsx";
import Breadcrumb from "../components/Breadcrumb.tsx";
import Chip from "../components/Chip.tsx";
import Nav from "../components/Nav.tsx";
import NavOption from "../components/NavOption.tsx";
import OfferingHeader from "../components/OfferingHeader.tsx";
import Page from "../components/Page.tsx";
import PageHeader from "../components/PageHeader.tsx";
import Pagination from "../components/Pagination.tsx";
import ProgramHeader from "../components/ProgramHeader.tsx";
import SectionHeader from "../components/SectionHeader.tsx";
import { ShoppingCart } from "../icons";
import Specimen, { Col, Row } from "./Specimen.tsx";
import React from "react";

/** The gallery has no pages to go to, so links and buttons do nothing. */
const noop = (e: React.MouseEvent) => e.preventDefault();

const offeringStats = [
  { value: "Nov 6", label: "Order by" },
  { value: "Dec 21", label: "Pick up · 3 places" },
];
const closesSoonChip = <Chip color="warning">Closes soon</Chip>;

/** Figma section "Navigation" (2472:17829). */
export default function NavigationSection() {
  const [tab, setTab] = React.useState("home");
  const [page, setPage] = React.useState(1);
  return (
    <section className="gallery-section" id="navigation">
      <h2>Navigation</h2>
      <Specimen title="BottomNav" node="1922:12349">
        <Col>
          {["home", "commerce", "map", "more"].map((key) => (
            <div key={key} style={{ width: 375 }}>
              <Nav active={key} />
            </div>
          ))}
        </Col>
      </Specimen>
      <Specimen title="NavOption" node="2436:741">
        <Row>
          <NavOption label="Home" Icon={ShoppingCart} onClick={noop} />
          <NavOption label="Home" Icon={ShoppingCart} active onClick={noop} />
        </Row>
      </Specimen>
      <Specimen title="PageHeader" node="2436:767">
        <div style={{ width: 343 }}>
          <PageHeader title="Offers" subtitle="4 offers currently available" />
        </div>
      </Specimen>
      <Specimen title="SectionHeader" node="2436:779">
        <Col>
          <div style={{ width: 343 }}>
            <SectionHeader
              title="Ways to save"
              text="Programs pay part of the price for you. Pick one to see what’s in it."
            />
          </div>
          <div style={{ width: 343 }}>
            <SectionHeader
              title="Ways to save"
              text="Programs pay part of the price for you. Pick one to see what’s in it."
              endLink={
                <Breadcrumb direction="right" onClick={noop}>
                  See all
                </Breadcrumb>
              }
            />
          </div>
        </Col>
      </Specimen>
      <Specimen title="BreadcrumbButton" node="2436:778">
        <Row>
          <Breadcrumb direction="left" noOffset onClick={noop}>
            Orders
          </Breadcrumb>
          <Breadcrumb direction="right" onClick={noop}>
            See all
          </Breadcrumb>
        </Row>
      </Specimen>
      <Specimen title="Pagination" node="2436:935">
        <Col>
          {[0, 1, 2].map((pg) => (
            <div key={pg} style={{ width: 343 }}>
              <Pagination page={pg} pageCount={3} onPageChange={() => null} />
            </div>
          ))}
          {/* This one works: click the arrows. */}
          <div style={{ width: 343 }}>
            <Pagination page={page} pageCount={5} onPageChange={setPage} />
          </div>
        </Col>
      </Specimen>
      <Specimen title="BackButton" node="2026:11492">
        <Row>
          <BackButton onClick={noop}>Offers</BackButton>
          <BackButton onClick={noop} className="is-hover">
            Offers
          </BackButton>
          <BackButton onClick={noop} className="is-pressed">
            Offers
          </BackButton>
          <BackButton onClick={noop} hideLabel>
            Offers
          </BackButton>
          <BackButton onClick={noop} hideLabel className="is-hover">
            Offers
          </BackButton>
          <BackButton onClick={noop} hideLabel className="is-pressed">
            Offers
          </BackButton>
        </Row>
      </Specimen>
      <Specimen title="ProgramHeader" node="1843:2826">
        <Row>
          <div style={{ width: 390 }}>
            <ProgramHeader
              image={programCover}
              backLabel="Home"
              onBack={noop}
              title="Holiday Meals"
              description="Staple offering from suma with delicious meals from a variety of local vendors"
            />
          </div>
          <div style={{ width: 390 }}>
            <ProgramHeader
              backLabel="Home"
              onBack={noop}
              title="Holiday Meals"
              description="Staple offering from suma with delicious meals from a variety of local vendors"
            />
          </div>
        </Row>
      </Specimen>
      <Specimen title="OfferingHeader" node="1862:4230">
        <Row>
          <div style={{ width: 390 }}>
            <OfferingHeader
              image={offeringCover}
              backLabel="Offers"
              onBack={noop}
              chip={closesSoonChip}
              title="Holidays Demo"
              description="This is an optional description"
              stats={offeringStats}
            >
              <Alert
                emphasis="soft"
                title="Purchase limit reached"
                to={untypedRoutePath("/glow_test/components")}
              />
            </OfferingHeader>
          </div>
          <div style={{ width: 390 }}>
            <OfferingHeader
              image={offeringCover}
              backLabel="Offers"
              onBack={noop}
              chip={closesSoonChip}
              title="Holidays Demo"
              description="This is an optional description"
              stats={offeringStats}
            />
          </div>
          <div style={{ width: 390 }}>
            <OfferingHeader
              backLabel="Offers"
              onBack={noop}
              chip={closesSoonChip}
              title="Holidays Demo"
              description="This is an optional description"
              stats={offeringStats}
            />
          </div>
        </Row>
      </Specimen>
      <Specimen title="Example Tab root" node="2472:17830">
        <div style={{ width: 375 }}>
          <Page fullHeight={false} nav={<Nav active={tab} onSelect={setTab} />}>
            <PageHeader title="Offers" subtitle="4 offers currently available" />
            <SectionHeader
              title="Ways to save"
              text="Programs pay part of the price for you. Pick one to see what’s in it."
              endLink={
                <Breadcrumb direction="right" onClick={noop}>
                  See all
                </Breadcrumb>
              }
            />
          </Page>
        </div>
      </Specimen>
    </section>
  );
}
