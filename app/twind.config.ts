import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#56BC58",
          "50": "#D9F0DA",
          "100": "#CBEACB",
          "200": "#AEDFAF",
          "300": "#90D392",
          "400": "#73C875",
          "500": "#56BC58",
          "600": "#3E9C40",
          "700": "#2E742F",
          "800": "#1E4C1F",
          "900": "#0E240F",
        },
        discord: "#7289da",
        "primary-bg": "#202030",
      },
    },
  },
} as Options;
