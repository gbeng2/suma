import "./Dialog.css";
import clsx from "clsx";
import React from "react";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** id of the element within `children` that labels the dialog (e.g. a DialogHeader's id) */
  labelledBy: string;
  /**
   * Ref to the element that should receive focus when the dialog opens —
   * typically a ref you're already holding on your accept/confirm button.
   * If omitted, the browser falls back to its own default (first focusable element).
   */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** Any content, like a DialogHeader, text and buttons. See DialogYesNo. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Figma "Dialog": a card that sits at the bottom of the screen, over a scrim.
 * The dialog draws the card surface itself (Figma "Container"), so do not wrap
 * the children in a Card.
 *
 * It closes on Escape or on a click outside of the card. There is no close button
 * in Figma, so the content must have a button that closes it.
 */
export function Dialog({
  open,
  onClose,
  labelledBy,
  initialFocusRef,
  children,
  className,
}: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      initialFocusRef?.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, initialFocusRef]);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={clsx("dialog", className)}
      aria-labelledby={labelledBy}
      onClick={onClose}
    >
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
}
