import { test, expect } from '@playwright/test';

test.describe('Calculator Flow', () => {
  test('fills form, passes email gate, and sees results', async ({ page }) => {
    await page.goto('/calculator');

    // Page loads with heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('CALCULATOR');

    // Fill biometrics
    await page.getByLabel('Age').fill('30');
    await page.getByLabel(/Weight/).fill('180');
    await page.getByLabel(/Height/).fill('70');

    // Select activity level and goal
    await page.getByLabel('Activity Level').selectOption('Moderately Active');
    await page.getByLabel('Goal').selectOption('Fat Loss');

    // Submit the form
    await page.getByRole('button', { name: 'CALCULATE' }).click();

    // Email gate modal should appear
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('UNLOCK YOUR RESULTS');

    // Fill email and submit
    await dialog.getByLabel('Email address').fill('test@example.com');
    await dialog.getByRole('button', { name: /UNLOCK/i }).click();

    // Results should appear with calorie target and macros
    await expect(page.getByText(/CALORIES \/ DAY/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('YOUR MACROS')).toBeVisible();
    await expect(page.getByText('Protein')).toBeVisible();
    await expect(page.getByText('Carbs')).toBeVisible();
    await expect(page.getByText('Fat')).toBeVisible();

    // Coaching upsell CTA visible
    await expect(page.getByText('WANT EXPERT GUIDANCE?')).toBeVisible();
    await expect(page.getByRole('link', { name: /BROWSE ALL COACHES/i })).toBeVisible();
  });

  test('shows validation errors for empty form', async ({ page }) => {
    await page.goto('/calculator');

    // Submit empty form
    await page.getByRole('button', { name: 'CALCULATE' }).click();

    // Should show error messages (no modal)
    const dialog = page.getByRole('dialog');
    await expect(dialog).not.toBeVisible();
  });
});
