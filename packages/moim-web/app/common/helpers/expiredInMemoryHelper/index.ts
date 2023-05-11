const hash: { [key: string]: any } = {};

/**
 *
 * @param key Key
 * @param value Input any type of value
 * @param lifetime Pass milliseconds
 */
export function set(key: string, value: any, lifetime: number) {
  hash[key] = {
    value,
    expiresAt: lifetime !== -1 ? Date.now() + lifetime : lifetime,
  };
}

export function get<T>(key: string): T | null {
  const saved = hash[key];
  if (saved) {
    const { value, expiresAt } = saved;
    if (expiresAt !== -1 && expiresAt < Date.now()) {
      // expired
      hash[key] = null;
    } else {
      return value;
    }
  }
  return null;
}

export function remove(key: string) {
  hash[key] = null;
}

export function clearAll() {
  const keys = Object.keys(hash);
  keys.forEach(key => (hash[key] = null));
}
