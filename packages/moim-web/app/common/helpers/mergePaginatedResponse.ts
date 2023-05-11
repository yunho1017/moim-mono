import mergeWithArrayConcatUniq from "./mergeWithArrayConcatUniq";

export default function mergePaginatedResponse<T>(
  before: Moim.IPaginatedListResponse<T> | undefined,
  after: Moim.IPaginatedListResponse<T>,
) {
  let result: Moim.IPaginatedListResponse<T> = {
    data: [],
    paging: {},
  };
  result = mergeWithArrayConcatUniq(result, before || result, after);
  result.paging = after.paging;
  return result;
}
