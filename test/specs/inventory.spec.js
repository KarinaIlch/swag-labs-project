import LoginPage from "../pageObjects/LoginPage.js";
import InventoryPage from "../pageObjects/InventoryPage.js";

describe("Inventory page", () => {
  beforeEach(async () => {
    await browser.url(process.env.BASE_URL);

    await LoginPage.login(process.env.USERNAME, process.env.PASSWORD);
  });

  xit("should open empty shopping cart page when the shopping cart button is clicked", async () => {
    await InventoryPage.clickShoppingCartBtn();

    await expect(browser).toHaveUrl(expect.stringContaining("/cart.html"));
    await expect(InventoryPage.title).toHaveText("Your Cart");
    await expect(InventoryPage.cartItems).toBeElementsArrayOfSize(0);
  });

  xit("should open checkout information page when checkout button is clicked", async () => {
    await InventoryPage.clickShoppingCartBtn();
    await InventoryPage.clickCheckoutBtn();

    await expect(browser).toHaveUrl(
      expect.stringContaining("/checkout-step-one.html"),
    );
    await expect(InventoryPage.title).toHaveText("Checkout: Your Information");
  });

  xit("should display error message when continue button is clicked with empty checkout fields", async () => {
    await InventoryPage.clickShoppingCartBtn();
    await InventoryPage.clickCheckoutBtn();
    await InventoryPage.clickContinueBtn();

    await expect(InventoryPage.errorMessage).toBeDisplayed();
    await expect(InventoryPage.errorMessage).toHaveText(
      "Error: First Name is required",
    );
  });
});
