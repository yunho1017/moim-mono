import { postMessageParser } from "../helper";
import {
  POST_MESSAGE_TYPE,
  POST_MESSAGE_SOURCE,
} from "app/common/constants/default";

const MOCK_MESSAGE_PROP: MessageEvent = new MessageEvent("message");
const MOCK_MESSAGE_DATA = JSON.stringify({
  type: POST_MESSAGE_TYPE.CRYPTO_SIGN_IN_DONE,
  data: {
    accessToken: "accessToken",
    redirectTo: "/",
    refreshToken: "refreshToken",
  },
});

describe("PostMessageReceiver helper", () => {
  let message: MessageEvent;
  describe("postMessageParser()", () => {
    describe("when receive message from invalid origin", () => {
      beforeAll(() => {
        message = {
          ...MOCK_MESSAGE_PROP,
          origin: "https://venom.com",
        };
      });
      it("should return empty json object", () => {
        expect(postMessageParser(message)).toBeNull();
      });
    });

    describe("when receive message from valid origin", () => {
      beforeAll(() => {
        message = {
          ...MOCK_MESSAGE_PROP,
          origin: "https://vingle.network",
          data: JSON.stringify({
            source: POST_MESSAGE_SOURCE,
            payload: MOCK_MESSAGE_DATA,
          }),
        };
      });
      it("should return json object", () => {
        expect(postMessageParser(message)).toEqual(MOCK_MESSAGE_DATA);
      });
    });
  });
});
