import { POPUP_CLOSE_TYPE } from "common/constants/postMessage";
const CANPassLoading = require("app/common/icons/CANpass_Loader.gif").default;
const MAX_RUNNING_TIME = 30;

class PopupWindowClass {
  private currentRunCount = 0;
  private closeMessageSended = false;
  private closeCheckerId: number | undefined;
  private readonly closeMessagePayload = JSON.stringify({
    source: "vingle_moim_co_IPC",
    payload: {
      type: POPUP_CLOSE_TYPE,
    },
  });
  private closeEvent: Function | null = null;
  private selfWindow: Window | null = null;
  private windowOptions: Record<string, string | number | boolean>;
  private initialUrl: string = "";
  private id: string = "_blank";
  private disableCanPassLoading: boolean | undefined;
  private failMessage: string | undefined;

  public constructor(
    options: Record<string, string | number | boolean>,
    url: string,
    id: string,
    disableCanPassLoading?: boolean,
    failMessage?: string,
  ) {
    this.windowOptions = options;
    this.initialUrl = url;
    this.id = id;
    this.disableCanPassLoading = disableCanPassLoading;
    this.failMessage = failMessage;
  }

  public open() {
    this.selfWindow = window.open(
      this.initialUrl,
      this.id,
      Object.entries(this.windowOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join(","),
    );

    if (this.selfWindow && !this.initialUrl) {
      this.selfWindow.document.head.innerHTML =
        '<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">';
      this.selfWindow.document.body.innerHTML = `<div style="width: 100%; height:100%; display: flex; align-items:center; justify-content: center;">
      ${
        !this.disableCanPassLoading
          ? `<img src="${CANPassLoading}" width="30px"/>`
          : ""
      }

      </div>`;
      this.checkSelfClosed();
    } else {
      alert(
        this.failMessage ||
          "Fail to SignIn.\nPlease check if pop-up is allowed.",
      );
    }

    return this;
  }

  public setUrl(url: string) {
    if (this.selfWindow) {
      this.selfWindow.location.href = url;
    }
  }

  public getUrl() {
    if (this.selfWindow) {
      return this.selfWindow.location.href;
    }
  }

  public addEventListener(eventName: string, callback: () => void) {
    if (this.selfWindow && !this.selfWindow.closed) {
      this.selfWindow.addEventListener(eventName, callback);
    }
  }

  public dispatchEvent(event: Event) {
    if (this.selfWindow && !this.selfWindow.closed) {
      this.selfWindow.dispatchEvent(event);
    }
  }

  public forceClose() {
    window.clearInterval(this.closeCheckerId);
  }

  public setClose(func: Function) {
    this.closeEvent = func;
  }

  private sendClose = () => {
    if (!this.closeMessageSended) {
      this.closeEvent?.();
      window.postMessage(this.closeMessagePayload);
      this.dispatchEvent(new Event("close"));
    }
    this.closeMessageSended = true;
  };

  private readonly closeTickTask = () => {
    if (
      !this.selfWindow ||
      this.selfWindow.closed ||
      this.currentRunCount >= MAX_RUNNING_TIME
    ) {
      this.sendClose();
      window.clearInterval(this.closeCheckerId);
    }

    this.currentRunCount++;
  };

  private checkSelfClosed = () => {
    this.closeCheckerId = window.setInterval(this.closeTickTask, 1000);
  };
}

export default PopupWindowClass;
