import { test, expect, BrowserContext, Page } from '@playwright/test';

let webContext: BrowserContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("rahulshetty@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});

test('@QA Client App login', async () => {
  const email = "rahulshetty@gmail.com";
  const productName = 'iphone 13 pro';
  const page: Page = await webContext.newPage();
  // Add the rest of your test code here
});