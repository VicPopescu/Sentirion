import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { DATE_FORMAT } from "@/lib/constants/global";
import NoDataLabel from "@/components/data-chart/components/no-data-label";
import getRandomColor from "@/lib/utils/get-random-color";

type DataChartProps = {
  formattedChartData: { date: string; [key: string]: number | string }[];
  selectedSymbols: string[];
  isLoading: boolean;
};

const DataChart = ({ formattedChartData, selectedSymbols, isLoading }: DataChartProps) => {
  const chartLineColors = useMemo(() => {
    const colorMap: { [key: string]: string } = {};
    selectedSymbols.forEach((symbol) => {
      colorMap[symbol] = getRandomColor();
    });
    return colorMap;
  }, [selectedSymbols]);

  const chartAreas = useMemo(() => {
    return selectedSymbols.map((symbol) => (
      <Area
        key={symbol}
        type="monotone"
        dataKey={symbol}
        name={symbol}
        stroke={chartLineColors[symbol]}
        fillOpacity={1}
        fill={`url(#color${symbol})`}
        dot={false}
      />
    ));
  }, [selectedSymbols, chartLineColors]);

  const chartGradients = useMemo(() => {
    return selectedSymbols.map((symbol) => (
      <linearGradient
        id={`color${symbol}`}
        key={symbol}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop
          offset="0%"
          stopColor={chartLineColors[symbol]}
          stopOpacity={0.2}
        />
        <stop
          offset="100%"
          stopColor={chartLineColors[symbol]}
          stopOpacity={0}
        />
      </linearGradient>
    ));
  }, [selectedSymbols, chartLineColors]);

  if ((!isLoading && !formattedChartData) || formattedChartData.length === 0) {
    return <NoDataLabel />;
  }

  return (
    <ResponsiveContainer>
      <AreaChart data={formattedChartData}>
        <defs>{chartGradients}</defs>
        <XAxis dataKey="date" hide />
        <YAxis orientation="right" width={40} strokeWidth={0.5} />
        <Tooltip
          labelFormatter={(label) => format(new Date(label), DATE_FORMAT)}
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#e5e7eb", // Tailwind's gray-300
          }}
          itemStyle={{ color: "#374151" }} // Tailwind's gray-700
          formatter={(value, name) => (
            <span className="flex items-center">
              <span
                className="inline-block w-2 h-2 mr-2"
                style={{ backgroundColor: chartLineColors[name as string] }}
              ></span>
              {value}
            </span>
          )}
        />
        <Legend />
        {chartAreas}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DataChart;
