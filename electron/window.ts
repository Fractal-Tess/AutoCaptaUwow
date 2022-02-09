import path from "path";
import serve from "electron-serve";
import { app, BrowserWindow } from "electron";

const prod = false;

let window: BrowserWindow | null = null;
const loadURL = serve({ directory: "dist/www" });

async function createWindow() {
  window = new BrowserWindow({
    icon: path.join(__dirname, "icon.ico"),
    frame: false,
    maximizable: false,
    fullscreen: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,

    width: 1280,
    height: 720,
    show: false,
    webPreferences: {
      devTools: true,

      /** Fast Develop */
      nodeIntegration: true,
      contextIsolation: true,

      /** Secure */
      // nodeIntegration: false,
      // contextIsolation: true,
      enableRemoteModule: true,

      preload: path.join(__dirname, "preload.js"),
    },
  });

  window.webContents.openDevTools();

  if (!prod) {
    try {
      console.log("Trying to load localhost");
      window.loadURL("http://localhost:3000");
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      console.log("Trying to load electron serve");
      loadURL(window);
    } catch (error) {
      console.log("Error loading Electron serve");
      console.log(error);
    }
  }

  window.once("ready-to-show", window.show);

  window.on("closed", () => {
    window = null;
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window === null) createWindow();
});
