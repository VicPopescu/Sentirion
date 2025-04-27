type EnhancedTableToolbarProps = {
  numSelected: number;
  onDeleteAll: () => void;
};

const EnhancedTableToolbar = ({
  numSelected,
  onDeleteAll,
}: EnhancedTableToolbarProps) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 ${
        numSelected > 0 ? "bg-blue-100" : "bg-white"
      }`}
    >
      {numSelected > 0 ? (
        <p className="text-blue-700 font-medium">{numSelected} selected</p>
      ) : (
        <p className="font-semibold text-gray-800 text-xl">Portfolio</p>
      )}
      {numSelected > 0 && (
        <button
          className="flex items-center text-red-600 hover:text-red-800"
          aria-label="Uncheck all symbols"
          data-testid="uncheck-all-symbols"
          onClick={onDeleteAll}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
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
          Remove all
        </button>
      )}
    </div>
  );
};

export default EnhancedTableToolbar;
