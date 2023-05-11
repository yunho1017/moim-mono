import {
  renderHook,
  RenderHookResult,
  act,
} from "@testing-library/react-hooks";
import useStateWithError from "../useStateWithError";

const mockValidator = (str: string) => {
  return str === "hello"
    ? true
    : {
        code: "STR_IS_NOT_A_HELLO",
        msg: "str is only allow hello",
      };
};

const DEFAULT_VALUE = "hello";

describe("useStateWithError hook", () => {
  let hookResult: RenderHookResult<null, ReturnType<typeof useStateWithError>>;

  beforeAll(() => {
    hookResult = renderHook(() =>
      useStateWithError(DEFAULT_VALUE, mockValidator),
    );
  });

  describe("when initial render hook", () => {
    it("should set state to same default state", () => {
      expect(hookResult.result.current.state).toEqual(DEFAULT_VALUE);
    });

    it("should error is undefined", () => {
      expect(hookResult.result.current.error).toBeUndefined();
    });
  });

  describe("when validation result is fail", () => {
    beforeEach(() => {
      act(() => {
        hookResult.result.current.setState("bye");
      });
    });

    it("should set error state", () => {
      const { error } = hookResult.result.current;

      expect(error).toHaveProperty("code");
    });

    it("should state is same to default state", () => {
      const { state } = hookResult.result.current;

      expect(state).toEqual(DEFAULT_VALUE);
    });
  });

  describe("when invalidateNotSet flag is false", () => {
    beforeAll(() => {
      hookResult = renderHook(() =>
        useStateWithError(DEFAULT_VALUE, mockValidator, {
          invalidateNotSet: false,
        }),
      );
    });

    describe("when validation result is fail", () => {
      const newValue = "bye";

      beforeAll(() => {
        act(() => {
          hookResult.result.current.setState(newValue);
        });
      });

      it("should set error state", () => {
        const { error } = hookResult.result.current;

        expect(error).toHaveProperty("code");
      });

      it("should state is changed to new value", () => {
        const { state } = hookResult.result.current;

        expect(state).toEqual(newValue);
      });
    });
  });
});
