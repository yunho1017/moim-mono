import * as Cookies from "js-cookie";

const defaultOption: Cookies.CookieAttributes = {
  secure: true,
};

export function get<T = string | undefined>(key: string, defaultValue?: T): T {
  const value = Cookies.get(key);
  if (value === undefined && defaultValue) {
    return defaultValue;
  }
  return (value as unknown) as T;
}

export function set(
  key: string,
  value: string | any,
  options?: Cookies.CookieAttributes,
) {
  Cookies.set(key, value, { ...defaultOption, ...options });
}

export function remove(key: string, options?: Cookies.CookieAttributes) {
  Cookies.remove(key, { ...defaultOption, ...options });
}
