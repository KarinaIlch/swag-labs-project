class LoginPage {

    get inputUsername () { return $('#user-name') }
    get inputPassword () { return $('#password') }
    get loginBtn() { return $('#login-button') }


    async enterUsername(value) {
        await this.inputUsername.waitForDisplayed({ timeout: 10000 })
        await this.inputUsername.setValue(value)
    }

    async enterPassword(value) {
        await this.inputPassword.waitForDisplayed({ timeout: 10000 })
        await this.inputPassword.setValue(value)
    }

    async clickLoginBtn() {
        await this.loginBtn.waitForDisplayed({ timeout: 10000 })
        await this.loginBtn.click()
    }

      async login(username, password) {
        await this.enterUsername(username)
        await this.enterPassword(password)
        await this.clickLoginBtn()
    }
}

export default new LoginPage()
