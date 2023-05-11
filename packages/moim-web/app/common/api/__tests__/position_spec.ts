jest.mock("common/api/base");
import nock from "nock";
import axios from "axios";
import PositionAPI from "common/api/position";
import { MoimAPI } from "common/api";
import { RAW } from "app/__mocks__";
import { getApiDomain } from "common/helpers/domainMaker";

describe("Position API", () => {
  let scope: nock.Scope;
  const cancelToken = axios.CancelToken.source().token;

  const api: PositionAPI = new PositionAPI(new MoimAPI());

  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("getPositions()", () => {
    it("should get paginated position list data", async () => {
      scope = nock(getApiDomain())
        .get("/groups/testGId/positions")
        .query({
          limit: 30,
          after: "A1234",
        })
        .reply(200, () => ({
          data: [RAW.NORMALIZED_POSITION, RAW.NORMALIZED_POSITION],
          paging: {
            after: null,
            before: null,
          },
        }));

      const { paging, data } = await api.getPositions(
        {
          limit: 30,
          after: "A1234",
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(2);
      expect(paging.before).toBeNull();
      expect(paging.after).toBeNull();
    });
  });

  describe("getPosition()", () => {
    it("should get position data", async () => {
      scope = nock(getApiDomain())
        .get(`/positions/${RAW.NORMALIZED_POSITION.id}`)
        .reply(200, () => ({
          data: RAW.NORMALIZED_POSITION,
        }));

      const { data } = await api.getPosition(
        {
          positionId: RAW.NORMALIZED_POSITION.id,
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.NORMALIZED_POSITION);
    });
  });

  describe("getPositionsBatch()", () => {
    it("should get paginated position list data", async () => {
      scope = nock(getApiDomain())
        .post("/positions/_batch")
        .reply(200, () => ({
          data: [RAW.NORMALIZED_POSITION, RAW.NORMALIZED_POSITION],
          paging: {
            after: null,
            before: null,
          },
        }));

      const { paging, data } = await api.getPositionsBatch(
        {
          positions: ["P1234", "P5678"],
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(2);
      expect(paging.before).toBeNull();
      expect(paging.after).toBeNull();
    });
  });

  describe("createPosition()", () => {
    it("should get position data", async () => {
      scope = nock(getApiDomain())
        .post("/groups/testGId/positions")
        .reply(200, () => ({
          data: RAW.NORMALIZED_POSITION,
        }));

      const { data } = await api.createPosition(
        {
          position: {
            name: "Position",
            color: "#FF7100",
            description: "Test Position",
            priority: 10,
          },
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.NORMALIZED_POSITION);
    });
  });

  describe("appointPosition()", () => {
    it("should get position data", async () => {
      scope = nock(getApiDomain())
        .post(`/positions/${RAW.NORMALIZED_POSITION.id}/appoint`)
        .reply(200, () => ({
          data: RAW.NORMALIZED_POSITION,
        }));

      const { data } = await api.appointPosition(
        {
          positionId: RAW.NORMALIZED_POSITION.id,
          appoint: {
            users: ["U123", "U1234"],
          },
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.NORMALIZED_POSITION);
    });
  });

  describe("appointPosition()", () => {
    it("should get position data", async () => {
      scope = nock(getApiDomain())
        .post(`/positions/${RAW.NORMALIZED_POSITION.id}/approve`)
        .reply(200, () => ({
          data: RAW.NORMALIZED_POSITION,
        }));

      const { data } = await api.approvePosition(
        {
          positionId: RAW.NORMALIZED_POSITION.id,
          approve: {
            users: ["U123", "U1234"],
          },
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.NORMALIZED_POSITION);
    });
  });

  describe("dismissPosition()", () => {
    it("should get position data", async () => {
      scope = nock(getApiDomain())
        .post(`/positions/${RAW.NORMALIZED_POSITION.id}/dismiss`)
        .reply(200, () => ({
          data: RAW.NORMALIZED_POSITION,
        }));

      const { data } = await api.dismissPosition(
        {
          positionId: RAW.NORMALIZED_POSITION.id,
          dismiss: {
            users: ["U123", "U1234"],
          },
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.NORMALIZED_POSITION);
    });
  });

  describe("updatePositionInfo()", () => {
    it("should get position data", async () => {
      scope = nock(getApiDomain())
        .put(`/positions/${RAW.NORMALIZED_POSITION.id}`)
        .reply(200, () => ({
          data: RAW.NORMALIZED_POSITION,
        }));

      const { data } = await api.updatePositionInfo(
        {
          positionId: RAW.NORMALIZED_POSITION.id,
          position: {
            name: "POSITION2",
            description: "It's POSITION2",
            color: "#FF9999",
          },
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.NORMALIZED_POSITION);
    });
  });

  describe("updatePositionPriority()", () => {
    it("should get position data", async () => {
      scope = nock(getApiDomain())
        .put(`/positions/${RAW.NORMALIZED_POSITION.id}/priority`)
        .reply(200, () => ({
          data: RAW.NORMALIZED_POSITION,
        }));

      const { data } = await api.updatePositionPriority(
        {
          positionId: RAW.NORMALIZED_POSITION.id,
          change: {
            priority: 10,
          },
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data).toEqual(RAW.NORMALIZED_POSITION);
    });
  });

  describe("deletePosition()", () => {
    it("should get position data", async () => {
      scope = nock(getApiDomain())
        .delete(`/positions/${RAW.NORMALIZED_POSITION.id}`)
        .reply(200, () => ({
          data: {
            success: true,
          },
        }));

      const { data } = await api.deletePosition(
        {
          positionId: RAW.NORMALIZED_POSITION.id,
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data.success).toBeTruthy();
    });
  });

  describe("getPositionMembers()", () => {
    it("should get paginated position list data", async () => {
      scope = nock(getApiDomain())
        .get(`/positions/${RAW.NORMALIZED_POSITION.id}/members`)
        .query({
          limit: 20,
          after: "A1234",
        })
        .reply(200, () => ({
          data: [RAW.MEMBER, RAW.MEMBER],
          paging: {
            before: null,
            after: null,
          },
        }));

      const { data, paging } = await api.getPositionMembers(
        {
          positionId: RAW.NORMALIZED_POSITION.id,
          limit: 20,
          after: "A1234",
        },
        cancelToken,
      );

      expect(scope.isDone()).toBeTruthy();
      expect(data.length).toEqual(2);
      expect(paging.before).toBeNull();
      expect(paging.after).toBeNull();
    });
  });
});
