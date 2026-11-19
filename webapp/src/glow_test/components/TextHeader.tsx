import { RoutePath } from "../../routing/RoutePath.ts";
import Breadcrumb from "./Breadcrumb.tsx";
import PageHeader from "./PageHeader.tsx";
import SectionHeader from "./SectionHeader.tsx";
import "./TextHeader.css";

export interface TextHeaderProps {
  backTo?: RoutePath;
  backLabel?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  variant?: "page" | "section";
}

/**
 * Kept from src/ui/TextHeader. Figma splits it in two components:
 * variant "page" is PageHeader, variant "section" is SectionHeader.
 * New code should use those. This only adds the optional back breadcrumb above.
 */
export default function TextHeader({
  backTo,
  backLabel,
  variant = "page",
  title,
  subtitle,
}: TextHeaderProps) {
  return (
    <div className="text-header">
      {backTo && <Breadcrumb to={backTo}>{backLabel}</Breadcrumb>}
      {variant === "page" ? (
        <PageHeader title={title} subtitle={subtitle} />
      ) : (
        <SectionHeader title={title} text={subtitle} />
      )}
    </div>
  );
}
