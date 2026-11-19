import src from "../assets/photo-lemon.png";
import React from "react";

export interface PhotoLemonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number | string;
}

/** Figma "Icon/Photo/Lemon": a raster photo icon, so it is not recolorable. */
export default function PhotoLemon({ size = 24, style, ...rest }: PhotoLemonProps) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      style={{ borderRadius: "var(--border-radius-1)", objectFit: "cover", ...style }}
      {...rest}
    />
  );
}
