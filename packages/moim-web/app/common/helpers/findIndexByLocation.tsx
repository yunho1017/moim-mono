import * as History from "history";

function findIndexByLocation(
  locations: (History.Location<Moim.IHistoryState> | undefined)[],
  historyKey: string,
) {
  return locations.findIndex(loc => loc && loc.key === historyKey);
}

export default findIndexByLocation;
