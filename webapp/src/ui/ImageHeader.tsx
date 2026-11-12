import { RoutePath } from "../routing/RoutePath.ts";
import Breadcrumb from "./Breadcrumb.tsx";
import "./ImageHeader.css";

export interface ImageHeaderProps {
  backTo?: RoutePath;
  backLabel?: string;
  bottomFlow?: boolean;
  children: React.ReactNode;
}

export default function ImageHeader({
  backTo,
  backLabel,
  bottomFlow,
  children,
}: ImageHeaderProps) {
  return (
    <div className="image-header">
      <Breadcrumb to={backTo} noOffset className="image-header-breadcrumb">
        {backLabel}
      </Breadcrumb>
      {children}
      {bottomFlow && <div className="image-header-bottom-flow" />}
    </div>
  );
}
