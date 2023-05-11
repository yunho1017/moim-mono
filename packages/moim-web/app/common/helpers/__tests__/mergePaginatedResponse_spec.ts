import mergePaginatedResponse from "../mergePaginatedResponse";

describe("mergePaginatedResponse", () => {
  describe("when before object is undefined", () => {
    it("should after object be returned", () => {
      expect(
        mergePaginatedResponse(undefined, {
          data: [1, 2, 3],
          paging: {
            after: "1234",
          },
        }),
      ).toEqual({
        data: [1, 2, 3],
        paging: {
          after: "1234",
        },
      });
    });
  });

  describe("when before object is enable", () => {
    it("should before & after data object be merged", () => {
      expect(
        mergePaginatedResponse(
          {
            data: [1, 2, 3],
            paging: {
              after: "1234",
            },
          },
          {
            data: [4, 5, 6],
            paging: {
              after: "5678",
            },
          },
        ),
      ).toEqual({
        data: [1, 2, 3, 4, 5, 6],
        paging: {
          after: "5678",
        },
      });
    });
  });

  describe("when after object paging is empty", () => {
    it("should resolved object paging is be empty", () => {
      expect(
        mergePaginatedResponse(
          {
            data: [1, 2, 3],
            paging: {
              after: "1234",
            },
          },
          {
            data: [4, 5, 6],
            paging: {},
          },
        ),
      ).toEqual({
        data: [1, 2, 3, 4, 5, 6],
        paging: {},
      });
    });
  });
  describe("when after object data is empty", () => {
    it("should resolved object paging is be empty", () => {
      expect(
        mergePaginatedResponse(
          {
            data: [1, 2, 3],
            paging: {
              after: "1234",
            },
          },
          {
            data: [],
            paging: {},
          },
        ),
      ).toEqual({
        data: [1, 2, 3],
        paging: {},
      });
    });
  });
});
