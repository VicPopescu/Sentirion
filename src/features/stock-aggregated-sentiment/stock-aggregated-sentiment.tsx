import Superscript from "@/components/superscript";
import { useFetchAggregatedSentiment } from "@/lib/api/hooks/get/useFetchAggregatedSentiment";

type StockAggregatedSentimentProps = {
  selectedSymbols: string[];
};

const StockAggregatedSentiment = ({
  selectedSymbols,
}: StockAggregatedSentimentProps) => {
  const { data, loading, error } = useFetchAggregatedSentiment(selectedSymbols);

  if (!selectedSymbols.length) {
    return null;
  }

  if (loading) {
    return (
      <div className="w-full">
        <div className="h-1 bg-blue-500 animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-gray-300 p-4 min-h-full">
        <p className="text-red-600 font-medium">Error: {error}</p>
      </div>
    );
  }

  const highlightSymbols = (text: string) => {
    const symbolRegex = new RegExp(
      `\\b(${selectedSymbols.join("|")})\\b`,
      "gi"
    );
    return text.split(symbolRegex).map((part, index) =>
      selectedSymbols.includes(part.toUpperCase()) ? (
        <span key={index} className="font-bold text-green-600">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="border border-gray-300 p-4 min-h-full">
      <h2 className="text-lg font-semibold mb-2">
        Portfolio Evaluation
        <Superscript>[AI]</Superscript>
      </h2>
      {data && (
        <p className="text-gray-700">{highlightSymbols(data.evaluation)}</p>
      )}
    </div>
  );
};

export default StockAggregatedSentiment;
