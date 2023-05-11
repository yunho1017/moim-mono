export default interface ITracker {
  event(
    category: string,
    action: string,
    name?: string,
    value?: number,
    additionalParams?: { [key: string]: any },
  ): void;
  screenView(screenName: string, path: string): void;
  identifyUser(userId: string): void;
  signUpUser(userId: string): void;
  joinGroup(groupId: string, userId: string): void;
  purchase(params: {
    transactionId: string;
    items: any;
    currency: any;
    value: any;
  }): void;
  decorateLink(url: string): string;
}
