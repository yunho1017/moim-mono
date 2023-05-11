import { getNormalizedBatchDataFromEntities } from "../";
import { RAW } from "app/__mocks__";

jest.mock("common/api/user");
jest.mock("common/api/fileUpload");

describe("BatchService", () => {
  describe("getNormalizedBatchDataFromEntities()", () => {
    describe("when receive user data", () => {
      it("should get normalized user data", async () => {
        const data = await getNormalizedBatchDataFromEntities({
          users: [RAW.MEMBER.id],
        });
        expect(data.users?.[RAW.MEMBER.id]).toEqual({
          ...RAW.MEMBER,
          group: RAW.MEMBER.group_id,
          avatar: RAW.MEMBER.avatar_url,
        });
      });
    });

    describe("when receive file data", () => {
      it("should get normalized file data", async () => {
        const targetIds = RAW.FILE_BATCH.data.map(datum => datum.id);
        const data = await getNormalizedBatchDataFromEntities({
          files: targetIds,
        });
        expect(data.files?.[targetIds[0]]).toEqual(RAW.FILE_BATCH.data[0]);
        expect(data.files?.[targetIds[1]]).toEqual(RAW.FILE_BATCH.data[1]);
      });
    });
  });
});
