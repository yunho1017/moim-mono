const NORMAL_KEY = "normal";

interface IPayload {
  timestamp: number;
  message: string;
  params?: any;
}
const LOG_HEAP: Record<string, IPayload[]> = {
  [NORMAL_KEY]: [],
};

export function pushLog(message: string, group?: string, params?: any) {
  const key = group ?? NORMAL_KEY;
  // eslint-disable-next-line no-console
  console.log(group ? `${group}::${message}` : message, params);
  if (!LOG_HEAP[key]) {
    LOG_HEAP[key] = [];
  }
  LOG_HEAP[key].push({
    timestamp: Date.now(),
    message,
    params,
  });
}

export function exportLog(group?: string, withFlushing: boolean = true) {
  const result = LOG_HEAP[group ?? NORMAL_KEY];
  if (withFlushing) {
    LOG_HEAP[group ?? NORMAL_KEY] = [];
  }
  return result;
}
