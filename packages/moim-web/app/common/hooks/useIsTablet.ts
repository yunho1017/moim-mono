import useMedia from "common/hooks/useMedia";
import { MEDIA_QUERY } from "common/constants/responsive";

const queries = [MEDIA_QUERY.ONLY_TABLET];
const values = [true];

function useIsTablet() {
  return Boolean(useMedia(queries, values, false));
}

export default useIsTablet;
