import Superscript from "@/components/superscript";
import { Indicator } from "@/lib/api/hooks/get/useFetchSymbolInsight";
import { SymbolData } from "@/lib/api/hooks/get/useFetchSymbols";

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
      role="checkbox"
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
        <button
          className="text-red-600 hover:text-red-800"
          aria-label="Remove symbol"
          data-testid="remove-symbol"
          onClick={(event) => handleDelete(event, row.symbol)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default CustomTableRow;
