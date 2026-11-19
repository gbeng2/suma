import Alert from "../components/Alert.tsx";
import AlertStack from "../components/AlertStack.tsx";
import Button from "../components/Button.tsx";
import Checklist from "../components/Checklist.tsx";
import ChecklistItem from "../components/ChecklistItem.tsx";
import Chip from "../components/Chip.tsx";
import IndeterminateLoader from "../components/IndeterminateLoader.tsx";
import InputFeedback from "../components/InputFeedback.tsx";
import ProgressBar from "../components/ProgressBar.tsx";
import ProgressCircle from "../components/ProgressCircle.tsx";
import Spinner from "../components/Spinner.tsx";
import { Clock, Prohibit } from "../icons";
import Specimen, { Col, Row } from "./Specimen.tsx";

const colors = ["primary", "secondary", "success", "warning", "danger"] as const;

/** Figma section "Data Display & Feedback" (2472:17688). */
export default function DataDisplaySection() {
  return (
    <section className="gallery-section" id="data-display">
      <h2>Data Display &amp; Feedback</h2>
      <Specimen title="Alert" node="2413:329">
        <Col>
          <div style={{ width: 343 }}>
            <Alert
              title="2 orders ready for pickup"
              text="Show your order number at the counter."
            />
          </div>
          <div style={{ width: 343 }}>
            <Alert
              emphasis="soft"
              title="2 orders ready for pickup"
              text="Show your order number at the counter."
              to="/glow_test/components"
            />
          </div>
          <div style={{ width: 343 }}>
            <Alert
              title="2 orders ready for pickup"
              text="Show your order number at the counter."
              action={
                <Button variant="outline" size="sm">
                  OK
                </Button>
              }
            />
          </div>
          <div style={{ width: 343 }}>
            <Alert border={false} icon={null} title="No icon, no border, no text" />
          </div>
        </Col>
        <Col>
          {colors.map((c) => (
            <div key={c} style={{ width: 343 }}>
              <Alert color={c} title={`Color ${c}`} text="Strong emphasis." />
            </div>
          ))}
        </Col>
        <Col>
          {colors.map((c) => (
            <div key={c} style={{ width: 343 }}>
              <Alert
                color={c}
                emphasis="soft"
                title={`Color ${c}`}
                text="Soft emphasis."
              />
            </div>
          ))}
        </Col>
      </Specimen>
      <Specimen title="AlertStack" node="1728:4003">
        <div style={{ width: 320 }}>
          <AlertStack
            title="Alert Stack"
            text="Support text is visible"
            footer={<Button variant="ghost">See all 4 alerts</Button>}
          >
            <Alert
              color="danger"
              emphasis="soft"
              icon={Prohibit}
              title="Your balance is -$50. Please pay to regain access."
              to="/glow_test/components"
            />
            <Alert
              emphasis="soft"
              title="Your order is ready to be claimed."
              text="Holiday Demo · 1 item"
              to="/glow_test/components"
            />
          </AlertStack>
        </div>
        <div style={{ width: 320 }}>
          <AlertStack>
            <Alert emphasis="soft" title="No heading, no footer." />
          </AlertStack>
        </div>
      </Specimen>
      <Specimen title="Chip" node="2414:154">
        <Col>
          <Row>
            <Chip>Preparing</Chip>
            <Chip weight="strong">Preparing</Chip>
            <Chip icon={<Clock />}>Preparing</Chip>
            <Chip weight="strong" icon={<Clock />}>
              Preparing
            </Chip>
          </Row>
          <Row>
            {colors.map((c) => (
              <Chip key={c} color={c}>
                {c}
              </Chip>
            ))}
          </Row>
          <Row>
            {colors.map((c) => (
              <Chip key={c} color={c} weight="strong">
                {c}
              </Chip>
            ))}
          </Row>
        </Col>
      </Specimen>
      <Specimen title="InputFeedback" node="2414:163">
        <Col>
          <div style={{ width: 343 }}>
            <InputFeedback inputId="gallery-help" help="Where you live now." />
          </div>
          <div style={{ width: 343 }}>
            <InputFeedback inputId="gallery-error" error="Choose your state." />
          </div>
          <div style={{ width: 343 }}>
            <InputFeedback
              inputId="gallery-help-no-icon"
              help="Where you live now."
              icon={false}
            />
          </div>
        </Col>
      </Specimen>
      <Specimen title="Spinner" node="2414:164">
        <Spinner />
        <Spinner size={32} />
      </Specimen>
      <Specimen title="Loader" node="2418:16711">
        <IndeterminateLoader variant="plain" />
        {/* The content loader covers its closest positioned parent. */}
        <div style={{ width: 240, height: 160, position: "relative" }}>
          Content under the loader. Content under the loader.
          <IndeterminateLoader variant="content" />
        </div>
      </Specimen>
      <Specimen title="ProgressCircle" node="2414:192">
        <ProgressCircle value={25} />
        <ProgressCircle value={75} />
        <ProgressCircle value={100} />
        <div
          style={{
            background: "var(--fill-primary-strong)",
            padding: "var(--space-4)",
            borderRadius: "var(--border-radius-3)",
            display: "flex",
          }}
        >
          <ProgressCircle value={75} surface="on-strong" />
        </div>
      </Specimen>
      <Specimen title="ProgressBar" node="2692:22443">
        <Col>
          <div style={{ width: 341 }}>
            <ProgressBar value={40} label="Step 2 of 5" />
          </div>
          <div style={{ width: 341 }}>
            <ProgressBar value={75} />
          </div>
        </Col>
      </Specimen>
      <Specimen title="ChecklistItem" node="2436:851">
        {/* The first item of a list never has a line, like Figma line=false. */}
        <ol style={{ display: "flex", width: 258, margin: 0, padding: 0 }}>
          <ChecklistItem state="done" step={2}>
            Pick up
          </ChecklistItem>
          <ChecklistItem state="current" step={2}>
            Pick up
          </ChecklistItem>
          <ChecklistItem state="future" step={2}>
            Pick up
          </ChecklistItem>
        </ol>
      </Specimen>
      <Specimen title="Checklist" node="2436:852">
        <div style={{ width: 344 }}>
          <Checklist>
            <ChecklistItem state="done">Cart</ChecklistItem>
            <ChecklistItem state="current">Pick up</ChecklistItem>
            <ChecklistItem state="future">Payment</ChecklistItem>
            <ChecklistItem state="future">Review</ChecklistItem>
          </Checklist>
        </div>
      </Specimen>
    </section>
  );
}
