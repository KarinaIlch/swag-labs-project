import LoginPage from "../pageObjects/LoginPage.js";
import InventoryPage from "../pageObjects/InventoryPage.js";

describe("Logout functionality", () => {
  beforeEach(async () => {
    await browser.url(process.env.BASE_URL);

    await LoginPage.login(process.env.USERNAME, process.env.PASSWORD);
  });

  it("should logout user after clicking Logout button from burger menu", async () => {
    await InventoryPage.openBurgerMenu();

    await expect(InventoryPage.menuItems).toBeElementsArrayOfSize(4);

    await InventoryPage.logout();

    await expect(browser).toHaveUrl(expect.stringContaining("saucedemo.com"));

    await LoginPage.inputUsername.waitForDisplayed({
      timeout: 5000,
    });

    await LoginPage.inputPassword.waitForDisplayed({
      timeout: 5000,
    });

    await expect(LoginPage.inputUsername).toBeDisplayed();

    await expect(LoginPage.inputPassword).toBeDisplayed();

    await expect(LoginPage.inputUsername).toHaveValue("");

    await expect(LoginPage.inputPassword).toHaveValue("");
  });
});
