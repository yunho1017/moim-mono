import linkifyParser from "..";

describe("linkifyParser()", () => {
  describe("case of user mention", () => {
    describe("when exists one user mention", () => {
      it("should return mention + plainText objects", () => {
        const result = linkifyParser("@satune hello world");
        expect(result[0]).toHaveProperty("text", "@satune");
        expect(result[0]).toHaveProperty("type", "user_mention");
        expect(result[0]).toHaveProperty("href", "/satune");

        expect(result[1]).toHaveProperty("text", " hello world");
        expect(result[1]).toHaveProperty("type", "text");
      });
    });

    describe("when exists two user mention", () => {
      it("should return mention + plainText objects", () => {
        const result = linkifyParser("@satune hello world@vingle");
        expect(result[0]).toHaveProperty("text", "@satune");
        expect(result[0]).toHaveProperty("type", "user_mention");
        expect(result[0]).toHaveProperty("href", "/satune");

        expect(result[1]).toHaveProperty("text", " hello world");
        expect(result[1]).toHaveProperty("type", "text");

        expect(result[2]).toHaveProperty("text", "@vingle");
        expect(result[2]).toHaveProperty("type", "user_mention");
        expect(result[2]).toHaveProperty("href", "/vingle");
      });
    });
  });

  describe("case of channel mention", () => {
    describe("when exists one channel mention", () => {
      it("should return mention + plainText objects", () => {
        const result = linkifyParser("#free hello world");
        expect(result[0]).toHaveProperty("text", "#free");
        expect(result[0]).toHaveProperty("type", "channel_mention");
        expect(result[0]).toHaveProperty("href", "/free");

        expect(result[1]).toHaveProperty("text", " hello world");
        expect(result[1]).toHaveProperty("type", "text");
      });
    });

    describe("when exists two channel mention", () => {
      it("should return mention + plainText objects", () => {
        const result = linkifyParser("#free hello world#open_market");
        expect(result[0]).toHaveProperty("text", "#free");
        expect(result[0]).toHaveProperty("type", "channel_mention");
        expect(result[0]).toHaveProperty("href", "/free");

        expect(result[1]).toHaveProperty("text", " hello world");
        expect(result[1]).toHaveProperty("type", "text");

        expect(result[2]).toHaveProperty("text", "#open_market");
        expect(result[2]).toHaveProperty("type", "channel_mention");
        expect(result[2]).toHaveProperty("href", "/open_market");
      });
    });
  });

  describe("case of combination mention", () => {
    describe("when exists two channel mention", () => {
      it("should return mention + plainText objects", () => {
        const result = linkifyParser(
          "@satune Welcome to #free channel!\nQuestion to @v-master_jo and plz read #Newbie-guide",
        );
        expect(result[0]).toHaveProperty("text", "@satune");
        expect(result[0]).toHaveProperty("type", "user_mention");
        expect(result[0]).toHaveProperty("href", "/satune");

        expect(result[1]).toHaveProperty("text", " Welcome to ");
        expect(result[1]).toHaveProperty("type", "text");

        expect(result[2]).toHaveProperty("text", "#free");
        expect(result[2]).toHaveProperty("type", "channel_mention");
        expect(result[2]).toHaveProperty("href", "/free");

        expect(result[3]).toHaveProperty("text", " channel!\nQuestion to ");
        expect(result[3]).toHaveProperty("type", "text");

        expect(result[4]).toHaveProperty("text", "@v-master_jo");
        expect(result[4]).toHaveProperty("type", "user_mention");
        expect(result[4]).toHaveProperty("href", "/v-master_jo");

        expect(result[5]).toHaveProperty("text", " and plz read ");
        expect(result[5]).toHaveProperty("type", "text");

        expect(result[6]).toHaveProperty("text", "#Newbie-guide");
        expect(result[6]).toHaveProperty("type", "channel_mention");
        expect(result[6]).toHaveProperty("href", "/Newbie-guide");
      });
    });
  });
});
