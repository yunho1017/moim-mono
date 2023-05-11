import { RenderHookResult } from "@testing-library/react-hooks";
import { renderHookWithStoreAndIntl } from "app/__tests__/intlEnzymeTestHelper";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { initialState } from "app/rootReducer";
import { NORMALIZED, RAW } from "app/__mocks__";

describe("useCurrentGroup", () => {
  let hookResult: RenderHookResult<null, ReturnType<typeof useCurrentGroup>>;

  describe("when current user id is empty (not logged in)", () => {
    beforeEach(() => {
      const { renderResult } = renderHookWithStoreAndIntl<
        ReturnType<typeof useCurrentGroup>
      >({
        hook: useCurrentGroup,
        initialState: {
          ...initialState,
          app: {
            ...initialState.app,
            currentGroupId: null,
          },
        },
      });

      hookResult = renderResult;
    });

    it("should return null", () => {
      expect(hookResult.result.current).toBeNull();
    });
  });

  describe("when current user id is not empty (logged in)", () => {
    beforeEach(() => {
      const { renderResult } = renderHookWithStoreAndIntl({
        hook: useCurrentGroup,
        initialState: {
          ...initialState,
          app: {
            ...initialState.app,
            currentGroupId: RAW.GROUP_WITH_USER.group.id,
          },
          entities: {
            ...initialState.entities,
            ...NORMALIZED.MOIM.entities,
          },
        },
      });

      hookResult = renderResult;
    });

    it("should return group entity", () => {
      expect(hookResult.result.current).toEqual({
        ...RAW.GROUP_WITH_USER.group,
        stat: "G0I35WHAG",
      });
    });
  });
});
