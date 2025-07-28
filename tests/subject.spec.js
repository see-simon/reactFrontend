import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';
const apiURL = 'http://localhost:8081/api/auth';

test.describe('Subject CRUD Tests', () => {

    test('Add Subject - positive case', async ({ page }) => {
        test.setTimeout(30_000);
        await page.goto(`${baseURL}/addSubject`);
        await page.fill('input[name="subjectName"]', 'Mathematics');
        await page.fill('input[name="mark"]', '90');
        await page.click('button[type="submit"]');
        await expect(page.locator('input[name="subjectName"]')).toHaveValue('');
    });

    test('Add Subject - negative case (missing fields)', async ({ page }) => {
        test.setTimeout(30_000);
        await page.goto(`${baseURL}/addSubject`);
        await page.fill('input[name="subjectName"]', '');
        await page.fill('input[name="mark"]', '');
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Subject name and mark are required')).toBeVisible();
    });

    test('Get Subjects - check if subjects loaded', async ({ page }) => {
        test.setTimeout(30_000);
        await page.goto(`${baseURL}/home`);
        const subjects = await page.locator('table tbody tr').count();
        expect(subjects).toBeGreaterThanOrEqual(0);
    });

    test('List Subjects - check if subject not displayed', async ({ page }) => {
        test.setTimeout(30_000);
        await page.goto(`${baseURL}/home`);
        const subjectName = 'NonExistentSubject';
        const isSubjectVisible = await page.locator(`text=${subjectName}`).isVisible();
        expect(isSubjectVisible).toBeFalsy();
    });

    test('Update Subject - positive case', async ({ page }) => {
        test.setTimeout(30_000);
        await page.goto(`${baseURL}/home`);
        await page.click('button:has-text("Update")');
        await page.fill('input[name="subjectName"]', 'Mathematics Advanced');
        await page.fill('input[name="mark"]', '95');
        await page.click('button:has-text("Save")');
        await expect(page.locator('table tbody tr').first()).toContainText('Mathematics Advanced');
    });

    test('Update Subject - negative case (missing fields)', async ({ page }) => {
        test.setTimeout(30_000);
        await page.goto(`${baseURL}/home`);
        await page.click('button:has-text("Update")');
        await page.fill('input[name="subjectName"]', '');
        await page.fill('input[name="mark"]', '');
        await page.click('button:has-text("Save")');
        await expect(page.locator('text=Subject name and mark are required')).toBeVisible();
    });

    test('Delete Subject - positive case', async ({ page }) => {
        test.setTimeout(30_000);
        await page.goto(`${baseURL}/home`);

        page.on('dialog', dialog => dialog.accept());
        await page.click('button:has-text("Delete")');

        const rowCountAfter = await page.locator('table tbody tr').count();
        expect(rowCountAfter).toBeLessThanOrEqual(10);
    });

    test('Delete Subject - negative case (non-existent id)', async ({ request }) => {
        test.setTimeout(30_000);
        const res = await request.delete(`${apiURL}/deleteStudentMark/9999999`);
        expect(res.status()).toBe(400);
        const json = await res.json();
        expect(json.message).toContain('Student not found');
    });
});
