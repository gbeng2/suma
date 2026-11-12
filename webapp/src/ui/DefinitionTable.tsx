import "./DefinitionTable.css";
import clsx from "clsx";
import React from "react";

interface DefinitionTableItem {
  label: string;
  value: React.ReactNode;
}
interface DefinitionTableProps {
  items: DefinitionTableItem[];
  inCard?: boolean;
}

export default function DefinitionTable({ items, inCard }: DefinitionTableProps) {
  return (
    <dl className={clsx("definition-table", inCard && "definition-table-in-card")}>
      {items.map(({ label, value }) => (
        <div key={label + value}>
          <dt className="definition-table-key">{label}</dt>
          <dd className="definition-table-value">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
