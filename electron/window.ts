import path from "path";
import serve from "electron-serve";
import { app, BrowserWindow } from "electron";

app.name = "Fractal-Tess | SvelteKit, Electron, TypeScript";

let window: BrowserWindow | null = null;
const loadURL = serve({ directory: "dist/www" });

async function createWindow() {
  window = new BrowserWindow({
    title: "Fractal-Tess- SvelteKit, Electron, TypeScript",
    icon: path.join(__dirname, "icon.ico"),
    frame: false,
    maximizable: false,
    fullscreen: false,
    fullscreenable: false,
    resizable: false,

    width: 720,
    height: 480,
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

  try {
    console.log("Trying to load electron serve");
    loadURL(window);
  } catch (error) {
    console.log("Error loading Electron serve");
    console.log(error);
  }

  window.once("ready-to-show", window.show);
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    window = null;
    app.quit();
  }
});
