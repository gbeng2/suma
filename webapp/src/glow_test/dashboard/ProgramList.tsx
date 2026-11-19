import { RoutePathOrUrl, untypedRoutePath } from "../../routing/RoutePath.ts";
import SectionHeader from "../components/SectionHeader.tsx";
import "./ProgramList.css";
import ProgramRow from "./ProgramRow.tsx";
import { DashboardProgramView } from "./toDashboardProps.ts";

export interface ProgramListProps {
  programs: DashboardProgramView[];
  /**
   * Changes where a program button goes. The prototype uses it to stay on the
   * prototype page, because the real routes do not exist there.
   */
  resolveLink?: (to: string) => RoutePathOrUrl;
}

/**
 * Figma "ProgramList" (2034:17976): the "Ways to save" section.
 * With no programs it shows the Figma data=Empty variant.
 */
export default function ProgramList({
  programs,
  resolveLink = untypedRoutePath,
}: ProgramListProps) {
  return (
    <section className="program-list">
      <SectionHeader
        title="Ways to save"
        text="Programs pay part of the price for you. Pick one to see what’s in it."
      />
      {programs.length === 0 ? (
        <p className="program-list-empty">No programs available yet!</p>
      ) : (
        <div className="program-list-rows">
          {programs.map((p) => (
            <ProgramRow
              key={p.id}
              name={p.name}
              description={p.description}
              imageUrl={p.imageUrl}
              imageAlt={p.imageAlt}
              buttonLabel={p.buttonLabel}
              to={p.to ? resolveLink(p.to) : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
