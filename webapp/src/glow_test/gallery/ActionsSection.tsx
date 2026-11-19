import Button, { ButtonVariant } from "../components/Button.tsx";
import ButtonGroup from "../components/ButtonGroup.tsx";
import IconButton from "../components/IconButton.tsx";
import { MagnifyingGlass } from "../icons";
import Specimen, { Col, Row } from "./Specimen.tsx";

const variants: ButtonVariant[] = ["strong", "soft", "outline", "ghost"];
const sizes = ["sm", "md", "lg"] as const;

/** Figma section "Actions" (2472:17609). */
export default function ActionsSection() {
  return (
    <section className="gallery-section" id="actions">
      <h2>Actions</h2>
      <Specimen title="Button" node="2320:114">
        <Col>
          {variants.map((v) => (
            <Row key={v}>
              {sizes.map((s) => (
                <div key={s} style={{ width: 156 }}>
                  <Button variant={v} size={s}>
                    Continue
                  </Button>
                </div>
              ))}
            </Row>
          ))}
        </Col>
      </Specimen>
      <Specimen title="IconButton" node="2320:151">
        <Col>
          {variants.map((v) => (
            <Row key={v}>
              {sizes.map((s) => (
                <div key={s} style={{ width: 72 }}>
                  <IconButton
                    variant={v}
                    size={s}
                    icon={MagnifyingGlass}
                    aria-label="Search"
                  />
                </div>
              ))}
            </Row>
          ))}
        </Col>
      </Specimen>
      <Specimen title="ButtonGroup" node="2667:33122">
        <Col>
          <div style={{ width: 358 }}>
            <ButtonGroup>
              <Button size="sm">Order</Button>
              <Button size="sm" variant="soft">
                Save
              </Button>
              <Button size="sm" variant="outline">
                Edit
              </Button>
              <Button size="sm" variant="ghost">
                Cancel
              </Button>
            </ButtonGroup>
          </div>
          <div style={{ width: 358 }}>
            <ButtonGroup vertical>
              <Button size="sm">Order</Button>
              <Button size="sm" variant="soft">
                Save
              </Button>
            </ButtonGroup>
          </div>
        </Col>
      </Specimen>
    </section>
  );
}
