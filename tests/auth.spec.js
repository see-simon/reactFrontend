import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';


test.describe('Auth Tests', () => {
  test('Signup - positive case', async ({ page }) => {
    await page.goto(`${baseURL}/signup`);

    await page.fill('input[name="name"]', 'gggg');
    await page.fill('input[name="surname"]', 'ttttt');
    await page.fill('input[name="email"]', 'ttttt@example.com');
    await page.fill('input[name="password"]', 'ttttt');
    await page.fill('input[name="confirmPassword"]', 'ttttt');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=User created successfully')).toBeVisible({ timeout: 5000 });
  });

  test('Signup - negative case (password mismatch)', async ({ page }) => {
    await page.goto(`${baseURL}/signup`);

    await page.fill('input[name="name"]', 'Test');
    await page.fill('input[name="surname"]', 'User');
    await page.fill('input[name="email"]', 'fail@example.com');
    await page.fill('input[name="password"]', 'Password123');
    await page.fill('input[name="confirmPassword"]', 'Password321');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Passwords do not match')).toBeVisible();
  });

  test('Login - positive case', async ({ page }) => {
    await page.goto(`${baseURL}/loginPage`);

    await page.fill('input#email', 'ttttt@example.com');
    await page.fill('input#password', 'ttttt');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Login successful')).toBeVisible({ timeout: 5000 });
  });

  test('Login - negative case (wrong password)', async ({ page }) => {
    await page.goto(`${baseURL}/loginPage`);

    await page.fill('input#email', 'testuser@example.com');
    await page.fill('input#password', 'WrongPassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });
});
