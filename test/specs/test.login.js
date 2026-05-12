import loginPage from "../pageobjects/login.page.js";


describe('Login page', () => {
    it('should show login page, fill fields and login', async () => {
    await browser.url('https://www.saucedemo.com');

    await loginPage.enterUsername('standard_user')
    await loginPage.enterPassword('secret_sauce')
    await loginPage.clickLoginBtn()

    await expect(browser).toHaveUrl(
    expect.stringContaining('/inventory.html')
)

await expect($('.title')).toHaveText('Products')


    })                          
})