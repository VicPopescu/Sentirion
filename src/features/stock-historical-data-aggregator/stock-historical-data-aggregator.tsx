import useFetchHistoricalData from "@/lib/api/hooks/get/useFetchHistoricalData";
import { format, subDays, subWeeks, subMonths, subYears } from "date-fns";
import { useState } from "react";
import { DATE_FORMAT } from "@/lib/constants/global";
import LoadingOverlay from "./components/loading-overlay";
import RangeSelect from "./components/range-select";
import DataChart from "@/components/data-chart";

type StockHistoricalDataProps = {
  selectedSymbols: string[];
};

const StockHistoricalDataAggregator = ({
  selectedSymbols,
}: StockHistoricalDataProps) => {
  const [range, setRange] = useState("1Y");

  const calculateFromDate = (range: string) => {
    const toDate = new Date();
    switch (range) {
      case "1D":
        return format(subDays(toDate, 1), "yyyy-MM-dd");
      case "1W":
        return format(subWeeks(toDate, 1), "yyyy-MM-dd");
      case "1M":
        return format(subMonths(toDate, 1), "yyyy-MM-dd");
      case "6M":
        return format(subMonths(toDate, 6), "yyyy-MM-dd");
      case "1Y":
        return format(subYears(toDate, 1), "yyyy-MM-dd");
      case "3Y":
        return format(subYears(toDate, 3), "yyyy-MM-dd");
      case "MAX":
        return "2019-01-01";
      default:
        return format(subYears(toDate, 1), "yyyy-MM-dd");
    }
  };

  const from = calculateFromDate(range);
  const to = format(new Date(), "yyyy-MM-dd");
  const { data, isLoading, error } = useFetchHistoricalData(
    selectedSymbols,
    from,
    to
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-[350px] border border-red-500">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const chartData = data
    ? Object.keys(data).reduce((acc, symbol) => {
        data[symbol].forEach((entry) => {
          const date = format(new Date(entry.date), DATE_FORMAT);
          if (!acc[date]) {
            acc[date] = { date };
          }
          acc[date][symbol] = entry.close;
        });
        return acc;
      }, {} as { [key: string]: { date: string; [symbol: string]: number | string } })
    : {};

  const formattedChartData = Object.values(chartData);

  if (!selectedSymbols.length) {
    return null;
  }

  return (
    <div className="w-full h-[400px] border border-gray-300 pt-2 pr-2 flex flex-col relative">
      <LoadingOverlay isLoading={isLoading} />
      <RangeSelect
        isVisible={!isLoading && selectedSymbols.length > 0}
        range={range}
        setRange={setRange}
      />
      <div className="h-[350px]">
        <DataChart
          formattedChartData={formattedChartData}
          selectedSymbols={selectedSymbols}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default StockHistoricalDataAggregator;
