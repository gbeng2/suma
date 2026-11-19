import "./DefinitionTable.css";
import clsx from "clsx";
import React from "react";

interface DefinitionTableItem {
  label: string;
  value: React.ReactNode;
}
interface DefinitionTableProps {
  items: DefinitionTableItem[];
  /** Adds side padding, for a table that fills a Card with no CardBody. Not in Figma. */
  inCard?: boolean;
}

/**
 * A list of Figma "DefinitionTableRow"s: label on the left, value on the right.
 * For label above value, use KeyValueList.
 */
export default function DefinitionTable({ items, inCard }: DefinitionTableProps) {
  return (
    <dl className={clsx("definition-table", inCard && "definition-table-in-card")}>
      {items.map(({ label, value }) => (
        <div key={label} className="definition-table-row">
          <dt className="definition-table-key">{label}</dt>
          <dd className="definition-table-value">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
