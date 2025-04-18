"use client";

import { useState, useEffect } from "react";
import { SymbolData } from "@/lib/api/hooks/get/useFetchSymbols";
import StockSearch from "@/features/stock-search";
import StockTable from "@/features/stock-table";
import StockHistoricalDataAggregator from "@/features/stock-historical-data-aggregator";
import StockAggregatedSentiment from "@/features/stock-aggregated-sentiment";
import { BqIcon } from "@beeq/react/ssr";

const informMesssage =
  "Please select at least one stock in the table to begin the evaluation.";

const PortfolioBuilder = () => {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [addedStocks, setAddedStocks] = useState<SymbolData[]>([]);

  const handleOptionSelect = (option: SymbolData) => {
    setAddedStocks((prevOptions) => {
      if (prevOptions.some((stock) => stock.symbol === option.symbol)) {
        return prevOptions;
      }
      return [...prevOptions, option];
    });
  };

  const handleDelete = (symbol: string) => {
    setAddedStocks((prevStocks) =>
      prevStocks.filter((stock) => stock.symbol !== symbol)
    );
  };

  const handleDeleteAll = () => {
    setAddedStocks([]);
  };

  useEffect(() => {
    const storedStocks = localStorage.getItem("addedStocks");
    if (storedStocks) {
      setAddedStocks(JSON.parse(storedStocks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("addedStocks", JSON.stringify(addedStocks));
  }, [addedStocks]);

  return (
    <>
      <StockSearch onOptionSelect={handleOptionSelect} />
      <StockTable
        data={addedStocks}
        setSelectedSymbols={setSelectedSymbols}
        onDelete={handleDelete}
        onDeleteAll={handleDeleteAll}
      />
      {addedStocks?.length > 0 && !selectedSymbols?.length && (
        <div className="flex items-center mt-2">
          <BqIcon className="flex" slot="suffix" name="info" />
          <p className="text-success-main text-base">{informMesssage}</p>
        </div>
      )}
      <div className="flex flex-col md:flex-row w-full h-full gap-2">
        <div className="flex-1">
          <StockHistoricalDataAggregator selectedSymbols={selectedSymbols} />
        </div>
        <div className="flex-1">
          <StockAggregatedSentiment selectedSymbols={selectedSymbols} />
        </div>
      </div>
    </>
  );
};

export default PortfolioBuilder;
