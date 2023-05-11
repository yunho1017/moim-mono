const { Server } = require("miragejs");
import { RAW } from "app/__mocks__";
import { getStagingDomainFromDevelopment } from "common/helpers/domainMaker";

export default function initializeMockServer() {
  const moimUrl = getStagingDomainFromDevelopment();
  return new Server({
    environment: "development",
    routes() {
      this.namespace = `${moimUrl}`;

      this.post(`${moimUrl}/api/users/batch`, (_schema: any, request: any) => {
        const parsedBody: { users: string[] } = JSON.parse(request.requestBody);
        return {
          data: parsedBody.users.map(userId => ({
            ...RAW.MEMBER,
            user_id: userId,
            name: `fname${userId}`,
          })),
          paging: {},
        };
      });

      this.passthrough(`${moimUrl}/api/**`);
      this.passthrough("https://accounts.cryptobadge.app/**");
      this.passthrough("https://firebaseinstallations.googleapis.com/**");
      this.passthrough("https://firebaseremoteconfig.googleapis.com/**");
      this.passthrough("https://files.vingle.network/files/**");
      this.passthrough(
        "https://vgroup-files-stage.s3-accelerate.amazonaws.com/",
      );
    },
  });
}
