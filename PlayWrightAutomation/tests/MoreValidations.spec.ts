import { test, expect } from '@playwright/test';
//npx run WebTests (target script in package.json)
//npx playwright test --grep  @Web (For test tags)
//npx playwright test tests/ClientAppPO.spec.js --config playwrght.config1.js --project=safari
//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'});
//Under plawright-report we can find all html reposts. Use trace.playwright.dev to view trace zip
//To isnatll allure - npm i -D @playwright/test allure-playwright
//npx playwright test --grep  @Web --reporter=line,allure-playwright
//After test run --> alure generate ./allure-results --clean
//allure open ./allure-report

test('Frame handling and text extraction', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck = await framesPage.locator(".text h2").textContent();
  console.log(textCheck?.split(" ")[1]);
});

test('Screenshot & Visual comparison', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: 'screenshot.png' });
  await expect(page.locator("#displayed-text")).toBeHidden();
});

test('Visual comparison', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  expect(await page.screenshot()).toMatchSnapshot('landing.png');
});