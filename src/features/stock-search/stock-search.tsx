"use client";

import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  HTMLAttributes,
  SyntheticEvent,
} from "react";
import useFetchSymbols, {
  SymbolData,
} from "@/lib/api/hooks/get/useFetchSymbols";
import parse from "autosuggest-highlight/parse";
import { BqInput, BqSpinner, BqIcon } from "@beeq/react/ssr";

// Custom debounce function
export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel?: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn(...args), delay);
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

type StockSearchProps = {
  onOptionSelect: (option: SymbolData) => void;
};

const StockSearch: React.FC<StockSearchProps> = ({ onOptionSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  const { data, isLoading, error } = useFetchSymbols(debouncedInputValue);
  const options: SymbolData[] = data ? data.result : [];

  const handleInputChange = useCallback(
    (_event: SyntheticEvent<Element, Event>, newInputValue: string) => {
      setInputValue(newInputValue);
    },
    []
  );
  const debouncedFetch = useMemo(() => {
    return debounce((value: string) => {
      if (value.length >= 2) {
        setDebouncedInputValue(value);
      } else {
        setDebouncedInputValue("");
      }
    }, 400);
  }, []);

  useEffect(() => {
    debouncedFetch(inputValue);
    return () => {
      debouncedFetch.cancel?.();
    };
  }, [inputValue, debouncedFetch]);

  const renderOption = useCallback(
    (optionProps: HTMLAttributes<HTMLLIElement>, option: SymbolData) => {
      const matches = Array.from(
        option.description.matchAll(new RegExp(inputValue, "gi"))
      );

      const parts = parse(
        option.description,
        matches.map((match) => [match.index, match.index + match[0].length])
      );

      return (
        <li
          {...optionProps}
          key={`${option.symbol}-${option.description}`}
          className="p-2 cursor-pointer hover:bg-gray-100"
        >
          <button
            className="flex flex-col"
            onClick={() => onOptionSelect(option)}
          >
            <div className="flex flex-wrap">
              {parts.map(
                (part: { text: string; highlight: boolean }, index: number) => (
                  <span
                    key={part.text + index}
                    className={part.highlight ? "font-bold" : "font-normal"}
                  >
                    {part.text}
                  </span>
                )
              )}
            </div>
            <span className="text-sm text-gray-500">{option.symbol}</span>
          </button>
        </li>
      );
    },
    [inputValue, onOptionSelect]
  );

  return (
    <div className="relative max-w-sm w-full">
      <div className="relative">
        <BqInput
          type="text"
          placeholder="Search for a company or symbol"
          value={inputValue}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, e.target.value)}
          className={`w-full ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <BqIcon name="error" className="mr-1" /> Error fetching data
          </p>
        )}
      </div>
      <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto">
        {options.map((option) =>
          renderOption({ className: "list-none" }, option)
        )}
      </ul>
      {isLoading && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-2">
          <BqSpinner size="small" />
        </div>
      )}
    </div>
  );
};

export default StockSearch;
