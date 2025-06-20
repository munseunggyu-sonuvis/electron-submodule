import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel: string, data: unknown) => ipcRenderer.send(channel, data),
    on: (
      channel: string,
      listener: (event: unknown, ...args: unknown[]) => void
    ) => ipcRenderer.on(channel, listener),
  },
  // 스크린샷 캡처 API
  captureScreen: (msg: string) => ipcRenderer.invoke("capture-screen", msg),
});
