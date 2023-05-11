import buffer from "../index";

describe("buffer helper", () => {
  const testBuffer = buffer({
    ms: 100,
    subscribedFn(values: string[]) {
      return Promise.resolve(values.join("__"));
    },
  });

  it("buffer subscribed value is equal", async () => {
    const value = await Promise.all([testBuffer("A"), testBuffer("B")]);
    expect(value).toEqual(["A__B", "A__B"]);
  });

  it("buffer clean up when subscribed is done", async () => {
    const value = await Promise.all([testBuffer("A"), testBuffer("B")]);
    expect(value).toEqual(["A__B", "A__B"]);
    const value2 = await Promise.all([testBuffer("C"), testBuffer("D")]);
    expect(value2).toEqual(["C__D", "C__D"]);
  });
});
