import ITracker from "../ITracker";
import ReactGA from "react-ga";
import getWildDomainName from "common/helpers/getWildDomain";
import { isProd } from "common/helpers/envChecker";
import { PRODUCTION_HOST, STAGE_HOST } from "common/constants/hosts";

class GoogleTracker implements ITracker {
  public constructor(
    private trackingId: string,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private group: { id: string; name: string },
    private userId?: string,
  ) {
    ReactGA.initialize(
      this.trackingId,
      this.userId
        ? {
            gaOptions: {
              userId: this.userId,
              cookieFlags: "samesite=none;secure",
            },
          }
        : undefined,
    );

    ReactGA.ga("require", "linker");
    ReactGA.ga("require", "ecommerce");
    ReactGA.ga(
      "linker:autoLink",
      [getWildDomainName(), isProd() ? PRODUCTION_HOST : STAGE_HOST],
      false,
      true,
    );
  }

  public event(
    category: string,
    action: string,
    name?: string,
    value?: number,
    additionalParams?: { [key: string]: any },
  ): void {
    ReactGA.event({
      category,
      action,
      label: name,
      value,
      ...(additionalParams ?? {}),
    });
  }

  public screenView(screenName: string, path: string): void {
    ReactGA.pageview(path, undefined, screenName);
  }

  public identifyUser(userId: string) {
    ReactGA.set({ userId });
  }

  public signUpUser(_userId: string) {
    ReactGA.event({
      category: "engagement",
      action: "sign_up",
    });
  }

  public joinGroup(groupId: string, _userId: string): void {
    ReactGA.event({
      category: "engagement",
      action: "join_group",
      label: groupId,
    });
  }

  public purchase(params: {
    transactionId: string;
    items: any;
    currency: any;
    value: any;
  }) {
    ReactGA.plugin.execute("ecommerce", "addTransaction", {
      id: params.transactionId,
      revenue: params.value,
      currency: params.currency,
    });

    ((params.items ?? []) as { [key: string]: any }[]).forEach(item => {
      ReactGA.plugin.execute("ecommerce", "addItem", {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        currency: params.currency,
      });
    });

    ReactGA.plugin.execute("ecommerce", "send", {});
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
    } catch (e) {}

    return url;
  }
}

export default GoogleTracker;
