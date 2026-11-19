import { Toggle } from "../../state/useToggle.ts";
import Button from "./Button.tsx";
import ButtonGroup from "./ButtonGroup.tsx";
import DialogHeader from "./DialogHeader.tsx";
import React, { MouseEventHandler } from "react";

export interface DialogYesNoProps {
  /** See Dialog.labelledBy. */
  dialogId: string;
  header: string;
  body: string;
  /** The toggle that opens the Dialog. "No" turns it off, unless `onNo` is given. */
  toggle: Toggle;
  /** Put on the "no" button, so the safe choice has focus. Pass it to Dialog.initialFocusRef too. */
  focusRef?: React.Ref<HTMLButtonElement>;
  yesText: string;
  noText?: string;
  onYes: MouseEventHandler;
  onNo?: MouseEventHandler;
}

/**
 * Content for a confirm Dialog: title, text, and a yes and a no button.
 * Figma "_DialogContent/ClaimOrder". Use it as the child of a `<Dialog>`.
 */
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
    <>
      <DialogHeader id={dialogId}>{header}</DialogHeader>
      <p className="dialog-text">{body}</p>
      <ButtonGroup vertical>
        <Button variant="strong" onClick={onYes}>
          {yesText}
        </Button>
        <Button
          variant="soft"
          color="secondary"
          ref={focusRef}
          onClick={onNo || toggle.turnOff}
        >
          {noText || "Cancel"}
        </Button>
      </ButtonGroup>
    </>
  );
}
