jest.mock("common/hooks/useIsMobile", () => () => true);

import { RenderHookResult, act } from "@testing-library/react-hooks";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import { renderHookWithStoreAndIntl } from "app/__tests__/intlEnzymeTestHelper";
import { initialState } from "app/rootReducer";
import { IThunkMockState } from "app/__mocks__/mockStore";
import { ActionCreators } from "app/actions/sideNavigation";

describe("useSideNavigationPanel hook", () => {
  let hookResult: RenderHookResult<
    null,
    ReturnType<typeof useSideNavigationPanel>
  >;
  let store: IThunkMockState;

  beforeEach(() => {
    const { renderResult, mockStore } = renderHookWithStoreAndIntl<
      ReturnType<typeof useSideNavigationPanel>
    >({
      hook: useSideNavigationPanel,
      initialState: {
        ...initialState,
      },
    });

    hookResult = renderResult;
    store = mockStore;
  });

  describe("when call expandSideNavigation", () => {
    it("should dispatch EXPAND_SIDE_NAVIGATION action", () => {
      const { expandSideNavigation } = hookResult.result.current;

      act(() => {
        expandSideNavigation();
      });

      const [expandSideNavigationAction] = store.getActions();

      expect(expandSideNavigationAction).toEqual(
        ActionCreators.expandSideNavigation(),
      );
    });
  });

  describe("when call collapseSideNavigation", () => {
    it("should dispatch COLLAPSE_SIDE_NAVIGATION action", () => {
      const { collapseSideNavigation } = hookResult.result.current;

      act(() => {
        collapseSideNavigation();
      });

      const [collapseSideNavigationAction] = store.getActions();

      expect(collapseSideNavigationAction).toEqual(
        ActionCreators.collapseSideNavigation(),
      );
    });
  });
});
