import {
  act,
  renderHook,
  RenderHookResult,
} from "@testing-library/react-hooks";
import useStateWithMaxLength, {
  ERROR_CODE,
} from "common/hooks/useStateWithMaxLength";

describe("useStateWithMaxLength hook", () => {
  let hookResult: RenderHookResult<
    Parameters<typeof useStateWithMaxLength>[0],
    ReturnType<typeof useStateWithMaxLength>
  >;
  const defaultState = "Hello";

  beforeAll(() => {
    hookResult = renderHook(param => useStateWithMaxLength(param), {
      initialProps: {
        minLength: 3,
        maxLength: 15,
        defaultValue: defaultState,
      },
    });
  });

  describe("when render hook", () => {
    it("should state is same default state", () => {
      expect(hookResult.result.current.state).toEqual(defaultState);
    });

    it("should error is undefined", () => {
      expect(hookResult.result.current.error).toBeUndefined();
    });
  });

  describe("when set state that length less then maxLength and more then minLength", () => {
    const value = "hello and bye";

    beforeEach(() => {
      act(() => {
        hookResult.result.current.handleChange(value);
      });
    });

    it("should state is same default state", () => {
      expect(hookResult.result.current.state).toEqual(value);
    });

    it("should error is undefined", () => {
      expect(hookResult.result.current.error).toBeUndefined();
    });
  });

  describe("when set state that length more then maxLength", () => {
    const value = "hello and bye hello and bye hello and bye";

    beforeEach(() => {
      act(() => {
        hookResult.result.current.handleChange(value);
      });
    });

    it("should error code is TOO_LONG", () => {
      expect(hookResult.result.current.error?.code).toEqual(
        ERROR_CODE.TOO_LONG,
      );
    });
  });

  describe("when set state that length less then minLength", () => {
    const value = "a";

    beforeEach(() => {
      act(() => {
        hookResult.result.current.handleChange(value);
      });
    });

    it("should error code is TOO_SHORT", () => {
      expect(hookResult.result.current.error?.code).toEqual(
        ERROR_CODE.TOO_SHORT,
      );
    });
  });

  describe("when set state that first char is space", () => {
    const value = " aa";

    beforeEach(() => {
      act(() => {
        hookResult.result.current.handleChange(value);
      });
    });

    it("should error code is START_WITH_WHITE_SPACE", () => {
      expect(hookResult.result.current.error?.code).toEqual(
        ERROR_CODE.START_WITH_WHITE_SPACE,
      );
    });
  });
});
