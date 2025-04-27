import PortfolioBuilder from "@/features/portfolio-builder";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col p-3 max-w-full">
      <div className="flex flex-col items-center space-y-4">
        <PortfolioBuilder />
      </div>
      <footer
        className="mt-4 flex justify-center overflow-hidden"
        data-testid="page-footer"
      ></footer>
    </div>
  );
}
