const { test, expect } = require("@playwright/test");

const baseUrl = process.env.BASE_URL;

test.describe("Main Page with 0 lists", () => {
    test("Main page has expected title and headings.", async ({ page }) => {
        await page.goto(`${baseUrl}`);
        await expect(page).toHaveTitle("Shared shopping list");
    });

    test("Main page shows No shoppinglist yet.", async ({ page }) => {
        await page.goto(`${baseUrl}`);
        const noShopping = await page.locator(
            "p:has-text('No shopping lists yet.')"
        );
        await expect(noShopping).toHaveText("No shopping lists yet.");
    });

    test('Main page has a tag: <a href="/lists"> Lists.</a>', async ({
        page,
    }) => {
        await page.goto(`${baseUrl}`);
        const listsLink = await page.locator("a[href='/lists']");
        await expect(listsLink).toHaveText("Lists");
    });
    test("Main page has a link to the lists page", async ({ page }) => {
        await page.goto(`${baseUrl}`);
        const listsLink = await page.locator("a[href='/lists']");
        await expect(listsLink).toHaveText("Lists");
        await listsLink.click();
        await expect(page).toHaveURL(`${baseUrl}/lists`);
    });
});
