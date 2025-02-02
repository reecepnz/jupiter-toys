import BasePage from "./base.page";

class ShopPage extends BasePage {
    async buyItem(productTitle, quantity = 1) {
        try {
            const item = await $(`//li[@ng-repeat='item in catalog' and .//*[contains(@class, 'product-title') and text()='${productTitle}']]`);
            for (let i = 0; i < quantity; i++) {
                await item.$(".//a[text()='Buy']").click();
            }
            return await item.$(".//span[contains(@class, 'product-price')]").getText();
        } catch (error) {
            throw new Error(`Item: '${item}' not found`, error);
        }
    }
}

const shopPage = new ShopPage();
export { shopPage };