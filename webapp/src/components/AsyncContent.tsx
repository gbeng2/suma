import { AppError } from "../modules/feedback.ts";
import ErrorPage from "./ErrorPage.tsx";
import LoadingPage from "./LoadingPage.tsx";
import React from "react";

interface AsyncContentProps {
  loading: boolean;
  error: AppError | null | undefined;
  page?: boolean;
  children: () => React.ReactNode;
}

/**
 * Show a loader, error, or the children, depending on inputs.
 */
export default function AsyncContent({
  loading,
  error,
  page = false,
  children,
}: AsyncContentProps) {
  if (loading) {
    return <LoadingPage page={page} />;
  }
  if (error) {
    return <ErrorPage variant="back" page={page} />;
  }
  return children();
}
