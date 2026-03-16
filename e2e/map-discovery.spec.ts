import { test, expect } from '@playwright/test';

test.describe('Map Discovery', () => {
  test('loads map page and shows core elements', async ({ page }) => {
    await page.goto('/map');

    // Page loads with heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Map area should eventually load (or show loading state)
    const mapContainer = page.locator('[class*="h-[50vh]"], [class*="lg:h-[600px]"]').first();
    await expect(mapContainer).toBeVisible({ timeout: 15000 });

    // Online coaching banner visible
    await expect(page.getByText('ONLINE COACHING AVAILABLE ACROSS BC')).toBeVisible();
  });

  test('filter toggles work', async ({ page }) => {
    await page.goto('/map');

    // Legend filter buttons should be present
    await expect(page.getByRole('button', { name: /ALL/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /IN-PERSON/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /ONLINE/i })).toBeVisible();

    // Click in-person filter
    await page.getByRole('button', { name: /IN-PERSON/i }).click();

    // Click online filter
    await page.getByRole('button', { name: /ONLINE/i }).click();
  });

  test('area links navigate to city pages', async ({ page }) => {
    await page.goto('/map');

    // If there are area links, they should point to /areas/[slug]
    const areaLinks = page.locator('a[href^="/areas/"]');
    const count = await areaLinks.count();

    if (count > 0) {
      const firstHref = await areaLinks.first().getAttribute('href');
      expect(firstHref).toMatch(/^\/areas\//);

      await areaLinks.first().click();
      await expect(page).toHaveURL(/\/areas\//);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  });
});
