import axios from "axios";
import { generateMockStore, IThunkMockState } from "app/__mocks__/mockStore";
import { getProfile, ActionCreators } from "../profile";
import { EntityTypes } from "app/actions/types";

describe.skip("Profile action", () => {
  let store: IThunkMockState;
  const cancelToken = axios.CancelToken.source().token;

  beforeEach(() => {
    store = generateMockStore();
    store.clearActions();
  });

  describe("getProfile()", () => {
    describe("when succeeded", () => {
      it("should return START, ADD_ENTITY, SUCCEED", async () => {
        store.dispatch(getProfile({ userId: "U1234", cancelToken })); // TODO: currently it's not promiseable should change
        const [
          startAction,
          addEntityAction,
          succeedAction,
        ] = store.getActions();

        expect(startAction).toEqual(ActionCreators.startFetchingProfile());
        expect(addEntityAction).toEqual({
          type: EntityTypes.ADD_ENTITY,
        });
        expect(succeedAction).toEqual(
          ActionCreators.succeedFetchingProfile("U1234"),
        );
      });
    });
  });
});
