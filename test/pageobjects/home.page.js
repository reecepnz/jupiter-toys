import BasePage from "./base.page";

class HomePage extends BasePage {
    get btnStartShopping() {
        return $("//a[starts-with(text(), 'Start Shopping')]");
    }
}

const homePage = new HomePage();
export { homePage };