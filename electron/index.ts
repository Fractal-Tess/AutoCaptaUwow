import { BrowserWindowConstructorOptions } from "electron";

import Main from "./window";
import DevConfig from "./devConfig";
import DeveloperOptions from "./types";

const developerOptions: DeveloperOptions = {
  isInProduction: false, // true if is in production
  serveSvelteDev: true, // true when you want to watch svelte
  buildSvelteDev: false, // true when you want to build svelte
  watchSvelteBuild: false, // true when you want to watch build svelte
};

const appName = "Fractal-Tess | SvelteKit, Electron, TypeScript";

const windowSettings: BrowserWindowConstructorOptions = {
  title: "Fractal-Tess- SvelteKit, Electron, TypeScript",
  width: 720,
  height: 480,
};

const devConfig = new DevConfig(developerOptions);

const main = new Main(windowSettings, appName, devConfig);
