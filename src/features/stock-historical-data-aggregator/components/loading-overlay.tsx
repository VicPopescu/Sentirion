type LoadingOverlayProps = {
  isLoading: boolean;
};

const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
      <div className="w-full">
        <div className="h-1 bg-blue-500 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
