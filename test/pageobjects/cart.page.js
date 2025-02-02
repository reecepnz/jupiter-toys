import { expect } from "chai";
import DataUtils from "../../utils/data.utils";
import BasePage from "./base.page";

class CartPage extends BasePage {
    get tableCartItems() {
        return $("//table[contains(@class, 'cart-items')]");
    }

    async getCartItem(productTitle) {
        try {
            const foundCartItem = await this.tableCartItems.$(`.//tr[contains(@class, 'cart-item') and ./td[normalize-space()='${productTitle}']]`);
            return {
                Price: await foundCartItem.$("./td[2]").getText(),
                Quantity: await foundCartItem.$("./td[3]/input").getAttribute("value"),
                Subtotal: await foundCartItem.$("./td[4]").getText()
            };
        } catch (error) {
            throw new Error(`Item: '${productTitle}' not found in Cart`, error);
        }
    }

    async verifyCartItem(productTitle, productPrice, quantity) {
        const cartItem = await this.getCartItem(productTitle);
        expect(cartItem).deep.equal({
            Price: productPrice,
            Quantity: String(quantity),
            Subtotal: `$${DataUtils.calculatePriceVolume(productPrice, quantity)}`
        });
        return cartItem;
    }

    async getCartTotal() {
        return (await this.tableCartItems.$(".//strong[contains(@class, 'total')]").getText()).replace("Total: ", "");
    }

    async verifyCartTotal(subtotals) {
        expect(await this.getCartTotal()).equal(String(DataUtils.calculateSum(subtotals)), "Incorrect Cart Total");
    }
}

const cartPage = new CartPage();
export { cartPage };