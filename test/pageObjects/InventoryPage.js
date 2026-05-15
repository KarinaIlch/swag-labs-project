class InventoryPage {
  get shoppingCartBtn() {
    return $('[data-test="shopping-cart-link"]');
  }
  get cartItems() {
    return $$(".cart_item");
  }
  get title() {
    return $(".title");
  }
  get checkoutBtn() {
    return $("#checkout");
  }
  get continueBtn() {
    return $("#continue");
  }

  get errorMessage() {
    return $('[data-test="error"]');
  }

  get burgerMenuBtn() {
    return $("#react-burger-menu-btn");
  }

  get logoutBtn() {
    return $("#logout_sidebar_link");
  }

  get menuItems() {
    return $$(".bm-item.menu-item");
  }

  async clickContinueBtn() {
    await this.continueBtn.waitForClickable({ timeout: 10000 });
    await this.continueBtn.click();
  }

  async clickShoppingCartBtn() {
    await this.shoppingCartBtn.waitForClickable({ timeout: 10000 });
    await this.shoppingCartBtn.click();
  }

  async clickCheckoutBtn() {
    await this.checkoutBtn.waitForClickable({ timeout: 10000 });
    await this.checkoutBtn.click();
  }

  async openBurgerMenu() {
    await this.burgerMenuBtn.waitForClickable();
    await this.burgerMenuBtn.click();
  }

  async logout() {
    await this.logoutBtn.waitForDisplayed({ timeout: 5000 });
    await this.logoutBtn.waitForClickable({ timeout: 5000 });
    await this.logoutBtn.click();
  }
}

export default new InventoryPage();
