import { expect, test } from "@playwright/test";

test("Login page has Guess List as document title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Guess List");
});
