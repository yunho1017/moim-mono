import * as qs from "query-string";
import { generatePath } from "react-router";
import { LocationDescriptorObject, createLocation } from "history";
import { isBrowser } from "common/helpers/envChecker";

export interface ILocationOptions {
  query: { [key: string]: string | string[] };
  modal: boolean;
  state: Moim.IHistoryState;
  withBrowserSearch: boolean;
}

export default class LocationCreator {
  public constructor(
    public readonly pattern: Parameters<typeof generatePath>[0],
    public readonly params?: Partial<{ [key: string]: string | number }>,
  ) {}

  public toLocation({
    query,
    modal,
    state,
    withBrowserSearch,
  }: Partial<ILocationOptions> = {}): LocationDescriptorObject<
    Moim.IHistoryState
  > {
    return createLocation({
      pathname: this.toString(),
      search:
        query || withBrowserSearch
          ? qs.stringify({
              ...(isBrowser() && withBrowserSearch
                ? qs.parse(window.location.search.replace(/^\?/, ""))
                : {}),
              ...(query || {}),
            })
          : undefined,
      state: {
        ...state,
        modal: Boolean(modal),
      },
    });
  }

  public toString() {
    return generatePath(
      this.pattern,
      this.params as {
        [key: string]: string | number;
      },
    );
  }
}
