"use client";

import { BqButton, BqIcon } from "@beeq/react/ssr";

type EnhancedTableToolbarProps = {
  numSelected: number;
  onDeleteAll: () => void;
};

const EnhancedTableToolbar = ({
  numSelected,
  onDeleteAll,
}: EnhancedTableToolbarProps) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 ${
        numSelected > 0 ? "bg-blue-100" : "bg-white"
      }`}
    >
      {numSelected > 0 && (
        <p className="text-blue-700 font-medium">{numSelected} selected</p>
      )}
      {numSelected > 0 && (
        <BqButton
          size="small"
          border="xs"
          aria-label="Uncheck all symbols"
          data-testid="uncheck-all-symbols"
          onClick={onDeleteAll}
        >
          <BqIcon name="trash" slot="prefix" />
          Clear all
        </BqButton>
      )}
    </div>
  );
};

export default EnhancedTableToolbar;
