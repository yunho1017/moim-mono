import * as History from "history";
import { AppTypes, AuthTypes } from "../types";
import { generateMockStore, IThunkMockState } from "app/__mocks__/mockStore";
import { initializeHistory } from "../app";
import popupWindow from "common/helpers/popupWindow";
import { CRYPTOBADGE_WINDOW_SIZE } from "common/constants/authentication";
import { getAuthentication } from "common/helpers/authentication/actions";
import { TEST_GROUP_ID } from "app/modules/settingMoim/constants";

jest.mock("common/api/group");
jest.mock("common/helpers/popupWindowClass");
jest.mock(
  "common/helpers/authentication/handlers/moim",
  () => (_options: any, _authClient: any, callback: (data: any) => void) => {
    callback({ access_token: "MOCK_ACCESS_TOKEN" });
  },
);
jest.mock("app/common/helpers/selectHubMoimId", () => () => "mockId");

describe("App actions", () => {
  let store: IThunkMockState;

  beforeEach(() => {
    store = generateMockStore({
      app: { currentHubGroupId: TEST_GROUP_ID } as any,
    });
    store.clearActions();
  });

  describe("getAuthentication action called", () => {
    describe("when provider is cryptobadge", () => {
      it("should call payload with cryptobadge", async () => {
        await store.dispatch(
          getAuthentication({
            provider: "cryptobadge",
            authClient: popupWindow(CRYPTOBADGE_WINDOW_SIZE),
          }),
        );
        const [startGetAuthentication, startLogin] = store.getActions();
        expect(startGetAuthentication).toEqual({
          type: AuthTypes.START_GET_AUTHENTICATION,
          payload: {
            provider: "cryptobadge",
          },
        });

        expect(startLogin).toEqual({
          type: AuthTypes.START_LOGGING_IN,
        });
      });
    });
  });

  describe("initializeHistory action called", () => {
    const history = History.createMemoryHistory<any>({
      initialEntries: ["/", "/a", "/", "/b", "/c", "/d", "/", "/e"],
      initialIndex: 7,
    });
    const listenMock = jest.spyOn(history, "listen");
    it("should call AppTypes.INITIALIZE_HISTORY", () => {
      store.dispatch(initializeHistory(history));
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toEqual({
        type: AppTypes.INITIALIZE_HISTORY,
        payload: {
          size: 8,
        },
      });
      expect(actions[1]).toHaveProperty(
        ["payload", "location", "pathname"],
        "/e",
      );
      expect(actions[1]).toHaveProperty(
        ["payload", "location", "state", "index"],
        7,
      );
      expect(listenMock).toHaveBeenCalled();
    });
  });
});
