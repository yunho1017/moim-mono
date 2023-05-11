const USERNAME = "vingle1";
const AUTOMATE_KEY = "gNuz587zrXSQ3SS84MbX";
export const browserstackURL = `https://${USERNAME}:${AUTOMATE_KEY}@hub-cloud.browserstack.com/wd/hub`;

export const capabilities = {
  os: "Windows",
  os_version: "10",
  browserName: "Chrome",
  browser_version: "80",
  name: "MoimWeb E2E test",
};
