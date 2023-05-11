/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */

import { isProd } from "common/helpers/envChecker";
import _ from "lodash";
import ITracker from "../ITracker";

declare global {
  interface Window {
    _paq: any;
  }
}

class MoimTracker implements ITracker {
  public constructor(
    protected group: { id: string; name: string },
    protected userId?: string,
  ) {
    const domain = location.hostname;
    let trackerUrl = "https://matomo.moim.co/matomo.php";
    let trackerScriptSrc = "https://matomo.moim.co/matomo.js";

    /**
     * For Prod Test
     */
    if (domain.includes("youcanweb3consulting.net")) {
      trackerUrl = "https://analytics.youcanweb3consulting.net/matomo.php";
      trackerScriptSrc = "https://analytics.youcanweb3consulting.net/matomo.js";
    }

    /**
     * For Staging Test
     */
    if (domain.includes("moim.mobi")) {
      trackerUrl = "https://analytics.moim.mobi/matomo.php";
      trackerScriptSrc = "https://analytics.moim.mobi/matomo.js";
    }

    const _paq = (window._paq = window._paq || []);
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(["setCustomDimension", 1, this.group.id]);
    _paq.push(["setCustomDimension", 2, "Web"]);
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);
    _paq.push(["setTrackerUrl", trackerUrl]);
    _paq.push(["setSiteId", isProd() ? "1" : "2"]);

    const script = document.createElement("script");
    script.src = trackerScriptSrc;
    script.async = true;
    document.head.insertBefore(script, document.head.childNodes[0]);
  }

  public event(
    category: string,
    action: string,
    name?: string,
    value?: number,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    additionalParams?: { [key: string]: any },
  ): void {
    window._paq.push([
      "trackEvent",
      category,
      action,
      name,
      value,
      {
        dimension3: this.group.id,
        dimension4: location.pathname,
        dimension5: "Web",
      },
    ]);
  }

  public screenView(screenName: string, _path: string): void {
    window._paq.push(["setDocumentTitle", screenName]);
    window._paq.push([
      "trackPageView",
      screenName,
      {
        dimension3: this.group.id,
        dimension4: location.pathname,
        dimension5: "Web",
      },
    ]);
  }

  public identifyUser(userId: string) {
    window._paq.push(["setUserId", userId]);
  }

  public signUpUser(userId: string) {
    window._paq.push([
      "trackEvent",
      "user",
      "sign_up",
      userId,
      undefined,
      {
        dimension3: this.group.id,
        dimension4: location.pathname,
        dimension5: "Web",
      },
    ]);
  }

  public joinGroup(groupId: string, _userId: string): void {
    window._paq.push([
      "trackEvent",
      "user",
      "join_group",
      groupId,
      undefined,
      {
        dimension3: groupId,
        dimension4: location.pathname,
        dimension5: "Web",
      },
    ]);
  }

  public purchase(params: {
    transactionId: string;
    items: any;
    currency: any;
    value: any;
  }) {
    (params.items ?? []).forEach((item: any) => {
      window._paq.push([
        "addEcommerceItem",
        item.id,
        item.name,
        item.price,
        item.quantity,
      ]);
    });

    window._paq.push([
      "trackEcommerceOrder",
      params.transactionId,
      params.value,
    ]);
  }

  public decorateLink(url: string) {
    return url;
  }
}

export default MoimTracker;
