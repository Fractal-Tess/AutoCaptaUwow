import { app, BrowserWindow } from "electron";
import path from "path";
import DevConfig from "./devConfig";

class Main {
  window: BrowserWindow | null = null;
  settings: { [key: string]: any };
  devConfig: DevConfig;
  appName: string;

  constructor(
    settings: { [key: string]: any },
    appName: string = "Fractal-Tess SKETT",
    devConfig: DevConfig
  ) {
    this.settings = settings;
    this.devConfig = devConfig;
    this.appName = appName;

    app.on("ready", () => {
      this.createWindow();
    });

    app.on("window-all-closed", this.onWindowAllClosed);
  }

  async createWindow() {
    app.name = this.appName;
    let window = new BrowserWindow({
      ...this.settings,
      show: false,
      webPreferences: {
        /** Fast Develop */
        nodeIntegration: true,
        contextIsolation: false,

        /** Secure */
        // nodeIntegration: false,
        // contextIsolation: true,
        // enableRemoteModule: true,
        // preload: path.join(__dirname, "preload.js"),
      },
    });

    // Load html
    if (this.devConfig.isLocalHost()) {
      try {
        console.log("Trying to load localhost");
        await window.loadURL("http://localhost:3000/");
      } catch (error) {
        console.log("Error loading localhost");
        console.log(error);
      }
    } else if (this.devConfig.isElectronServe()) {
      try {
        console.log("Trying to load electron serve");
        await this.devConfig.loadURL(window);
      } catch (error) {
        console.log("Error loading Electron serve");
        console.log(error);
      }
    }

    window.once("ready-to-show", window.show);

    return window;
  }

  onWindowAllClosed() {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }
}

export default Main;
