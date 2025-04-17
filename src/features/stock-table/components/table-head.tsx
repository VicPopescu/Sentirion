import { SymbolData } from "@/lib/api/hooks/get/useFetchSymbols";
import { Order } from "../utils/sort";
import { Indicator } from "@/lib/api/hooks/get/useFetchSymbolInsight";
import { MouseEvent, useEffect, useRef } from "react";
import { headCells } from "./head-cell";

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
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                onClick={createSortHandler(headCell.id)}
              >
                <span>{headCell.label}</span>
                {orderBy === headCell.id && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${
                      order === "desc" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                )}
              </button>
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
