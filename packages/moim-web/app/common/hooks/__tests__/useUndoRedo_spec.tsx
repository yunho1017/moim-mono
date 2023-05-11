import {
  renderHook,
  act,
  RenderHookResult,
} from "@testing-library/react-hooks";
import useUndoRedo from "app/common/hooks/useUndoRedo";

describe("useUndoRedo()", () => {
  let hookResult: RenderHookResult<string, ReturnType<typeof useUndoRedo>>;

  beforeAll(() => {
    hookResult = renderHook(() => useUndoRedo<string>("hello"));
  });

  it("should set first value", () => {
    const [value] = hookResult.result.current;
    expect(value).toBe("hello");
  });

  describe("when add new history", () => {
    it("should add new value", async () => {
      const [, setValue] = hookResult.result.current;

      act(() => {
        setValue("bye");
      });

      const [value] = hookResult.result.current;
      expect(value).toBe("bye");
    });
  });

  describe("when clicked undo", () => {
    it("should render previous value", () => {
      const [, , undo] = hookResult.result.current;

      act(() => {
        undo();
      });

      const [value] = hookResult.result.current;
      expect(value).toBe("hello");
    });
  });

  describe("when clicked redo", () => {
    it("should render next value", () => {
      const [, , , redo] = hookResult.result.current;

      act(() => {
        redo();
      });

      const [value] = hookResult.result.current;
      expect(value).toBe("bye");
    });
  });
});
