import {
  renderHook,
  act,
  RenderHookResult,
} from "@testing-library/react-hooks";
import useOpenState from "../useOpenState";

describe("useOpenState", () => {
  let hookResult: RenderHookResult<null, ReturnType<typeof useOpenState>>;

  beforeAll(() => {
    hookResult = renderHook(() => useOpenState());
  });

  describe("when initialize hook", () => {
    it("should isOpen is default value as false", () => {
      expect(hookResult.result.current.isOpen).toBeFalsy();
    });
  });

  describe("when call open", () => {
    it("should isOpen is truthy", () => {
      act(() => {
        hookResult.result.current.open();
      });

      expect(hookResult.result.current.isOpen).toBeTruthy();
    });
  });

  describe("when call close", () => {
    it("should isOpen is falsy", () => {
      act(() => {
        hookResult.result.current.close();
      });

      expect(hookResult.result.current.isOpen).toBeFalsy();
    });
  });
});
