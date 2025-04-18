type RangeSelectProps = {
  isVisible: boolean;
  setRange: (range: string) => void;
  range: string;
};

const RangeSelect = ({ isVisible, range, setRange }: RangeSelectProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex justify-end mb-2">
      <div className="flex space-x-2">
        {["1D", "1W", "1M", "6M", "1Y", "3Y", "MAX"].map((rangeOption) => (
          <button
            key={rangeOption}
            onClick={() => setRange(rangeOption)}
            className={`px-4 py-2 border rounded ${
              range === rangeOption
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {rangeOption}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RangeSelect;
