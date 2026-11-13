import React from "react";

export default function DrawerContents({ children }: { children?: React.ReactNode }) {
  return <div className="d-flex flex-column gap-5">{children}</div>;
}
