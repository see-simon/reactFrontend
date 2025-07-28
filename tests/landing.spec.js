import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';

test.describe('Landing Page Tests', () => {
  test('Landing page shows welcome message and button', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page.locator('h1')).toHaveText('Welcome to MyApp');
    await expect(page.locator('a.btn')).toHaveText('Get Started');
  });
  
  test('Get Started button navigates to login page', async ({ page }) => {
    await page.goto(baseURL);
    await page.click('a.btn');
    await expect(page).toHaveURL(`${baseURL}/loginPage`);
  });
});
