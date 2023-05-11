import { CryptobadgeClient } from "@vingle/cryptobadge-sdk";
import { getCryptoBadgeAPIDomain } from "./domainMaker";

const CryptoBadgeClient = new CryptobadgeClient({
  url: getCryptoBadgeAPIDomain(),
  accessToken: "58qxzRGlNre0SgV76LRGNZ4FjO1T",
  authorizationKey: "lCY/MgfbG/xaghiJHuMtW8cypgSVBHfZlyMOFwlBmzo=",
});

export default CryptoBadgeClient;
