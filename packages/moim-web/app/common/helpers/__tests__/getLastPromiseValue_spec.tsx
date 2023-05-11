import getLastPromiseValue from "common/helpers/getLastPromiseValue";

describe("getLastPromiseValue()", () => {
  describe("when inject return promise function list", () => {
    it("should return last promise value", async () => {
      const firstPromiseFunc = async () => Promise.resolve(1);
      const secondPromiseFunc = async () => Promise.resolve(2);
      const thirdPromiseFunc = async () => Promise.resolve(3);

      const thirdValue = await getLastPromiseValue([
        firstPromiseFunc,
        secondPromiseFunc,
        thirdPromiseFunc,
      ]);

      expect(thirdValue).toEqual(3);
    });
  });

  describe("when inject empty list", () => {
    it("should return undefined", async () => {
      expect(await getLastPromiseValue([])).toBeUndefined();
    });
  });

  describe("when inject promise is reject", () => {
    it("should throw exception", async () => {
      const throwPromiseFunc = async () => Promise.reject(new Error("throw"));

      await expect(
        (async () => {
          await getLastPromiseValue([throwPromiseFunc]);
        })(),
      ).rejects.toThrowError();
    });
  });
});
