import loginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/Inventory.page.js";

describe('Inventory page', () => {

    beforeEach(async () => {

        await browser.url('https://www.saucedemo.com');
        await loginPage.login('standard_user', 'secret_sauce');

    });

    it('should open empty shopping cart page when the shopping cart button is clicked', async () => {

        await InventoryPage.clickShoppingCartBtn();

        await expect(browser).toHaveUrl(expect.stringContaining('/cart.html'));
        await expect(InventoryPage.title).toHaveText('Your Cart')
        await expect(InventoryPage.cartItems).toBeElementsArrayOfSize(0);

    });

    it('should open checkout information page when checkout button is clicked', async () => {
    await InventoryPage.clickShoppingCartBtn();
    await InventoryPage.clickCheckoutBtn();

    await expect(browser).toHaveUrl( expect.stringContaining('/checkout-step-one.html') );
    await expect(InventoryPage.title).toHaveText('Checkout: Your Information');

});

it('should display error message when continue button is clicked with empty checkout fields', async () => {

    await InventoryPage.clickShoppingCartBtn();
    await InventoryPage.clickCheckoutBtn();
    await InventoryPage.clickContinueBtn();

    await expect(InventoryPage.errorMessage).toBeDisplayed();
    await expect(InventoryPage.errorMessage).toHaveText('Error: First Name is required');

});
});