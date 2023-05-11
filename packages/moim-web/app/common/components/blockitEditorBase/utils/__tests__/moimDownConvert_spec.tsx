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
              '안녕하세요 <attr fc="#aaffaa">Hello~~</attr><attr fs="body2">description </attr><attr fs="body2" fw="700" fc="blue">here</attr>',
          },
        ],
        onFileRetry: MOCK_FILE_RETRY,
        onFileDelete: MOCK_FILE_DELETE,
        onImageFileDelete: MOCK_FILE_DELETE,
      });
      console.log(">>>>>>>>> RESULT:", JSON.stringify(r, null, 2));
    });
  });
});
