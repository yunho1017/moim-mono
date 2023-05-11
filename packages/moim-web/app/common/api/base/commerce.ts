import {
  getCommerceAPIDomain,
  getOriginDomain,
} from "common/helpers/domainMaker";
import { MoimAPI } from "..";
import { MoimBaseAPI } from "./";

export class MoimCommerceAPI extends MoimBaseAPI {
  public constructor(protected instance: MoimAPI) {
    super(instance);
    const headers: any = { "x-moim-origin": getOriginDomain() };
    if (instance.groupId) {
      headers["x-moim-group-id"] = instance.groupId;
    }
    this.extendConfig({
      headers,
      baseURL: getCommerceAPIDomain(),
    });
  }
}
