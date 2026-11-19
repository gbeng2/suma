import CheckableCard from "../components/CheckableCard.tsx";
import Checkbox from "../components/Checkbox.tsx";
import CheckboxRow from "../components/CheckboxRow.tsx";
import LanguageSwitcher from "../components/LanguageSwitcher.tsx";
import OptionListRow, { OptionList } from "../components/OptionListRow.tsx";
import OptionRow, { OptionRowAdd } from "../components/OptionRow.tsx";
import { PhoneInputField } from "../components/PhoneInput.tsx";
import Radio from "../components/Radio.tsx";
import RadioCard from "../components/RadioCard.tsx";
import Select from "../components/Select.tsx";
import Switch from "../components/Switch.tsx";
import SwitchRow from "../components/SwitchRow.tsx";
import TextInput from "../components/TextInput.tsx";
import Specimen, { Col, Row } from "./Specimen.tsx";
import React from "react";

/** The Figma frames in this section are 343px wide (a phone screen with gutters). */
const FRAME_WIDTH = 343;

/** The specimens that only show a state do not change, so they get this handler. */
function noop() {}

/**
 * Figma "state" for Checkbox, Radio and Switch.
 * Focus is forced with the "is-focus-visible" class. The others are real props.
 */
const controlStates = [
  { name: "Default", props: {} },
  { name: "Focus", props: { inputClass: "is-focus-visible" } },
  { name: "Error", props: { error: true } },
  { name: "Disabled", props: { disabled: true } },
];

/**
 * Figma "state" for TextInput, PhoneInput and Select.
 * Hover and Focus are forced with a class. Error and Disabled are real props.
 */
const fieldStates = [
  { name: "Default", props: {} },
  { name: "Hover", props: { inputClass: "is-hover" } },
  { name: "Focus", props: { inputClass: "is-focus-visible" } },
  { name: "Error", props: { error: "Choose your state." } },
  { name: "Disabled", props: { disabled: true } },
];

const usStates = [
  { value: "OR", label: "Oregon" },
  { value: "WA", label: "Washington" },
];

const locales: Locale[] = [
  { code: "en", language: "English", native: "English" },
  { code: "es", language: "Spanish", native: "Español" },
];

const pickupOptions = [
  {
    value: "market",
    label: "Pickup at Market (Dec 21–22)",
    text: "409 SE Martin Luther King Jr Blvd",
  },
  {
    value: "community",
    label: "Pickup at Community Location",
    text: "We'll text you the address.",
  },
];

const fulfillmentOptions = [
  { value: "pickup", label: "Pick up", text: "Dec 21–22" },
  { value: "delivery", label: "Delivery", text: "Dec 23" },
];

const contrastOptions = [
  {
    value: "device",
    title: "Match your device",
    hint: "Follows your phone's contrast setting",
  },
  { value: "default", title: "Default", hint: "Standard text and border strength" },
  { value: "high", title: "High contrast", hint: "Stronger text, borders, and dividers" },
];

