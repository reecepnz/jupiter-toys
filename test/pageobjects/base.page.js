export default class BasePage {
    async goToShop() {
        await this.#switchToTab("Shop");
    }

    async goToContact() {
        await this.#switchToTab("Contact");
    }

    async goToCart() {
        await this.#switchToTab("Cart");
    }

    async #switchToTab(tab) {
        const navBarInner = await $("//div[@class='navbar-inner']");
        try {
            await navBarInner.$(`.//a[starts-with(normalize-space(), '${tab}')]`).click();
        } catch (error) {
            throw new Error(`Tab: '${tab}' not found`, error);
        }
    }
}