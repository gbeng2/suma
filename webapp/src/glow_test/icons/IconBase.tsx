import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Width and height. Defaults to 1em so the icon follows the font size. */
  size?: number | string;
}

/**
 * Shared 24x24 frame for the Figma icons.
 * Icons use currentColor, so set `color` (or a color class) on the icon or its parent.
 */
export default function IconBase({ size = "1em", children, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}
