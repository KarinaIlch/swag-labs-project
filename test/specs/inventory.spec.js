import LoginPage from "../pageObjects/LoginPage";
import InventoryPage from "../pageObjects/InventoryPage";
import ProductsPage from "../pageObjects/ProductsPage";

describe("Inventory page", () => {
  before(async () => {
    await browser.url(process.env.BASE_URL);

    await LoginPage.login(process.env.USERNAME, process.env.PASSWORD);
  });

  it("should open empty shopping cart page when the shopping cart button is clicked", async () => {
    await ProductsPage.clickShoppingCartBtn();

    await expect(browser).toHaveUrl(expect.stringContaining("/cart.html"));
    await expect(InventoryPage.title).toHaveText("Your Cart");
    await expect(InventoryPage.cartItems).toBeElementsArrayOfSize(0);
  });

  it("should open checkout information page when checkout button is clicked", async () => {
    await ProductsPage.clickShoppingCartBtn();
    await InventoryPage.clickCheckoutBtn();

    await expect(browser).toHaveUrl(
      expect.stringContaining("/checkout-step-one.html"),
    );
    await expect(InventoryPage.title).toHaveText("Checkout: Your Information");
  });

  it("should display error message when continue button is clicked with empty checkout fields", async () => {
    await ProductsPage.clickShoppingCartBtn();
    await InventoryPage.clickCheckoutBtn();
    await InventoryPage.clickContinueBtn();

    await expect(InventoryPage.errorMessage).toBeDisplayed();
    await expect(InventoryPage.errorMessage).toHaveText(
      "Error: First Name is required",
    );
  });
});
