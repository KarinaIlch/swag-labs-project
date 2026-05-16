import LoginPage from "../pageObjects/loginPage";
import ProductsPage from "../pageObjects/productsPage";
import InventoryPage from "../pageObjects/inventoryPage";

describe("End-to-end test", () => {
  before(async () => {
    await browser.url(process.env.BASE_URL);

    await LoginPage.login(process.env.USERNAME, process.env.PASSWORD);
  });

  it("should keep added product in cart after logout and login again", async () => {
    await ProductsPage.addFirstProductToCart();

    await expect(ProductsPage.shoppingCartBadge).toHaveText("1");

    await ProductsPage.openBurgerMenu();

    await expect(ProductsPage.menuItems).toBeElementsArrayOfSize(4);

    await ProductsPage.logout();

    await expect(LoginPage.inputUsername).toBeDisplayed();

    await expect(LoginPage.inputPassword).toBeDisplayed();

    await expect(LoginPage.inputUsername).toHaveValue("");

    await expect(LoginPage.inputPassword).toHaveValue("");

    await LoginPage.login(process.env.USERNAME, process.env.PASSWORD);

    await expect(browser).toHaveUrl(expect.stringContaining("/inventory.html"));

    await ProductsPage.clickShoppingCartBtn();

    await expect(browser).toHaveUrl(expect.stringContaining("/cart.html"));

    await expect(InventoryPage.title).toHaveText("Your Cart");

    await expect(InventoryPage.cartItems).toBeElementsArrayOfSize(1);
  });
});
