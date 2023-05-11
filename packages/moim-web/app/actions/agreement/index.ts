import { ThunkPromiseResult } from "app/store";
import { ActionUnion } from "app/actions/helpers";
import AgreementAPI from "common/api/agreement";
import { AgreementTypes } from "../types";

function createAction<T extends { type: AgreementTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startPutAgreement: () =>
    createAction({ type: AgreementTypes.START_PUT_AGREEMENT }),
  succeedPutAgreement: (agreement: Moim.Agreement.IAgreement) =>
    createAction({
      type: AgreementTypes.SUCCEED_PUT_AGREEMENT,
      payload: { agreement },
    }),
  failedPutAgreement: () =>
    createAction({ type: AgreementTypes.FAILED_PUT_AGREEMENT }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getAgreement(
  ...params: Parameters<typeof AgreementAPI.prototype.getAgreement>
): ThunkPromiseResult<Moim.Agreement.IAgreement | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch).agreement;
    try {
      const result = await api.getAgreement(...params);
      return result.data;
    } catch (err) {
      throw err;
    }
  };
}

export function putAgreement(
  ...params: Parameters<typeof AgreementAPI.prototype.putAgreement>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const api = apiSelector(getState(), dispatch).agreement;
    dispatch(ActionCreators.startPutAgreement());
    try {
      const result = await api.putAgreement(...params);
      dispatch(ActionCreators.succeedPutAgreement(result.data));
    } catch (err) {
      dispatch(ActionCreators.failedPutAgreement());
    }
  };
}
