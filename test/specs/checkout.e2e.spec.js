import LoginPage from "../pageObjects/LoginPage";
import ProductsPage from "../pageObjects/ProductsPage";
import CartPage from "../pageObjects/InventoryPage";
import CheckoutPage from "../pageObjects/CheckoutPage";

describe("Checkout E2E flow", () => {
  before(async () => {
    await browser.url(process.env.BASE_URL);

    await LoginPage.login(process.env.USERNAME, process.env.PASSWORD);
  });

  it("should complete checkout successfully with valid data", async () => {
    await ProductsPage.addFirstProductToCart();

    await expect(ProductsPage.shoppingCartBadge).toHaveText("1");

    await ProductsPage.clickShoppingCartBtn();

    await expect(browser).toHaveUrl(expect.stringContaining("/cart.html"));
    await expect(CartPage.title).toHaveText("Your Cart");
    await expect(CartPage.cartItems).toBeElementsArrayOfSize(1);

    await CartPage.clickCheckoutBtn();

    await expect(browser).toHaveUrl(
      expect.stringContaining("/checkout-step-one.html"),
    );

    await CheckoutPage.fillCheckoutForm("James", "Dark", "24356");

    await CheckoutPage.clickContinueBtn();

    await expect(browser).toHaveUrl(
      expect.stringContaining("/checkout-step-two.html"),
    );

    await expect(CheckoutPage.totalPriceLabel).toBeDisplayed();

    await CheckoutPage.clickFinishBtn();

    await expect(browser).toHaveUrl(
      expect.stringContaining("/checkout-complete.html"),
    );

    await expect(CheckoutPage.completeHeader).toHaveText(
      "Thank you for your order!",
    );

    await CheckoutPage.clickBackHomeBtn();

    await expect(browser).toHaveUrl(expect.stringContaining("/inventory.html"));

    await expect(ProductsPage.shoppingCartBadge).not.toBeDisplayed();
  });
});
