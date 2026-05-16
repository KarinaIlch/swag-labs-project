import LoginPage from "../pageObjects/LoginPage";
import ProductsPage from "../pageObjects/ProductsPage";

describe("Product sorting", () => {
  before(async () => {
    await browser.url(process.env.BASE_URL);

    await LoginPage.login(process.env.USERNAME, process.env.PASSWORD);
  });

  it("should sort products by name from A to Z", async () => {
    await ProductsPage.sortDropdown.selectByVisibleText("Name (A to Z)");

    const productNames = await ProductsPage.productNames.map(
      async (item) => await item.getText(),
    );

    const resolvedNames = await Promise.all(productNames);

    const sortedNames = [...resolvedNames].sort();

    await expect(resolvedNames).toEqual(sortedNames);
  });

  it("should sort products by name from Z to A", async () => {
    await ProductsPage.sortDropdown.selectByVisibleText("Name (Z to A)");

    const productNames = await ProductsPage.productNames.map(
      async (item) => await item.getText(),
    );

    const resolvedNames = await Promise.all(productNames);

    const sortedNames = [...resolvedNames].sort().reverse();

    await expect(resolvedNames).toEqual(sortedNames);
  });

  it("should sort products by price from low to high", async () => {
    await ProductsPage.sortDropdown.selectByVisibleText("Price (low to high)");

    const prices = await ProductsPage.productPrices.map(async (item) =>
      parseFloat((await item.getText()).replace("$", "")),
    );

    const resolvedPrices = await Promise.all(prices);

    const sortedPrices = [...resolvedPrices].sort((a, b) => a - b);

    await expect(resolvedPrices).toEqual(sortedPrices);
  });

  it("should sort products by price from high to low", async () => {
    await ProductsPage.sortDropdown.selectByVisibleText("Price (high to low)");

    const prices = await ProductsPage.productPrices.map(async (item) =>
      parseFloat((await item.getText()).replace("$", "")),
    );

    const resolvedPrices = await Promise.all(prices);

    const sortedPrices = [...resolvedPrices].sort((a, b) => b - a);

    await expect(resolvedPrices).toEqual(sortedPrices);
  });
});
