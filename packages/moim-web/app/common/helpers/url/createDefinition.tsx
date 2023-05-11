import * as qs from "query-string";
import LocationCreator, { ILocationOptions } from "./locationCreator";
import { GROUP_APP_SCHEMA } from "common/constants/hosts";
import { URLDefinition } from "./definition";

const WEB_PROTOCOL_REGEX = /^(http|https):\/\//i;

export default function createURLDefinition<
  P extends
    | Partial<{ [key in Moim.MatchParamKeys]: string | number }>
    | undefined
>(pattern: string, schema?: string) {
  return class MoimURLDefinition extends URLDefinition {
    public static readonly pattern: string = pattern;
    public static readonly schema?: string = schema;

    public readonly locationCreator: LocationCreator;
    public readonly schemaCreator?: LocationCreator;

    public constructor(params?: P) {
      super();
      this.locationCreator = new LocationCreator(
        MoimURLDefinition.pattern,
        params,
      );
      if (MoimURLDefinition.schema) {
        this.schemaCreator = new LocationCreator(
          MoimURLDefinition.schema,
          params,
        );
      }
    }

    public toLocation(params: Partial<ILocationOptions>) {
      return this.locationCreator.toLocation(params);
    }

    public toString(hostname?: string) {
      const queryParams = qs.parse(location.search);
      const protocolSafeHostname = hostname
        ? WEB_PROTOCOL_REGEX.test(hostname)
          ? hostname
          : `https://${hostname}`
        : "";
      return `${protocolSafeHostname}${this.locationCreator.toString()}${
        queryParams.pr_tag ? `?pr_tag=${queryParams.pr_tag}` : ""
      }`;
    }

    public toObject(hostname?: string) {
      const queryParams = qs.parse(location.search);
      const protocolSafeHostname = hostname
        ? WEB_PROTOCOL_REGEX.test(hostname)
          ? hostname
          : `https://${hostname}`
        : "";
      const pathname = `${protocolSafeHostname}${this.locationCreator.toString()}`;
      const search = queryParams.pr_tag ? `?pr_tag=${queryParams.pr_tag}` : "";
      return {
        pathname,
        search,
      };
    }

    public toSchema() {
      return `${GROUP_APP_SCHEMA}${(this.schemaCreator || this.locationCreator)
        .toString()
        .replace(/^\//, "")}`;
    }
  };
}
