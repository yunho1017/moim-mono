import { fileListSelector } from "app/selectors/file";
import { ThunkPromiseResult } from "app/store";

export function checkUploadDone(ids?: Moim.Id[]): ThunkPromiseResult<boolean> {
  return async (_dispatch, getState) => {
    const state = getState();
    if (!ids) return true;
    const files = fileListSelector(state, ids);
    return !files
      .map(f => f?.status.name ?? "WAITING_FOR_UPLOAD")
      .some(statusName => statusName !== "AVAILABLE");
  };
}
