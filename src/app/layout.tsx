import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import BeeqSetup from "./beeq";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Sentirion",
  description: "A stock portfolio insight tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <BeeqSetup>{children}</BeeqSetup>
      </body>
    </html>
  );
}
