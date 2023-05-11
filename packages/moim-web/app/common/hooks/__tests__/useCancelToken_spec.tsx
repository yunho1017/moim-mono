import {
  act,
  renderHook,
  RenderHookResult,
} from "@testing-library/react-hooks";
import useCancelToken from "common/hooks/useCancelToken";

describe("useCancelToken", () => {
  let hookResult: RenderHookResult<string, ReturnType<typeof useCancelToken>>;

  beforeAll(() => {
    hookResult = renderHook(identity => useCancelToken(identity), {
      initialProps: "Hello",
    });
  });

  describe("when call useCancelToken", () => {
    it("should return cancel token", () => {
      expect(hookResult.result.current.current.token).not.toBeNull();
      expect(hookResult.result.current.current.cancel).not.toBeNull();
    });
  });

  describe("when inject same identity", () => {
    it("should return equal cancel token", () => {
      const currentCancelToken = hookResult.result.current.current;

      act(() => {
        hookResult.rerender("Hello");
      });

      expect(currentCancelToken).toEqual(hookResult.result.current.current);
    });
  });

  describe("when change identity", () => {
    it("should return new cancel token", () => {
      const currentCancelToken = hookResult.result.current.current;

      act(() => {
        hookResult.rerender("Bye");
      });

      expect(currentCancelToken).not.toEqual(hookResult.result.current.current);
    });
  });
});
