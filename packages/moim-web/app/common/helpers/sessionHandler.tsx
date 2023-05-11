// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class SessionHandler {
  public static get(key: string, defaultValue?: string) {
    const value = sessionStorage.getItem(key);
    if (!value) {
      return defaultValue ?? null;
    }
    return value;
  }

  public static set(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  public static remove(key: string) {
    sessionStorage.removeItem(key);
  }
}
