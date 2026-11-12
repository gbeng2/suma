import { RoutePath } from "../routing/RoutePath.ts";
import { ThemeColor } from "../types/theme";
import "./Alert.css";
import DivLink from "./DivLink.tsx";
import Icon, { IconPropsIcon } from "./Icon.tsx";
import Stack from "./Stack.tsx";
import clsx from "clsx";
import React from "react";

export interface AlertProps {
  color?: ThemeColor;
  text?: React.ReactNode;
  title?: React.ReactNode;
  to?: RoutePath;
  icon?: IconPropsIcon;
}

export default function Alert({
  title,
  text,
  color = "primary",
  to,
  icon = "info",
}: AlertProps) {
  const cls = clsx("alert", `bgcolor-${color}-soft`);
  const iconCls = clsx("alert-icon", `bgcolor-${color}`, `color-${color}-contrast`);
  const content = (
    <Stack row gap={3} center>
      {icon && (
        <Icon icon={icon} forceSize size="var(--alert-icon-size)" className={iconCls} />
      )}
      <Stack col>
        {title && <div className="alert-title">{title}</div>}
        {text && <div className="alert-text">{text}</div>}
      </Stack>
    </Stack>
  );
  if (to) {
    return (
      <DivLink to={to} className={cls}>
        <Stack row center className="justify-content-between" gap={3}>
          {content}
          <Icon icon="right" size="var(--alert-arrow-size)" forceSize color={color} />
        </Stack>
      </DivLink>
    );
  }
  return <div className={cls}>{content}</div>;
}
