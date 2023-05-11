import moimDownConvert from "../moimDownConvert";
import { initialState as appInitialState } from "app/rootReducer";

const MOCK_FILE_RETRY = jest.fn();
const MOCK_FILE_DELETE = jest.fn();

describe.skip("MoimDownCovert Spec", () => {
  describe("WIP 1", () => {
    it("T-1", () => {
      const r = moimDownConvert({
        id: "edit1",
        userEntities: appInitialState.entities.users,
        contents: [
          {
            type: "text",
            content:
              "<https://vingle.net|https://vingle.net|true> <- 툴박스:링크 기능을 통해서 추가",
          },
          {
            type: "text",
            content:
              "<https://moim.co|https://moim.co|true> <- 직접 타이핑해서 추가",
          },
          {
            type: "text",
            content: "",
          },
          {
            type: "text",
            content:
              "#저스틴님이 저번 주에 리폿 해주신 내용 재확인 및 내용 추가.",
          },
        ],
        onFileRetry: MOCK_FILE_RETRY,
        onFileDelete: MOCK_FILE_DELETE,
        onImageFileDelete: MOCK_FILE_DELETE,
      });
      console.log(">>>>>>>>> RESULT:", r);
    });
  });
});
