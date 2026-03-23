"use client";

import { useMemo, useState } from "react";

type SpecItem = {
  key: string;
  value: string;
};

type Props = {
  name: string;
  label: string;
  defaultSpecs?: SpecItem[];
};

export function SpecsField({ name, label, defaultSpecs = [] }: Props) {
  const [rows, setRows] = useState<SpecItem[]>(
    defaultSpecs.length > 0 ? defaultSpecs : [{ key: "", value: "" }],
  );

  function updateRow(index: number, field: keyof SpecItem, value: string) {
    setRows((current) =>
      current.map((row, rowIndex) => (rowIndex === index ? { ...row, [field]: value } : row)),
    );
  }

  function addRow() {
    setRows((current) => [...current, { key: "", value: "" }]);
  }

  function removeRow(index: number) {
    setRows((current) => {
      if (current.length === 1) {
        return [{ key: "", value: "" }];
      }

      return current.filter((_, rowIndex) => rowIndex !== index);
    });
  }

  const serialized = useMemo(() => JSON.stringify(rows), [rows]);

  return (
    <div className="space-y-2 sm:col-span-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-amber-950">{label}</label>
        <button
          type="button"
          onClick={addRow}
          className="rounded-md border border-amber-900/20 bg-white px-2 py-1 text-xs font-medium text-amber-900"
        >
          Add spec row
        </button>
      </div>

      <div className="space-y-2 rounded-xl border border-amber-900/15 bg-orange-50/60 p-3">
        {rows.map((row, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <input
              value={row.key}
              onChange={(event) => updateRow(index, "key", event.target.value)}
              placeholder="Spec key (e.g. Resolution)"
              className="rounded-lg border border-amber-900/20 bg-white px-3 py-2"
            />
            <input
              value={row.value}
              onChange={(event) => updateRow(index, "value", event.target.value)}
              placeholder="Spec value (e.g. 3440x1440)"
              className="rounded-lg border border-amber-900/20 bg-white px-3 py-2"
            />
            <button
              type="button"
              onClick={() => removeRow(index)}
              className="rounded-lg border border-red-900/20 bg-white px-3 py-2 text-xs font-medium text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <input type="hidden" name={name} value={serialized} />
    </div>
  );
}
