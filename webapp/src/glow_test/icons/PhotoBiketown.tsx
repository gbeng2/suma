import src from "../assets/photo-biketown.png";
import React from "react";

export interface PhotoBiketownProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number | string;
}

/** Figma "Icon/Photo/Biketown": a raster photo icon, so it is not recolorable. */
export default function PhotoBiketown({ size = 24, style, ...rest }: PhotoBiketownProps) {
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
