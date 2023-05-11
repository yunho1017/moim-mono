/* eslint-disable @typescript-eslint/member-ordering */
import _ from "lodash";
import ITracker from "../ITracker";

declare global {
  interface Window {
    tagmanager: any;
    gtmDataLayer: any;
    gaplugins: any;
  }
}

class GoogleTagManagerTracker implements ITracker {
  public constructor(
    protected trackingId: string,
    protected group: { id: string; name: string },
    protected userId?: string,
  ) {
    if (!window.tagmanager) {
      window.tagmanager = function(params: any) {
        window.gtmDataLayer.push(params);
      };
    }

    if (trackingId.startsWith("GTM-")) {
      document.head.insertBefore(this.gtmScript(), document.head.childNodes[0]);
      document.body.insertBefore(
        this.gtmNoScript(),
        document.body.childNodes[0],
      );
    }
  }

  private gtmScript() {
    const script = document.createElement("script");
    script.innerHTML = `\
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\
})(window,document,'script','gtmDataLayer','${this.trackingId}');`;

    return script;
  }

  private gtmNoScript() {
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `\
<iframe src="https://www.googletagmanager.com/ns.html?id=${this.trackingId}"\
height="0" width="0" style="display:none;visibility:hidden">\
</iframe>`;
    return noscript;
  }

  public event(
    category: string,
    action: string,
    name?: string,
    value?: number,
    additionalParams?: { [key: string]: any },
  ): void {
    window.tagmanager({
      event_category: category,
      event_label: name,
      event_value: value,
      group_id: this.group.id,
      group_name: this.group.name,
      page_path: location.href,
      platform: "Web",
      ...(additionalParams ?? {}),
      event: action,
    });
  }

  public screenView(screenName: string, path: string): void {
    window.tagmanager({
      page_title: screenName,
      page_path: path,
      group_id: this.group.id,
      group_name: this.group.name,
      platform: "Web",
      event: "page_view",
    });
  }

  public identifyUser(userId: string) {
    window.tagmanager({
      event: "identify_user",
      platform: "Web",
      user_id: userId,
    });
  }

  public signUpUser(userId: string) {
    window.tagmanager({
      group_id: this.group.id,
      group_name: this.group.name,
      platform: "Web",
      event: "sign_up",
      user_id: userId,
    });
  }

  public joinGroup(groupId: string, _userId: string): void {
    window.tagmanager({
      group_id: groupId,
      group_name: this.group.name,
      platform: "Web",
      event: "join_group",
    });
  }

  public purchase(params: {
    transactionId: string;
    items: any;
    currency: any;
    value: any;
  }) {
    window.tagmanager({
      group_id: this.group.id,
      group_name: this.group.name,
      platform: "Web",
      transaction_id: params.transactionId,
      items: params.items,
      currency: params.currency,
      value: params.value,
      event: "purchase",
    });
  }

  public decorateLink(url: string) {
    try {
      if (window.ga && window.ga.getAll()[0]) {
        const tracker = window.ga.getAll()[0];

        if (window.gaplugins.Linker) {
          const linker = new window.gaplugins.Linker(tracker);
          return linker.decorate(url);
        }
      }
      // eslint-disable-next-line no-empty
    } catch {}

    return url;
  }
}

export default GoogleTagManagerTracker;
