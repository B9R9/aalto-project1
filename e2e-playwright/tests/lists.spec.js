const { test, expect } = require("@playwright/test");

const baseUrl = process.env.BASE_URL;

test.describe("Main Page with 1 list and 1 items", () => {
    test("Main page displays correct listsCount", async ({ page }) => {
        await page.goto(`${baseUrl}`);
        const listsLink = await page.locator("a[href='/lists']");
        await listsLink.click();
        const form = await page.locator("form[action='/lists']");
        await expect(form).toBeVisible();

        const randomListName = "List " + Math.floor(Math.random() * 1000);
        const input = await form.locator("input[name='name']");
        await input.fill(randomListName);
        await form.locator("input[type='submit']").click();
        const newList = await page.locator(
            "li:has-text('" + randomListName + "')"
        );
        await expect(newList).toBeVisible();
        await page.goto(`${baseUrl}`);
        const countLists = await page.locator("#shoppingList-count");
        console.log("countLists", countLists);
        await expect(countLists).toHaveText("Shopping lists: 1");
    });
});

test("lists has a link to the lists page", async ({ page }) => {
    await page.goto(`${baseUrl}/lists`);
    const listsLink = await page.locator("a:has-text('Menu')");
    await expect(listsLink).toHaveText("Menu");
    await listsLink.click();
    await expect(page).toHaveURL(`${baseUrl}`);
});

test("lists page has a form to add a new list", async ({ page }) => {
    await page.goto(`${baseUrl}/lists`);
    const form = await page.locator("form[action='/lists']");
	await expect(form).toBeVisible();
	
	const randomListName = "List " + Math.floor(Math.random() * 1000);
    const input = await form.locator("input[name='name']");
    await input.fill(randomListName);
    await form.locator("input[type='submit']").click();

    // Vérifiez que la nouvelle liste a été ajoutée (vous devrez peut-être ajuster cette partie en fonction de votre application)
    const newList = await page.locator("li:has-text('" + randomListName + "')");
    await expect(newList).toBeVisible();
});

test("lists page has a link to the list page", async ({ page }) => {
	await page.goto(`${baseUrl}/lists`);
    const form = await page.locator("form[action='/lists']");
    await expect(form).toBeVisible();

	const input = await form.locator("input[name='name']");
	const randomListName = "List " + Math.floor(Math.random() * 1000);
    await input.fill(randomListName);
    await form.locator("input[type='submit']").click();

    // Vérifiez que la nouvelle liste a été ajoutée (vous devrez peut-être ajuster cette partie en fonction de votre application)
	const newList = await page.locator("li:has-text('" + randomListName + "')");
    await expect(newList).toBeVisible();
	const listLink = await newList.locator("a:has-text('" + randomListName + "')");
	await listLink.click();
	await expect(page.locator("h1:has-text('" + randomListName + "')")).toBeVisible();
});



