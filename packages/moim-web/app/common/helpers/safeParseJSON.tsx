export default function safeParseJSON(data: string, fallbackValue: any = null) {
  try {
    if (data && typeof data === "object") {
      return data;
    } else {
      return JSON.parse(data);
    }
  } catch {
    return fallbackValue;
  }
}
