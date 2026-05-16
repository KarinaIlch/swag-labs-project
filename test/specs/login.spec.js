import LoginPage from "../pageObjects/LoginPage";
import { users } from "../testData/users.js";

describe("Login page", () => {
  users.forEach((user) => {
    it(`should login with ${user.username}`, async () => {
      await browser.url("https://www.saucedemo.com");

      await LoginPage.login(user.username, user.password);

      await expect(browser).toHaveUrl(
        expect.stringContaining("/inventory.html"),
      );

      await expect($(".title")).toHaveText("Products");
    });
  });
});
