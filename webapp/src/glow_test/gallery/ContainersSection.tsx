import useToggle from "../../state/useToggle.ts";
import photoLemon from "../assets/photo-lemon.png";
import Button from "../components/Button.tsx";
import Card from "../components/Card.tsx";
import CardBody from "../components/CardBody.tsx";
import CardImage from "../components/CardImage.tsx";
import CardRow from "../components/CardRow.tsx";
import CardText from "../components/CardText.tsx";
import DefinitionTable from "../components/DefinitionTable.tsx";
import { Dialog } from "../components/Dialog.tsx";
import DialogYesNo from "../components/DialogYesNo.tsx";
import IconChip from "../components/IconChip.tsx";
import KeyValueList from "../components/KeyValueList.tsx";
import Stack from "../components/Stack.tsx";
import Table from "../components/Table.tsx";
import TableBody from "../components/TableBody.tsx";
import TableRow from "../components/TableRow.tsx";
import { ShoppingCart } from "../icons";
import Specimen, { Col, Row } from "./Specimen.tsx";
import React from "react";

/** Figma frame width of most container components. */
const W = 320;

/** The title + subtext used in most Figma card examples. */
function CardTexts() {
  return (
    <>
      <CardText variant="title">Roasted Turkey Dinner</CardText>
      <CardText variant="subtext">Local Market</CardText>
    </>
  );
}

/** Figma section "Containers" (2472:17610). */
export default function ContainersSection() {
  const dialogToggle = useToggle(false);
  const dialogFocusRef = React.useRef<HTMLButtonElement>(null);

  return (
    <section className="gallery-section" id="containers">
      <h2>Containers</h2>

      <Specimen title="Card" node="2391:48">
        {/* surface=Default */}
        <div style={{ width: W }}>
          <Card>
            <CardBody gap={3}>
              <CardTexts />
            </CardBody>
          </Card>
        </div>
        {/* surface=Grouped */}
        <div style={{ width: W }}>
          <Card>
            <CardRow>Support</CardRow>
            <CardRow>Theme</CardRow>
          </Card>
        </div>
      </Specimen>

      <Specimen title="CardText" node="2391:15">
        <Col>
          <CardText variant="title">Title</CardText>
          <CardText variant="subtitle">Subtitle</CardText>
          <CardText variant="text">Text</CardText>
          <CardText variant="subtext">Subtext</CardText>
        </Col>
      </Specimen>

      <Specimen title="CardRow" node="2391:28">
        <div style={{ width: W }}>
          <CardRow>Theme</CardRow>
        </div>
        <div style={{ width: W }}>
          <CardRow selected>Theme</CardRow>
        </div>
      </Specimen>

      <Specimen title="CardImage" node="2391:51">
        <div style={{ width: W }}>
          <CardImage />
        </div>
        <div style={{ width: 284 }}>
          <CardImage variant="inset" />
        </div>
        {/* Not in Figma: shows how a photo is cropped. */}
        <div style={{ width: 284 }}>
          <CardImage variant="inset">
            <img src={photoLemon} alt="" />
          </CardImage>
        </div>
      </Specimen>

      <Specimen title="IconChip" node="2393:30">
        <IconChip icon={ShoppingCart} color="primary" size="md" />
        <IconChip icon={ShoppingCart} color="primary" size="lg" />
        <IconChip icon={ShoppingCart} color="accent" size="md" />
        <IconChip icon={ShoppingCart} color="accent" size="lg" />
      </Specimen>

      <Specimen title="DefinitionTable" node="2393:52">
        <div style={{ width: W }}>
          <DefinitionTable items={[{ label: "Order", value: "#1903" }]} />
        </div>
      </Specimen>

      <Specimen title="TableRow" node="2393:61">
        <Col>
          <div style={{ width: W }}>
            <Table>
              <TableBody>
                <TableRow cells={["Items", "$24.00"]} />
              </TableBody>
            </Table>
          </div>
          <div style={{ width: W }}>
            <Table>
              <TableBody>
                <TableRow muted cells={["Covered by SNAP", "−$12.00"]} />
              </TableBody>
            </Table>
          </div>
        </Col>
      </Specimen>

      <Specimen title="KeyValueList" node="2678:33635">
        <div style={{ width: W }}>
          <KeyValueList items={[{ label: "Items", value: "$24.00" }]} />
        </div>
      </Specimen>

      <Specimen title="Examples" node="2472:17617">
        {/* Card · image */}
        <div style={{ width: W }}>
          <Card>
            <CardImage />
            <CardBody gap={3}>
              <CardTexts />
            </CardBody>
          </Card>
        </div>
        {/* Card · image inset */}
        <div style={{ width: W }}>
          <Card>
            <CardBody gap={5}>
              <CardImage variant="inset" />
              <Stack direction="vertical" gap={3}>
                <CardTexts />
              </Stack>
            </CardBody>
          </Card>
        </div>
        {/* Table */}
        <div style={{ width: W }}>
          <Card>
            <Table>
              <TableBody>
                <TableRow cells={["Items", "$24.00"]} />
                <TableRow muted cells={["Covered by SNAP", "−$12.00"]} />
                <TableRow cells={["You pay", "$12.00"]} />
              </TableBody>
            </Table>
          </Card>
        </div>
        {/* Definition table */}
        <div style={{ width: W }}>
          <DefinitionTable
            items={[
              { label: "Order", value: "#1903" },
              { label: "Pick up", value: "Dec 21–22" },
            ]}
          />
        </div>
      </Specimen>

      <Specimen title="Dialog" node="2472:17636">
        {/*
          A fake screen, to show the dialog without opening it. It uses the same
          markup and classes as Dialog.tsx. Real code must use <Dialog>, like below.
        */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: 390,
            height: 735,
            background: "var(--bg-scrim)",
          }}
        >
          <dialog open className="dialog" style={{ position: "relative" }}>
            <div className="dialog-container">
              <DialogYesNo
                dialogId="gallery-dialog-static"
                header="Claim order #1903?"
                body="Only do this at the counter, once staff hand you your items. You can't undo it."
                yesText="Yes, I have my items"
                noText="Not yet"
                toggle={dialogToggle}
                onYes={() => {}}
                onNo={() => {}}
              />
            </div>
          </dialog>
        </div>
        <Row>
          <Button variant="outline" onClick={dialogToggle.turnOn}>
            Open dialog
          </Button>
          <Dialog
            open={dialogToggle.isOn}
            onClose={dialogToggle.turnOff}
            labelledBy="gallery-dialog"
            initialFocusRef={dialogFocusRef}
          >
            <DialogYesNo
              dialogId="gallery-dialog"
              header="Claim order #1903?"
              body="Only do this at the counter, once staff hand you your items. You can't undo it."
              yesText="Yes, I have my items"
              noText="Not yet"
              toggle={dialogToggle}
              focusRef={dialogFocusRef}
              onYes={dialogToggle.turnOff}
            />
          </Dialog>
        </Row>
      </Specimen>
    </section>
  );
}
