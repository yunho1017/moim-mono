/* eslint-disable @typescript-eslint/member-ordering */
import { PRODUCTION_HOST, STAGE_HOST } from "common/constants/hosts";
import { isProd } from "common/helpers/envChecker";
import getWildDomainName from "common/helpers/getWildDomain";
import Cookies from "js-cookie";
import _ from "lodash";
import ITracker from "../ITracker";

declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
    gaplugins: any;
  }
}

class GoogleTagTracker implements ITracker {
  public constructor(
    protected trackingIds: string[],
    protected group: { id: string; name: string },
    protected userId?: string,
  ) {
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };

      window.gtag("js", new Date());
    }

    trackingIds.forEach(trackingId => {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.insertBefore(script, document.head.childNodes[0]);
    });

    const config = {
      cookie_flags: "secure;sameSite=none",
      send_page_view: false,
      linker: {
        domains: [getWildDomainName(), isProd() ? PRODUCTION_HOST : STAGE_HOST],
      },
    };

    if (this.userId) {
      _.assign(config, {
        user_id: this.userId,
      });
    }
    window.gtag("set", "linker");

    trackingIds.forEach(trackingId => {
      window.gtag("config", trackingId, config);
    });
  }

  public event(
    category: string,
    action: string,
    name?: string,
    value?: number,
    additionalParams?: { [key: string]: any },
  ): void {
    window.gtag("event", action, {
      event_category: category,
      event_label: name,
      event_value: value,
      group_id: this.group.id,
      page_path: location.pathname,
      group_name: this.group.name,
      platform: "Web",
      ...additionalParams,
    });
  }

  public screenView(screenName: string, path: string): void {
    window.gtag("event", "page_view", {
      page_title: screenName,
      page_path: path,
      group_id: this.group.id,
      group_name: this.group.name,
      platform: "Web",
    });
  }

  public identifyUser(userId: string) {
    this.trackingIds.forEach(trackingId => {
      window.gtag("config", trackingId, {
        user_id: userId,
      });
    });
  }

  public signUpUser(userId: string) {
    window.gtag("event", "sign_up", {
      group_id: this.group.id,
      group_name: this.group.name,
      user_id: userId,
      platform: "Web",
    });
  }

  public joinGroup(groupId: string, _userId: string): void {
    window.gtag("event", "join_group", {
      group_id: groupId,
      group_name: this.group.name,
      platform: "Web",
    });
  }

  public purchase(params: {
    transactionId: string;
    items: any;
    currency: any;
    value: any;
  }) {
    window.gtag("event", "purchase", {
      transaction_id: params.transactionId,
      items: params.items,
      currency: params.currency,
      value: params.value,
    });
  }

  public decorateLink(url: string) {
    const parsed = new URL(url);

    const gid = Cookies.get("_gid");
    const ga = Cookies.get("_ga");
    const gat = Cookies.get("_gat");

    if (ga) {
      parsed.searchParams.set(`_ga`, ga);
    }

    if (gat) {
      parsed.searchParams.set(`_gat`, gat);
    }

    if (gid) {
      parsed.searchParams.set(`_gid`, gid);
    }

    this.trackingIds.forEach(trackingId => {
      const idOnly = trackingId.replace("G-", "");
      const gaContainer = Cookies.get(`_ga_${idOnly}`);

      if (gaContainer) {
        parsed.searchParams.set(`_ga_${idOnly}`, gaContainer);
      }
    });

    // Fixme : for naver premium log feature
    const wcs = Cookies.get("wcs_bt");
    if (wcs) {
      parsed.searchParams.set("wcs_bt", wcs);
    }

    return parsed.toString();
  }
}

export default GoogleTagTracker;
