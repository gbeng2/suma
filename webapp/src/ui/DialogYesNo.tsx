import { Toggle } from "../state/useToggle.ts";
import Button from "./Button.tsx";
import ButtonGroup from "./ButtonGroup.tsx";
import Card from "./Card.tsx";
import CardBody from "./CardBody.tsx";
import DialogHeader from "./DialogHeader.tsx";
import Stack from "./Stack.tsx";
import { MouseEventHandler } from "react";

export interface DialogYesNoProps {
  /** See Dialog.labeledBy. */
  dialogId: string;
  header: string;
  body: string;
  toggle: Toggle;
  focusRef: React.Ref<HTMLButtonElement>;
  yesText: string;
  noText?: string;
  onYes: MouseEventHandler;
  onNo?: MouseEventHandler;
}

export default function DialogYesNo({
  dialogId,
  header,
  body,
  toggle,
  focusRef,
  yesText,
  noText,
  onYes,
  onNo,
}: DialogYesNoProps) {
  return (
    <Card className="bgcolor-secondary-soft">
      <CardBody padding={7}>
        <Stack direction="vertical" gap={6}>
          <DialogHeader id={dialogId}>{header}</DialogHeader>
          <p className="color-secondary-mute">{body}</p>
          <ButtonGroup vertical>
            <Button variant="primary" onClick={onYes}>
              {yesText}
            </Button>
            <Button
              variant="secondary"
              ref={focusRef}
              className="btn btn-secondary"
              onClick={onNo || toggle.turnOff}
            >
              {noText || "Cancel"}
            </Button>
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
}
