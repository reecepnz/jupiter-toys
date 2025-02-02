import { expect } from "chai";
import BasePage from "./base.page";

class ContactPage extends BasePage {
    get inputForename() {
        return $("//input[@id='forename']");
    }

    get inputEmail() {
        return $("//input[@id='email']");
    }

    get inputMessage() {
        return $("//textarea[@id='message']");
    }

    get btnSubmit() {
        return $("//a[text()='Submit']");
    }

    get alertSuccess() {
        return $("//div[contains(@class, 'alert-success')]");
    }

    async isMandatoryErrorDisplayed(fieldLabel) {
        return await $(`//label[starts-with(normalize-space(), '${fieldLabel}')]/following-sibling::*/span[text()='${fieldLabel} is required']`).isDisplayed();
    }

    async verifySuccessfulSubmission(forename) {
        await this.alertSuccess.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: "Successful Alert Message for Contact Form Submission not displayed within 30s"
        });
        expect(await this.alertSuccess.getText()).equal(`Thanks ${forename}, we appreciate your feedback.`);
    }
}

const contactPage = new ContactPage();
export { contactPage };