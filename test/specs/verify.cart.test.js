import { cartPage } from "../pageobjects/cart.page";
import { homePage } from "../pageobjects/home.page";
import { shopPage } from "../pageobjects/shop.page";

describe("Verify Cart", () => {
    it("Verify Item Prices, Subtotals, and Cart Total Calculations", async () => {
        await browser.url(global.config.baseUrl);
        await homePage.btnStartShopping.click();
        const stuffedFrogPrice = await shopPage.buyItem("Stuffed Frog", 2);
        const fluffyBunnyPrice = await shopPage.buyItem("Fluffy Bunny", 5);
        const valentineBearPrice = await shopPage.buyItem("Valentine Bear", 3);
        await shopPage.goToCart();
        const stuffedFrogCartItem = await cartPage.verifyCartItem("Stuffed Frog", stuffedFrogPrice, 2);
        const fluffyBunnyCartItem = await cartPage.verifyCartItem("Fluffy Bunny", fluffyBunnyPrice, 5);
        const valentineBearCartItem = await cartPage.verifyCartItem("Valentine Bear", valentineBearPrice, 3);
        await cartPage.verifyCartTotal([stuffedFrogCartItem.Subtotal, fluffyBunnyCartItem.Subtotal, valentineBearCartItem.Subtotal]);
    });
});