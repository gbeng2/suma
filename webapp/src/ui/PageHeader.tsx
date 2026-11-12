import { RoutePath } from "../routing/RoutePath.ts";
import Breadcrumb from "./Breadcrumb.tsx";
import "./PageHeader.css";
import React from "react";

export interface PageHeaderProps {
  /** The text of the title. */
  // title: React.ReactNode;
  /** The text under the title. */
  // subtitle?: React.ReactNode;
  /** Primary uses primary color text.
   * Secondary doesn't use special colors.
   * Default is primary is there is no back,
   * and secondary if there is.
   */
  variant?: any;
  /** Whether to show the back breadcrumb. */
  // back?: boolean | RoutePath;
}

/**
 * Header for the top of the page.
 */
export default function PageHeader({
  // title,
  // subtitle,
  variant = "default",
}: // back,
PageHeaderProps) {
  // if (variant === "default") {
  //   variant = back ? "secondary" : "primary";
  // }
  return (
    <>
      {/*{back && <Breadcrumb back={back} />}*/}
      {/*<h1 className={`page-header-${variant}`}>{title}</h1>*/}
      {/*{subtitle && <p className="page-header-subtitle">{subtitle}</p>}*/}
    </>
  );
}
