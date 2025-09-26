import { test, expect } from '@playwright/test';

test('app shows correct title', async ({ page }) => {
  await page.goto('/');
  
  // Check heading is present
  const heading = page.getByRole('heading', { name: 'Welcome to Gmini' });
  await expect(heading).toBeVisible();
  
  // Check description text
  const description = page.getByText('A modern Vite + React + TypeScript application');
  await expect(description).toBeVisible();
});