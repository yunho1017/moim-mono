import {
  renderHook,
  act,
  RenderHookResult,
} from "@testing-library/react-hooks";
import usePrevious from "../usePrevious";

describe("usePrevious", () => {
  let hookResult: RenderHookResult<null, ReturnType<typeof usePrevious>>;

  beforeAll(() => {
    hookResult = renderHook(() => usePrevious(2));
  });

  describe("when initialize hook", () => {
    it("should return undefined", () => {
      expect(hookResult.result.current).toBeUndefined();
    });
  });

  describe("when called", () => {
    it("should isOpen is truthy", () => {
      act(() => {
        hookResult.rerender();
      });

      expect(hookResult.result.current).toBe(2);
    });
  });
});
