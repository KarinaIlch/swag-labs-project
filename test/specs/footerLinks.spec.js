import LoginPage from "../pageObjects/loginPage";
import ProductsPage from "../pageObjects/productsPage";

describe("Social links in footer", () => {
  before(async () => {
    await browser.url(process.env.BASE_URL);

    await LoginPage.login(process.env.USERNAME, process.env.PASSWORD);
  });

  beforeEach(async () => {
    await browser.url(`${process.env.BASE_URL}/inventory.html`);
  });

  it("should open Twitter page in a new tab", async () => {
    await ProductsPage.clickTwitterLink();

    const handles = await browser.getWindowHandles();
    const newWindow = handles[handles.length - 1];

    await browser.switchToWindow(newWindow);

    await expect(browser).toHaveUrl(expect.stringContaining("x.com"));

    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
  });

  it("should open Facebook page in a new tab", async () => {
    await ProductsPage.clickFacebookLink();

    const handles = await browser.getWindowHandles();
    const newWindow = handles[handles.length - 1];

    await browser.switchToWindow(newWindow);

    await expect(browser).toHaveUrl(expect.stringContaining("facebook.com"));

    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
  });

  it("should open Linkedin page in a new tab", async () => {
    const oldHandles = await browser.getWindowHandles();

    await ProductsPage.clickLinkedinLink();

    await browser.waitUntil(
      async () => {
        const handles = await browser.getWindowHandles();
        return handles.length > oldHandles.length;
      },
      {
        timeout: 10000,
        timeoutMsg: "New LinkedIn tab was not opened",
      },
    );

    const handles = await browser.getWindowHandles();
    const newWindow = handles.find((handle) => !oldHandles.includes(handle));

    await browser.switchToWindow(newWindow);

    await expect(browser).toHaveUrl(expect.stringContaining("linkedin.com"));

    await browser.closeWindow();
    await browser.switchToWindow(oldHandles[0]);
  });
});
