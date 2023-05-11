import psl from "psl";

const defaultParser = (hostName: string) =>
  hostName.substring(
    hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1,
  );

export default function getWildDomainName() {
  const hostName = location.hostname;
  const parsed = psl.parse(hostName);
  if (parsed.error) {
    return defaultParser(hostName);
  } else {
    return parsed.domain ?? defaultParser(hostName);
  }
}
