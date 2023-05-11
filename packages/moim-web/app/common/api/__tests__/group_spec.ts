jest.mock("common/api/base");
// vendor
import nock from "nock";
import axios from "axios";
// api
import GroupAPI from "common/api/group";
import { MoimAPI } from "common/api";
// mock
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("Group API ", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;

  const api: GroupAPI = new GroupAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("renameMoim()", () => {
    const id = "G1234";

    it("should get moim Entity", async () => {
      scope = nock(getApiDomain())
        .put(`/groups/${id}/name`)
        .reply(200, () => ({
          data: RAW.GROUP,
        }));

      const { data } = await api.renameMoim(
        {
          id,
          name: "Hello",
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.GROUP);
    });
  });

  describe("setMoimDescription()", () => {
    const id = "G1234";

    it("should get moim Entity", async () => {
      scope = nock(getApiDomain())
        .put(`/groups/${id}/description`)
        .reply(200, () => ({
          data: RAW.GROUP,
        }));

      const { data } = await api.setMoimDescription(
        {
          id,
          description: "Hello",
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.GROUP);
    });
  });

  describe("changeIconSize()", () => {
    const groupId = "G1234";
    const iconId = "I1234";

    beforeEach(() => {
      scope = nock(getApiDomain())
        .put(`/groups/icon/${groupId}`)
        .reply(200, () => ({
          data: iconId,
        }));
    });

    it("should get icon id", async () => {
      const { data } = await api.changeIconSize({
        id: groupId,
        extract: {
          top: 10,
          left: 10,
          size: 120,
        },
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(iconId);
    });
  });

  describe("putGroupIcon()", () => {
    const groupId = "G1234";

    beforeEach(() => {
      scope = nock(getApiDomain())
        .put(`/groups/${groupId}/icon`)
        .reply(200, () => ({
          data: RAW.GROUP,
        }));
    });

    it("should get moim Entity", async () => {
      const { data } = await api.putGroupIcon({
        groupId,
        group: {
          icon: {
            type: "image",
            data: {
              id: "I1234",
            },
          },
        },
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.GROUP);
    });
  });

  describe("getGroupTheme()", () => {
    const groupId = "G1234";

    beforeEach(() => {
      scope = nock(getApiDomain())
        .get(`/v2/groups/${groupId}/theme`)
        .reply(200, () => ({
          data: RAW.GROUP_THEME,
        }));
    });

    it("should get group theme", async () => {
      const { data } = await api.getGroupTheme({
        groupId,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.GROUP_THEME);
    });
  });

  describe("updateGroupTheme()", () => {
    const groupId = "G1234";

    beforeEach(() => {
      scope = nock(getApiDomain())
        .put(`/groups/${groupId}/theme`)
        .reply(200, () => ({
          data: RAW.GROUP_THEME,
        }));
    });

    it("should get group theme", async () => {
      const { data } = await api.updateGroupTheme({
        groupId,
        theme: {
          element: RAW.GROUP_THEME.element!,
          palette: RAW.GROUP_THEME.palette!,
        },
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.GROUP_THEME);
    });
  });

  describe("createGroupThemeLogoUploadSession()", () => {
    const groupId = "G1234";

    beforeEach(() => {
      scope = nock(getApiDomain())
        .post(`/groups/${groupId}/theme/logo`)
        .reply(200, () => ({
          data: RAW.FILE_UPLOAD_QUEUE,
        }));
    });

    it("should get group theme", async () => {
      const { data } = await api.createGroupThemeLogoUploadSession({
        groupId,
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.FILE_UPLOAD_QUEUE);
    });
  });

  describe("updateGroupThemeLogo()", () => {
    const groupId = "G1234";

    beforeEach(() => {
      scope = nock(getApiDomain())
        .put(`/groups/${groupId}/theme/logo`)
        .reply(200, () => ({
          data: RAW.GROUP_THEME,
        }));
    });

    it("should get group theme", async () => {
      const { data } = await api.updateGroupThemeLogo({
        groupId,
        theme: {
          logo: RAW.GROUP_THEME.logo!,
        },
      });

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.GROUP_THEME);
    });
  });

  describe("getMoimCover()", () => {
    beforeEach(() => {
      scope = nock(getApiDomain())
        .get(`/groups/testGId/cover`)
        .reply(200, () => ({
          data: RAW.MOIM_COVER,
        }));
    });

    it("should get moim cover", async () => {
      const { data } = await api.getMoimCover();

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.MOIM_COVER);
    });
  });

  describe("getJoinedSubMoims()", () => {
    const id = "testGId";

    it("should get moim list", async () => {
      scope = nock(getApiDomain())
        .get(`/groups/${id}/joined`)
        .reply(200, () => ({
          data: [RAW.GROUP],
          paging: {},
        }));

      const data = await api.getJoinedSubMoims({}, cancelToken);

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual({ data: [RAW.GROUP], paging: {} });
    });
  });

  describe("createTagSet()", () => {
    const id = "testGId";
    const newTagSetName = "19dke";

    it("should create new tagSet", async () => {
      scope = nock(getApiDomain())
        .post(`/groups/${id}/tag_sets`, {
          tagSet: {
            set: newTagSetName,
          },
        })
        .reply(200, () => ({
          data: {
            ...RAW.TAG_SET.data[0],
            set: newTagSetName,
          },
        }));

      const data = await api.createTagSet({ set: newTagSetName }, cancelToken);

      expect(scope.isDone()).toBeTruthy();
      expect(data.data.set).toBe(newTagSetName);
    });
  });

  describe("deleteTagSet()", () => {
    const id = "testGId";
    const targetTagSetId = "19dke";

    it("should delete target tagSet", async () => {
      scope = nock(getApiDomain())
        .delete(`/groups/${id}/tag_sets/${targetTagSetId}`)
        .reply(200, () => ({
          success: true,
        }));

      const data = await api.deleteTagSet(targetTagSetId, cancelToken);

      expect(scope.isDone()).toBeTruthy();
      expect(data.success).toBeTruthy();
    });
  });

  describe("putTagSet()", () => {
    const id = "testGId";
    const targetTagSetId = "19dke";
    const updateTagSetName = "Label01";

    it("should update target tagSet", async () => {
      scope = nock(getApiDomain())
        .put(`/groups/${id}/tag_sets/${targetTagSetId}`, {
          tagSet: {
            set: updateTagSetName,
          },
        })
        .reply(200, () => ({
          data: {
            ...RAW.TAG_SET.data[0],
            set: updateTagSetName,
          },
        }));

      const data = await api.putTagSet(
        targetTagSetId,
        { set: updateTagSetName },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data.data.set).toBe(updateTagSetName);
    });
  });

  describe("getTagSet()", () => {
    const id = "testGId";

    it("should fetch all tagSets", async () => {
      scope = nock(getApiDomain())
        .get(`/groups/${id}/tag_sets`)
        .reply(200, () => RAW.TAG_SET);

      const data = await api.getTagSet(cancelToken);

      expect(scope.isDone()).toBeTruthy();
      expect(data.data).toHaveLength(RAW.TAG_SET.data.length);
    });
  });
});
