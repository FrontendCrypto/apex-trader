const { test, expect } = require('@playwright/test');

test.describe('Orderbook Component', () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await test.chromium.launch();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test.beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:5173');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should display bid and ask rows', async () => {
    const bidRows = await page.$$('[data-test="bid-row"]');
    const askRows = await page.$$('[data-test="ask-row"]');

    await expect(bidRows.length).toBeGreaterThan(0);
    await expect(askRows.length).toBeGreaterThan(0);
  });

  test('should calculate and display bid and ask sums correctly', async () => {
    const bidRows = await page.$$('[data-test="bid-row"]');
    const askRows = await page.$$('[data-test="ask-row"]');

    const lastBidSumElement = bidRows[bidRows.length - 1].$('data-test="bid-sum"');
    const lastAskSumElement = askRows[askRows.length - 1].$('data-test="ask-sum"');

    const lastBidSumText = await lastBidSumElement.textContent();
    const lastAskSumText = await lastAskSumElement.textContent();

    const lastBidSum = parseFloat(lastBidSumText);
    const lastAskSum = parseFloat(lastAskSumText);

    await expect(lastBidSum).toBeGreaterThan(0);
    await expect(lastAskSum).toBeGreaterThan(0);
  });
});
