import plugin from "tailwindcss/plugin";
import { default as beeqPreset, TYPOGRAPHY_DEFAULT } from "@beeq/tailwindcss";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/features/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  presets: [beeqPreset],
  plugins: [
    plugin(function ({ addBase }) {
      // Use the default typography styles
      addBase({ ...TYPOGRAPHY_DEFAULT });
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};
export default config;
