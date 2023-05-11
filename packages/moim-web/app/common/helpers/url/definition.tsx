import { matchPath } from "react-router";
import * as Url from "url";
import { LocationDescriptorObject } from "history";
import LocationCreator from "./locationCreator";

export abstract class URLDefinition {
  public static readonly pattern: string;
  public static readonly schema?: string;

  public static toString(): string {
    return this.pattern;
  }

  public static match(path: string, exact: boolean = false) {
    return matchPath<Moim.IMatchParams>(path, {
      path: this.pattern,
      exact,
    });
  }

  public static matchExact(path: string) {
    return this.match(path, true);
  }

  public static matchSchema(path: string, exact: boolean = false) {
    const parser = Url.parse(path);
    const host = decodeURIComponent(parser.host as string);
    const pathname = decodeURIComponent(parser.pathname as string);
    const pathWithoutSchema = `/${host ? host : ""}${pathname}`;
    if (!this.schema) {
      return this.match(pathWithoutSchema, exact);
    }
    return matchPath<Moim.IMatchParams>(pathWithoutSchema, {
      path: this.schema,
      exact,
    });
  }

  public static matchSchemaExact(path: string) {
    return this.matchSchema(path, true);
  }

  public static isSame(path: string, exact: boolean = false): boolean {
    return this.match(path, exact) !== null;
  }

  public static isSameExact(path: string): boolean {
    return this.isSame(path, true);
  }

  public static isSameSchema(path: string, exact: boolean = false): boolean {
    return this.matchSchema(path, exact) !== null;
  }

  public static isSameSchemaExact(path: string): boolean {
    return this.isSameSchema(path, true);
  }

  public abstract toString(): string;
  public abstract toLocation(
    params: Parameters<typeof LocationCreator.prototype.toLocation>[0],
  ): LocationDescriptorObject<Moim.IHistoryState>;
  public abstract toSchema(): string;
}
