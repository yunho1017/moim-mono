import * as History from "history";
import findIndexByLocation from "./findIndexByLocation";

function getBackHistoryKey(
  locations: (History.Location<Moim.IHistoryState> | undefined)[],
  currentLocationKey?: string,
  prevLocationKey?: string,
) {
  if (!prevLocationKey || !currentLocationKey) {
    return;
  }

  const currentPosition = findIndexByLocation(locations, currentLocationKey);
  const prevPosition = findIndexByLocation(locations, prevLocationKey);

  return prevPosition - currentPosition;
}

export default getBackHistoryKey;