/** Figma section "Inputs" (2472:17796). */
export default function InputsSection() {
  // State for the specimens that can be used (not only looked at).
  const [wic, setWic] = React.useState(true);
  const [texts, setTexts] = React.useState(true);
  const [pickup, setPickup] = React.useState("market");
  const [fulfillment, setFulfillment] = React.useState("pickup");
  const [language, setLanguage] = React.useState("en");
  const [contrast, setContrast] = React.useState("default");

  return (
    <section className="gallery-section" id="inputs">
      <h2>Inputs</h2>

      <Specimen title="Checkbox" node="2420:576">
        <Col>
          {controlStates.map(({ name, props }) => (
            <Row key={name}>
              <Checkbox checked={false} aria-label={name} onChange={noop} {...props} />
              <Checkbox checked aria-label={name} onChange={noop} {...props} />
            </Row>
          ))}
        </Col>
      </Specimen>

      <Specimen title="Radio" node="2420:593">
        <Col>
          {controlStates.map(({ name, props }) => (
            <Row key={name}>
              <Radio checked={false} aria-label={name} onChange={noop} {...props} />
              <Radio checked aria-label={name} onChange={noop} {...props} />
            </Row>
          ))}
        </Col>
      </Specimen>

      <Specimen title="Switch" node="2420:610">
        <Col>
          {controlStates.map(({ name, props }) => (
            <Row key={name}>
              <Switch checked={false} aria-label={name} onChange={noop} {...props} />
              <Switch checked aria-label={name} onChange={noop} {...props} />
            </Row>
          ))}
        </Col>
      </Specimen>

      <Specimen title="TextInput" node="2420:683">
        <Col>
          {fieldStates.map(({ name, props }) => (
            <Row key={name}>
              <div style={{ width: FRAME_WIDTH }}>
                <TextInput
                  label="City"
                  placeholder="e.g. Portland"
                  value=""
                  onChange={noop}
                  {...props}
                />
              </div>
              <div style={{ width: FRAME_WIDTH }}>
                <TextInput label="City" value="Portland" onChange={noop} {...props} />
              </div>
            </Row>
          ))}
          <div style={{ width: FRAME_WIDTH }}>
            <TextInput
              label="Apartment"
              optional
              placeholder="e.g. Apt 4"
              help="The optional mark and the help text."
            />
          </div>
        </Col>
      </Specimen>

      <Specimen title="PhoneInput" node="2420:756">
        <Col>
          {fieldStates.map(({ name, props }) => (
            <Row key={name}>
              <div style={{ width: FRAME_WIDTH }}>
                <PhoneInputField
                  label="Phone number"
                  placeholder="(503) 555-0142"
                  value=""
                  onChange={noop}
                  {...props}
                />
              </div>
              <div style={{ width: FRAME_WIDTH }}>
                <PhoneInputField
                  label="Phone number"
                  value="(503) 555-0142"
                  onChange={noop}
                  {...props}
                />
              </div>
            </Row>
          ))}
        </Col>
      </Specimen>

      <Specimen title="Select" node="2420:839">
        <Col>
          {fieldStates.map(({ name, props }) => (
            <Row key={name}>
              <div style={{ width: FRAME_WIDTH }}>
                <Select
                  label="State"
                  placeholder="Choose state"
                  options={usStates}
                  value=""
                  onChange={noop}
                  {...props}
                />
              </div>
              <div style={{ width: FRAME_WIDTH }}>
                <Select
                  label="State"
                  options={usStates}
                  value="OR"
                  onChange={noop}
                  {...props}
                />
              </div>
            </Row>
          ))}
        </Col>
      </Specimen>

      <Specimen title="CheckboxRow" node="2421:573">
        <div style={{ width: FRAME_WIDTH }}>
          <CheckboxRow
            label="WIC"
            meta="Women, Infants and Children"
            checked={wic}
            onChange={() => setWic(!wic)}
          />
        </div>
      </Specimen>

      <Specimen title="SwitchRow" node="2421:580">
        <div style={{ width: FRAME_WIDTH }}>
          <SwitchRow
            title="Pickup at Market (Dec 21–22)"
            text="Texts when your order is ready."
            checked={texts}
            onChange={() => setTexts(!texts)}
          />
        </div>
      </Specimen>

      <Specimen title="CheckableCard" node="2421:634">
        <Col>
          <Row>
            {[
              { name: "Default", props: {} },
              { name: "Hover", props: { className: "is-hover" } },
              { name: "Selected", props: { checked: true } },
            ].map(({ name, props }) => (
              <div key={name} style={{ width: 164 }}>
                <CheckableCard
                  checked={false}
                  initials="AH"
                  title="Affordable Housing"
                  text="Housing partner"
                  onChange={noop}
                  {...props}
                />
              </div>
            ))}
          </Row>
          <Row>
            {[
              { name: "Focus", props: { className: "is-focus-visible" } },
              { name: "Error", props: { error: true } },
              { name: "Disabled", props: { checked: true, disabled: true } },
            ].map(({ name, props }) => (
              <div key={name} style={{ width: 164 }}>
                <CheckableCard
                  checked={false}
                  initials="AH"
                  title="Affordable Housing"
                  text="Housing partner"
                  onChange={noop}
                  {...props}
                />
              </div>
            ))}
          </Row>
        </Col>
      </Specimen>

      <Specimen title="OptionRow" node="2421:661">
        <Col>
          <Row>
            <div style={{ width: FRAME_WIDTH }}>
              <OptionRow
                title="Pickup at Market (Dec 21–22)"
                text="409 SE Martin Luther King Jr Blvd"
                checked={false}
                onChange={noop}
              />
            </div>
            <div style={{ width: FRAME_WIDTH }}>
              <OptionRow
                title="Pickup at Market (Dec 21–22)"
                text="409 SE Martin Luther King Jr Blvd"
                checked
                onChange={noop}
              />
            </div>
          </Row>
          <Row>
            <div style={{ width: FRAME_WIDTH }}>
              <OptionRow
                title="Pickup at Market (Dec 21–22)"
                text="Expired 09/26"
                checked={false}
                disabled
                onChange={noop}
              />
            </div>
            <div style={{ width: FRAME_WIDTH }}>
              <OptionRowAdd>Add a card</OptionRowAdd>
            </div>
          </Row>
        </Col>
      </Specimen>

      <Specimen title="RadioCard" node="2421:726">
        <Col>
          <Row>
            <div style={{ width: FRAME_WIDTH }}>
              <RadioCard
                name="pickup"
                options={pickupOptions}
                value={pickup}
                onValueChange={setPickup}
              />
            </div>
            <div style={{ width: FRAME_WIDTH }}>
              <RadioCard
                name="pickup-error"
                options={pickupOptions}
                value={null}
                error
                onValueChange={noop}
              />
            </div>
          </Row>
          <Row>
            <div style={{ width: FRAME_WIDTH }}>
              <RadioCard
                name="fulfillment"
                direction="horizontal"
                options={fulfillmentOptions}
                value={fulfillment}
                onValueChange={setFulfillment}
              />
            </div>
            <div style={{ width: FRAME_WIDTH }}>
              <RadioCard
                name="fulfillment-error"
                direction="horizontal"
                options={fulfillmentOptions}
                value={null}
                error
                onValueChange={noop}
              />
            </div>
          </Row>
        </Col>
      </Specimen>

      <Specimen title="LanguageSwitcher" node="2436:936">
        <div style={{ width: FRAME_WIDTH }}>
          <LanguageSwitcher
            supportedLocales={locales}
            currentLanguage={language}
            changeLanguage={setLanguage}
          />
        </div>
      </Specimen>

      <Specimen title="OptionListRow" node="2436:956">
        <Row>
          <div style={{ width: FRAME_WIDTH }}>
            <OptionListRow
              name="option-list-row-off"
              title="High contrast"
              hint="Stronger text, borders, and dividers"
              selected={false}
              onSelect={noop}
            />
          </div>
          <div style={{ width: FRAME_WIDTH }}>
            <OptionListRow
              name="option-list-row-on"
              title="High contrast"
              hint="Stronger text, borders, and dividers"
              selected
              onSelect={noop}
            />
          </div>
        </Row>
      </Specimen>

      {/* Figma "Examples" > "Controls and settings" */}
      <Specimen title="Inputs examples" node="2692:24096">
        <Col>
          {/* Figma "More card": a card with a 16px gutter around the LanguageSwitcher. */}
          <div className="option-list" style={{ padding: "0 16px" }}>
            <div style={{ width: FRAME_WIDTH }}>
              <LanguageSwitcher
                supportedLocales={locales}
                currentLanguage={language}
                changeLanguage={setLanguage}
              />
            </div>
          </div>
          <div style={{ width: FRAME_WIDTH + 2 }}>
            <OptionList legend="Contrast">
              {contrastOptions.map(({ value, title, hint }) => (
                <OptionListRow
                  key={value}
                  name="example-contrast"
                  value={value}
                  title={title}
                  hint={hint}
                  selected={contrast === value}
                  divider={false}
                  onSelect={() => setContrast(value)}
                />
              ))}
            </OptionList>
          </div>
        </Col>
      </Specimen>
    </section>
  );
}
