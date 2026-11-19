import SectionHeader from "../components/SectionHeader.tsx";
import { DashboardProgram } from "../fixtures/dashboard.ts";
import "./ProgramList.css";
import ProgramRow from "./ProgramRow.tsx";

export interface ProgramListProps {
  programs: DashboardProgram[];
}

/**
 * Figma "ProgramList" (2034:17976): the "Ways to save" section.
 * With no programs it shows the Figma data=Empty variant.
 */
export default function ProgramList({ programs }: ProgramListProps) {
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
              image={p.image}
              buttonLabel={p.buttonLabel}
            />
          ))}
        </div>
      )}
    </section>
  );
}
