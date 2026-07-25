import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    // Navigate to Navigate to https://the-internet.herokuapp.com/login.
    await page.goto('https://the-internet.herokuapp.com/login');

    // Verify the page title is correct.
    await expect(page).toHaveTitle('The Internet');

    // Enter the username: tomsmith.
    await page.locator('#username').fill('tomsmith');

    // Enter the password: SuperSecretPassword!
    await page.locator('#password').fill('SuperSecretPassword!');

    // Click the Login button.
    await page.locator("button[type='submit']").click();

    // Verify The URL contains /secure.
    await expect(page).toHaveURL(/secure/);

    // Verify The heading is Secure Area.
    await expect(page.locator('h2')).toHaveText('Secure Area');

    // Verify The success message contains "You logged into a secure area!".
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    // Click the Logout button.
    await page.locator("//a[@class='button secondary radius']").click();

    // Verify The URL contains /login.
    await expect(page).toHaveURL(/login/);

    // Verify The login page is displayed again. and The message "You logged out of the secure area!" is visible.
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');

})