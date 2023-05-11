import webdriver from "selenium-webdriver";
import { browserstackURL, capabilities } from "../config";
jest.setTimeout(300000);

const driver = new webdriver.Builder()
  .usingServer(browserstackURL)
  .withCapabilities({
    ...capabilities,
  })
  .build();

describe("Scenarios Ex1", () => {
  afterAll(() => {
    driver.quit();
  });

  it("should test", async () => {
    await driver.get("http://www.google.com");
    await driver
      .findElement(webdriver.By.name("q"))
      .sendKeys("BrowserStack Hello world!!");
    const title = await driver.getTitle();
    expect(title).not.toBeNull();
  });
});
