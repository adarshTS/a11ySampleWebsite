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

    await browser.execute(() => window.scrollBy(0, 500));

    await browser.$('button[type="submit"].form-submit-btn').click();

    //accessibility check
    let summary = await browser.getAccessibilityResultsSummary();
    console.log("Accessibility Summary:", summary);
    let criticalIssueCount = summary["issueCountBySeverity"]["critical"];
    console.log("Critical issue count:", criticalIssueCount);
    expect(criticalIssueCount).toBeLessThan(1);
  });
});
