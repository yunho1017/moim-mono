import ITracker from "../ITracker";
import * as amplitude from "amplitude-js";

class AmplitudeTracker implements ITracker {
  public constructor(
    private trackingId: string,
    private group: { id: string; name: string },
    private userId?: string,
  ) {
    amplitude.getInstance().init(this.trackingId, this.userId, {
      includeGclid: true,
      includeReferrer: true,
      includeUtm: true,
    });
  }

  public event(
    category: string,
    action: string,
    name?: string,
    value?: number,
    additionalParams?: { [key: string]: any },
  ): void {
    amplitude.getInstance().logEvent(action, {
      event_category: category,
      event_label: name,
      event_value: value,
      groupId: this.group.id,
      groupName: this.group.name,
      pagePath: location.href,
      platform: "Web",
      ...(additionalParams ?? {}),
    });
  }

  public screenView(screenName: string, path: string): void {
    amplitude.getInstance().logEvent("Page View", {
      name: screenName,
      path,
      groupId: this.group.id,
      groupName: this.group.name,
      platform: "Web",
    });
  }

  public identifyUser(userId: string) {
    amplitude.getInstance().setUserId(userId);
  }

  public signUpUser(userId: string) {
    amplitude.getInstance().logEvent("Sign Up", {
      groupId: this.group.id,
      groupName: this.group.name,
      userId,
      platform: "Web",
    });
  }

  public joinGroup(groupId: string, _user: string) {
    amplitude.getInstance().logEvent("Join Group", {
      groupId,
      groupName: this.group.name,
      platform: "Web",
    });
  }

  public purchase(params: {
    transactionId: string;
    items: any;
    currency: any;
    value: any;
  }) {
    amplitude.getInstance().logEvent("Purchase", {
      groupId: this.group.id,
      groupName: this.group.name,
      platform: "Web",
      transactionId: params.transactionId,
      items: params.items,
      currency: params.currency,
      value: params.value,
    });
  }

  public decorateLink(url: string) {
    return url;
  }
}

export default AmplitudeTracker;
