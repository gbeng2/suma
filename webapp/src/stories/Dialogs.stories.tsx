import useToggle from "../state/useToggle";
import Button from "../ui/Button";
import { Dialog } from "../ui/Dialog";
import DialogYesNo from "../ui/DialogYesNo.tsx";
import type { Meta, StoryObj } from "@storybook/preact-vite";
import React from "react";

function DialogDemo() {
  const dialogToggle = useToggle(true);
  const dialogFocusRef = React.useRef(null);
  return (
    <>
      <Dialog
        open={dialogToggle.isOn}
        onClose={dialogToggle.turnOff}
        labelledBy="delete-confirm"
        initialFocusRef={dialogFocusRef}
      >
        <DialogYesNo
          dialogId="delete-confirm"
          header="Are you sure you want to delete this item?"
          body="Only do this at the counter, once staff hand you your items. You can&rsquo;t undo it."
          toggle={dialogToggle}
          focusRef={dialogFocusRef}
          yesText="Delete"
          onYes={dialogToggle.turnOff}
        />
      </Dialog>
      <Button onClick={dialogToggle.turnOn}>Open Dialog</Button>
    </>
  );
}

const meta = {
  title: "Styleguide/Dialogs",
  component: DialogDemo,
} satisfies Meta<typeof DialogDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
