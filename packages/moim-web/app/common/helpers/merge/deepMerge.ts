import merge from "lodash/merge";
import { Source } from "./types";

/**
 * this merge function is immutable
 */
function deepMerge(...sources: Source[]) {
  return merge({}, ...sources);
}

export default deepMerge;
