import { test } from "@playwright/test";

test("homepage has Playwright in title and get started link linking to the intro page", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/login");

  // create a locator
  const getStarted = page.getByText("LOGIN WITH DISCORD");
});
