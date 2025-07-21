const { expect, browser } = require("@wdio/globals");

describe("end-to-end-testing", () => {
  it("User should be able to shop", async () => {
    await browser.url(
      "https://adarshts.github.io/a11ySampleWebsite/index.html"
    );
    await expect(browser).toHaveUrl(
      "https://adarshts.github.io/a11ySampleWebsite/index.html"
    );

    await browser.$('[data-testid="shop-now-btn"]').click();
    await expect(browser).toHaveTitle(
      "Thank You - Order Successful | 404Deals"
    );
    await expect($("h1*=ORDER SUCCESSFUL")).toBeDisplayed();

    await browser.$('button[onclick="scrollToContact()"]').click();

    await browser.$("#customer-name").setValue("John");
    await browser.$("#customer-email").setValue("john@gmail.com");
    await browser.$("#customer-order-id").setValue("56321198822");
    await browser
      .$("#customer-message")
      .setValue("I did not receive the order yet");

    await browser.$('button[type="submit"].form-submit-btn').click();

    await browser.$(".confirmation-modal").waitForDisplayed({ timeout: 5000 });
    await expect($(".confirmation-modal h3")).toHaveText(
      "Message Sent Successfully!"
    );
    await browser.$(".confirmation-modal button.cta-button").click();
  });
});
