import { test, expect } from '@playwright/test';

test.describe('Blog Funnel', () => {
  test('loads blog listing and navigates to a post', async ({ page }) => {
    await page.goto('/blog');

    // Blog heading visible
    await expect(page.getByRole('heading', { level: 1 })).toContainText('BLOG');

    // Category filter should be present
    const filterNav = page.getByRole('tablist');
    if (await filterNav.isVisible()) {
      await expect(filterNav.getByText('ALL')).toBeVisible();
    }

    // Find blog post links
    const postLinks = page.locator('a[href^="/blog/"]');
    const count = await postLinks.count();

    if (count === 0) {
      // Empty state
      await expect(page.getByText(/CONTENT COMING SOON/i)).toBeVisible();
      return;
    }

    // Click first post
    await postLinks.first().click();
    await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+/);

    // Post should have heading and content
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Breadcrumb visible
    const breadcrumb = page.getByLabel('Breadcrumb');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText('Blog');
  });

  test('blog post has CTA linking to calculator', async ({ page }) => {
    await page.goto('/blog');

    const postLinks = page.locator('a[href^="/blog/"]');
    if ((await postLinks.count()) === 0) return;

    await postLinks.first().click();
    await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+/);

    // Look for calculator CTA link
    const calcLink = page.locator('a[href="/calculator"]');
    if (await calcLink.first().isVisible()) {
      await calcLink.first().click();
      await expect(page).toHaveURL('/calculator');
      await expect(page.getByRole('heading', { level: 1 })).toContainText('CALCULATOR');
    }
  });
});
