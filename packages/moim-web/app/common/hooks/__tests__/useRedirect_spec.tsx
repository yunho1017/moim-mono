import { act, RenderHookResult } from "@testing-library/react-hooks";
import { CALL_HISTORY_METHOD } from "connected-react-router";

import { IThunkMockState } from "app/__mocks__/mockStore";
import { renderHookWithStoreAndIntl } from "app/__tests__/intlEnzymeTestHelper";
import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "common/helpers/url";

describe("useRedirect hook ", () => {
  let hookResult: RenderHookResult<null, ReturnType<typeof useRedirect>>;
  let store: IThunkMockState;

  beforeEach(() => {
    const { renderResult, mockStore } = renderHookWithStoreAndIntl<
      ReturnType<typeof useRedirect>
    >({
      hook: useRedirect,
    });

    hookResult = renderResult;
    store = mockStore;
  });

  describe("when call redirect", () => {
    it("should dispatch PUSH action to store", () => {
      const redirect = hookResult.result.current;
      const path = new MoimURL.MoimAppHome().toString();

      act(() => {
        redirect(path);
      });

      const [PUSH_ACTION] = store.getActions();

      expect(PUSH_ACTION).toMatchObject({
        type: CALL_HISTORY_METHOD,
      });
    });
  });
});
