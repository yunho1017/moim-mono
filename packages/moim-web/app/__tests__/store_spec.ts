import { AppDispatch, createAppStore, ThunkResult } from "../store";
import { createMemoryHistory } from "history";

describe("redux store test", () => {
  let store: ReturnType<typeof createAppStore>;
  beforeEach(() => {
    store = createAppStore(createMemoryHistory());
  });
  it("should create store object", () => {
    expect(store).toBeTruthy();
  });
  it("should have extraArguments", () => {
    function fakeAction(): ThunkResult {
      return (_dispatch, _getState, extraArgument) => {
        expect(extraArgument).toHaveProperty("defaultApi");
      };
    }
    (store.dispatch as AppDispatch)(fakeAction());
  });
});
