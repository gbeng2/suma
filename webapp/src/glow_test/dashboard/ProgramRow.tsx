import { RoutePathOrUrl } from "../../routing/RoutePath.ts";
import Button from "../components/Button.tsx";
import "./ProgramRow.css";
import clsx from "clsx";

export interface ProgramRowProps {
  name: string;
  description: string;
  image: string;
  buttonLabel: string;
  to?: RoutePathOrUrl;
  /** Figma "type": Row (thumb beside text) or Tile (large thumb above text). */
  type?: "row" | "tile";
}

/** Figma "ProgramRow" (2022:55). One program in the dashboard's "Ways to save" list. */
export default function ProgramRow({
  name,
  description,
  image,
  buttonLabel,
  to,
  type = "row",
}: ProgramRowProps) {
  return (
    <div className={clsx("program-row", `program-row-${type}`)}>
      <img className="program-row-thumb" src={image} alt="" />
      <div className="program-row-body">
        <div className="program-row-text">
          <h3 className="program-row-name">{name}</h3>
          <p className="program-row-description">{description}</p>
        </div>
        <Button variant="soft" color="secondary" size="sm" to={to}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
