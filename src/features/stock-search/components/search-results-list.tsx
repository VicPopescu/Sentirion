import { SymbolData } from "@/lib/api/hooks/get/useFetchSymbols";
import { BqOption } from "@beeq/react/ssr";
import parse from "autosuggest-highlight/parse";

type SearchResultsListProps = {
  options: SymbolData[];
  inputValue: string;
  onOptionSelect: (option: SymbolData) => void;
};

const SearchResultsList = ({
  options,
  inputValue,
  onOptionSelect,
}: SearchResultsListProps) => {
  return options.map((option, index) => {
    const matches = Array.from(
      option.description.matchAll(new RegExp(inputValue, "gi"))
    );

    const parts = parse(
      option.description,
      matches.map((match) => [match.index, match.index + match[0].length])
    );

    return (
      <BqOption
        key={`${option.symbol}-${option.description}`}
        className="p-2 cursor-pointer hover:bg-gray-100"
        value={index}
        onClick={() => onOptionSelect(option)}
      >
        <p className="text-sm text-gray-500 font-bold">{option.symbol}</p>
        {parts.map(
          (part: { text: string; highlight: boolean }, index: number) => (
            <span
              key={part.text + index}
              className={`${
                part.highlight ? "font-bold" : "font-normal"
              } text-xs`}
            >
              {part.text}
            </span>
          )
        )}
      </BqOption>
    );
  });
};

export default SearchResultsList;
