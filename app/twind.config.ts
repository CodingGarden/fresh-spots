import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: {
        discord: '#7289da',
        'primary-bg': '#202030',
      }
    }
  }
} as Options;
