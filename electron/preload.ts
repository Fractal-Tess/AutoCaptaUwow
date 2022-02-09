const electron = require("electron");
const browserWindow = electron.remote.getCurrentWindow();
const { contextBridge } = require("electron");

function exit(): void {
  browserWindow.close();
}

function toggleAlwaysOnTop(state: boolean): boolean {
  browserWindow.setAlwaysOnTop(state);
  return browserWindow.isAlwaysOnTop();
}
function isOnTop(): boolean {
  return browserWindow.isAlwaysOnTop();
}
const api = { exit, toggleAlwaysOnTop, isOnTop };

export { api };
contextBridge.exposeInMainWorld("api", { ...api });
