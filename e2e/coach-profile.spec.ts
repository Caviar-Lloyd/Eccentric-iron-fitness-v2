import { test, expect } from '@playwright/test';

test.describe('Coach Profile', () => {
  test('navigates from directory to profile with all sections', async ({ page }) => {
    // Start at directory
    await page.goto('/coaches');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('OUR COACHES');

    // Find the first coach link
    const profileLink = page.locator('a[href^="/coaches/"]').first();
    const profileExists = (await profileLink.count()) > 0;

    if (!profileExists) {
      // Empty state — no coaches in DB, skip profile checks
      await expect(page.getByText(/No coaches available/i)).toBeVisible();
      return;
    }

    await profileLink.click();
    await expect(page).toHaveURL(/\/coaches\/[a-z0-9-]+/);

    // Breadcrumb visible
    const breadcrumb = page.getByLabel('Breadcrumb');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText('Coaches');

    // Hero section — coach name in heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // About section
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();

    // Pricing section
    const pricingSection = page.locator('#pricing');
    if (await pricingSection.isVisible()) {
      await expect(pricingSection).toContainText(/\$/);
    }

    // Book section with CTA
    const bookSection = page.locator('#book');
    if (await bookSection.isVisible()) {
      await expect(bookSection.getByRole('link')).toBeVisible();
    }
  });

  test('sub-nav sections are navigable', async ({ page }) => {
    await page.goto('/coaches');

    const profileLink = page.locator('a[href^="/coaches/"]').first();
    if ((await profileLink.count()) === 0) return;

    await profileLink.click();
    await expect(page).toHaveURL(/\/coaches\/[a-z0-9-]+/);

    // Sub-nav should be present
    const subNav = page.locator('nav').filter({ hasText: /ABOUT/i });
    if (await subNav.isVisible()) {
      // Click pricing in sub-nav — should scroll
      const pricingLink = subNav.getByText('PRICING');
      if (await pricingLink.isVisible()) {
        await pricingLink.click();
      }
    }
  });
});
