const { chromium } = require('playwright');

describe('Orderbook Component', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000'); // Cambia la URL según la ubicación de tu aplicación
  });

  afterEach(async () => {
    await page.close();
  });

  it('should display bid and ask rows', async () => {
    const bidRows = await page.$$('[data-test="bid-row"]');
    const askRows = await page.$$('[data-test="ask-row"]');

    expect(bidRows.length).toBeGreaterThan(0);
    expect(askRows.length).toBeGreaterThan(0);
  });

  it('should calculate and display bid and ask sums correctly', async () => {
    const bidRows = await page.$$('[data-test="bid-row"]');
    const askRows = await page.$$('[data-test="ask-row"]');

    const lastBidSumElement = bidRows[bidRows.length - 1].$('data-test="bid-sum"');
    const lastAskSumElement = askRows[askRows.length - 1].$('data-test="ask-sum"');

    const lastBidSumText = await lastBidSumElement.textContent();
    const lastAskSumText = await lastAskSumElement.textContent();

    const lastBidSum = parseFloat(lastBidSumText);
    const lastAskSum = parseFloat(lastAskSumText);

    expect(lastBidSum).toBeGreaterThan(0);
    expect(lastAskSum).toBeGreaterThan(0);
  });

  // Agrega más pruebas según tus necesidades
});
