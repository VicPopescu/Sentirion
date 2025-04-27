"use client";

import { SymbolData } from "@/lib/api/hooks/get/useFetchSymbols";
import { Order } from "../utils/sort";
import { Indicator } from "@/lib/api/hooks/get/useFetchSymbolInsight";
import { MouseEvent, useEffect, useRef } from "react";
import { headCells } from "./head-cell";
import { BqButton, BqIcon } from "@beeq/react/ssr";

type EnhancedTableProps = {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof SymbolData
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate =
        numSelected > 0 && numSelected < rowCount;
    }
  }, [numSelected, rowCount]);

  const createSortHandler =
    (property: keyof SymbolData | keyof Indicator) =>
    (event: MouseEvent<unknown>) => {
      if (property === "description" || property === "symbol") {
        onRequestSort(event, property);
      }
    };

  return (
    <thead className="bg-gray-100">
      <tr>
        {/* Checkbox for selecting all rows */}
        <th className="px-4 py-2">
          <input
            type="checkbox"
            className="form-checkbox text-blue-600"
            ref={selectAllCheckboxRef}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </th>
        {/* Render table headers */}
        {headCells.map((headCell) => (
          <th
            key={headCell.id}
            className={`px-4 py-2 text-left ${
              headCell.numeric ? "text-right" : "text-left"
            }`}
          >
            {headCell.sortable ? (
              <BqButton
                appearance="text"
                onClick={createSortHandler(headCell.id)}
              >
                <span>{headCell.label}</span>
                {orderBy === headCell.id && (
                  <BqIcon
                    slot="suffix"
                    name="caret-up-bold"
                    size={14}
                    className={`${order === "desc" ? "rotate-180" : ""}`}
                  />
                )}
              </BqButton>
            ) : (
              headCell.label
            )}
          </th>
        ))}
        {/* Empty column for actions */}
        <th className="px-4 py-2"></th>
      </tr>
    </thead>
  );
};

export default EnhancedTableHead;
