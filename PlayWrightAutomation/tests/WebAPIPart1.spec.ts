const {test, expect, request} = require('@playwright/test');
import { APiUtils } from '../utils_ts/APiUtils';

import { Page } from '@playwright/test';

test('Verify order creation and history', async ({ page }: { page: Page }) => {
  const apiContext = await request.newContext();
  const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
  const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  const response: { token: string; orderId: string } = await apiUtils.createOrder(orderPayLoad);

  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('anshika@gmail.com');
  await page.locator('#userPassword').fill('Iamking@000');
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await page.locator("button[routerlink*='myorders']").click();

  const rows = page.locator('tbody tr');
  for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (rowOrderId && response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(orderIdDetails && response.orderId.includes(orderIdDetails)).toBeTruthy();
});