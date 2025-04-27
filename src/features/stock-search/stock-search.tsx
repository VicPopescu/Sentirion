"use client";

import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  SyntheticEvent,
} from "react";
import useFetchSymbols, {
  SymbolData,
} from "@/lib/api/hooks/get/useFetchSymbols";

import { BqSpinner, BqIcon, BqSelect } from "@beeq/react/ssr";
import SearchResultsList from "./components/search-results-list";

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
  const minInputLength = 3;
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
      if (value?.length >= minInputLength) {
        setDebouncedInputValue(value);
      } else {
        setDebouncedInputValue("");
      }
    }, 400);
  }, []);

  useEffect(() => {
    if (inputValue?.length >= minInputLength) {
      debouncedFetch(inputValue);
    } else {
      debouncedFetch.cancel?.();
    }

    return () => {
      debouncedFetch.cancel?.();
    };
  }, [inputValue, debouncedFetch]);

  return (
    <div className="relative max-w-sm w-full">
      <div className="relative">
        <BqSelect
          placeholder="Search for a company or symbol"
          debounceTime={100}
          keepOpenOnSelect={true}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handleInputChange(e, (e.target as any).inputElem.value);
          }}
        >
          <BqIcon name="magnifying-glass" slot="prefix"></BqIcon>
          <SearchResultsList
            options={options}
            inputValue={inputValue}
            onOptionSelect={onOptionSelect}
          />
          {isLoading && (
            <BqSpinner
              animation
              size="small"
              slot="suffix"
              claassName="h-[5px]"
            ></BqSpinner>
          )}
          {inputValue?.length > minInputLength &&
            options.length === 0 &&
            !isLoading && (
              <div className="p-2 text-gray-500">No results found.</div>
            )}
        </BqSelect>

        {error && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <BqIcon name="error" className="mr-1" /> Error fetching data
          </p>
        )}
      </div>
    </div>
  );
};

export default StockSearch;
