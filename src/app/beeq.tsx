"use client";

import { useEffect, useState } from "react";

interface BeeqSetupProps {
  readonly children: React.ReactNode;
}

export default function BeeqSetup({ children }: BeeqSetupProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Import setBasePath dynamically only on the client side
    import("@beeq/core/dist/components").then(({ setBasePath }) => {
      // Set the base path for BEEQ assets (adjust the path according to your setup)
      setBasePath("icons/svg");
      setIsInitialized(true);
    });
  }, []);

  // Don't render children until BEEQ is initialized
  if (!isInitialized) {
    return null; // Or a loading state if preferred
  }

  return <>{children}</>;
}
