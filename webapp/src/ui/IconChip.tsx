import { ThemeColor } from "../types/theme";
import Icon, { IconProps } from "./Icon.tsx";
import "./IconChip.css";

export interface IconChipProps extends IconProps {
  color: ThemeColor;
  size: number;
}

export default function IconChip({ color, size, ...rest }: IconChipProps) {
  return (
    <div
      className={`icon-chip bgcolor-${color} color-${color}-contrast`}
      style={{ width: size, height: size }}
    >
      <Icon size={size * 0.6} {...rest} />
    </div>
  );
}
