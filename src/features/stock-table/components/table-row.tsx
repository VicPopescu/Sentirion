import Superscript from "@/components/superscript";
import { Indicator } from "@/lib/api/hooks/get/useFetchSymbolInsight";
import { SymbolData } from "@/lib/api/hooks/get/useFetchSymbols";
import { BqButton, BqIcon } from "@beeq/react/ssr";
import { MouseEvent } from "react";

type CustomTableRowProps = {
  isItemSelected: boolean;
  labelId: string;
  indicators: Indicator | null;
  isLoading: boolean;
  row: SymbolData;
  handleSelect: (symbol: string) => void;
  handleDelete: (
    event: React.MouseEvent<HTMLButtonElement>,
    symbol: string
  ) => void;
};

const CustomTableRow = ({
  isItemSelected,
  labelId,
  indicators,
  isLoading,
  row,
  handleSelect,
  handleDelete,
}: CustomTableRowProps) => {
  return (
    <tr
      className={`hover:bg-gray-100 ${
        isItemSelected ? "bg-blue-50" : "bg-white"
      } cursor-pointer`}
      onClick={() => handleSelect(row.symbol)}
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.symbol}
    >
      {/* Checkbox */}
      <td className="px-4 py-2">
        <input
          type="checkbox"
          className="form-checkbox text-blue-600"
          checked={isItemSelected}
          onChange={() => handleSelect(row.symbol)}
        />
      </td>

      {/* Description */}
      <td className="px-4 py-2 font-medium" id={labelId}>
        {row.description}
      </td>

      {/* Symbol */}
      <td className="px-4 py-2">{row.symbol}</td>

      {/* Type */}
      <td className="px-4 py-2">{row.type}</td>

      {/* Indicators */}
      <td className="px-4 py-2">
        {isLoading ? (
          <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <>
            {indicators?.bestEntry}
            {indicators?.bestEntry && <Superscript>[AI]</Superscript>}
          </>
        )}
      </td>

      <td className="px-4 py-2">
        {isLoading ? (
          <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <>
            {indicators?.risk3Y}
            {indicators?.risk3Y && <Superscript>[AI]</Superscript>}
          </>
        )}
      </td>

      <td className="px-4 py-2">
        {isLoading ? (
          <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <>
            {indicators?.estimated3Y}
            {indicators?.estimated3Y && <Superscript>[AI]</Superscript>}
          </>
        )}
      </td>

      <td className="px-4 py-2">
        {isLoading ? (
          <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <>
            {indicators?.yield}
            {indicators?.yield && <Superscript>[AI]</Superscript>}
          </>
        )}
      </td>

      <td className="px-4 py-2">
        {isLoading ? (
          <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <>
            {indicators?.sentiment}
            {indicators?.sentiment && <Superscript>[AI]</Superscript>}
          </>
        )}
      </td>

      {/* Delete Button */}
      <td className="px-4 py-2">
        <BqButton
          variant="ghost"
          size="small"
          border="xs"
          aria-label="Remove symbol"
          data-testid="remove-symbol"
          onClick={(event: MouseEvent<HTMLButtonElement>) =>
            handleDelete(event, row.symbol)
          }
        >
          <BqIcon name="trash" />
        </BqButton>
      </td>
    </tr>
  );
};

export default CustomTableRow;
