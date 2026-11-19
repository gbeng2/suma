import "./KeyValueList.css";
import React from "react";

interface KeyValueListItem {
  label: string;
  value: React.ReactNode;
}
interface KeyValueListProps {
  items: KeyValueListItem[];
}

/**
 * A list of Figma "List/KeyValue" rows: small bold label above its value.
 * For label and value side by side, use DefinitionTable.
 */
export default function KeyValueList({ items }: KeyValueListProps) {
  return (
    <dl className="key-value-list">
      {items.map(({ label, value }) => (
        <div key={label} className="key-value-list-row">
          <dt className="key-value-list-key">{label}</dt>
          <dd className="key-value-list-value">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
