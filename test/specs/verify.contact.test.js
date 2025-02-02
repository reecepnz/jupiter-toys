import { faker } from "@faker-js/faker";
import { expect } from "chai";
import { contactPage } from "../pageobjects/contact.page";
import { homePage } from "../pageobjects/home.page";

describe("Verify Contact", () => {
    beforeEach("Navigate to Home Page", async () => {
        await browser.url(global.config.baseUrl);
    });

    it("Verify Contact Form Mandatory Validation", async () => {
        await homePage.goToContact();
        await contactPage.btnSubmit.click();
        expect(await contactPage.isMandatoryErrorDisplayed("Forename"), "No Mandatory Error displayed for 'Forename'").to.be.true;
        expect(await contactPage.isMandatoryErrorDisplayed("Email"), "No Mandatory Error displayed for 'Email'").to.be.true;
        expect(await contactPage.isMandatoryErrorDisplayed("Message"), "No Mandatory Error displayed for 'Message'").to.be.true;
        await contactPage.inputForename.setValue(faker.person.firstName());
        await contactPage.inputEmail.setValue(faker.internet.email());
        await contactPage.inputMessage.setValue(faker.string.alphanumeric(10));
        expect(await contactPage.isMandatoryErrorDisplayed("Forename"), "Mandatory Error still displayed for 'Forename'").to.be.false;
        expect(await contactPage.isMandatoryErrorDisplayed("Email"), "Mandatory Error still displayed for 'Email'").to.be.false;
        expect(await contactPage.isMandatoryErrorDisplayed("Message"), "Mandatory Error still displayed for 'Message'").to.be.false;
    });

    Array.from({ length: 5 }, () => faker.person.firstName()).forEach((forename) => {
        it(`Verify Successful Contact Form Submission for '${forename}'`, async () => {
            await homePage.goToContact();
            await contactPage.inputForename.setValue(forename);
            await contactPage.inputEmail.setValue(faker.internet.email());
            await contactPage.inputMessage.setValue(faker.string.alphanumeric(10));
            await contactPage.btnSubmit.click();
            await contactPage.verifySuccessfulSubmission(forename);
        });
    });
});