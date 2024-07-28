import { test, expect, Page } from "@playwright/test";
import { getProductData } from "../data-sources/csv-data-exporter";

let page: Page;
let csvData;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://demo.opencart.com/en-gb?route=common/home");
});

test("Test: Navigation", async ({}) => {
  await expect(page).toHaveTitle("Your Store");
});

test("Test: Add products to cart", async ({}) => {
  const csvInData = await getProductData("product-info - Page1.csv");
  csvData = csvInData;
  for (const product of csvInData) {
    await test.step(`Add product: ${product["product-name"]}`, async () => {
      await page.goto(product["product-link"]);
      //! testing of 3rd product is imposible because of lot of additional requested actions
      if (product["product-name"] === `Apple Cinema 30"`) return;
      await expect(page.locator("h1")).toHaveText(product["product-name"]);
      await page.getByLabel("Qty").fill("2");

      await page.getByRole("button", { name: "Add to Cart" }).click();
    });
  }
});

test("Test: Shopping Cart", async ({}) => {
  await page.goto("https://demo.opencart.com/en-gb?route=checkout/cart");
  await expect(
    page
      .getByRole("cell", { name: "MacBook - Reward Points:" })
      .getByRole("link")
  ).toBeVisible();
  await page.getByRole("link", { name: "Checkout", exact: true }).click();
});

test("Test: Checkout", async ({}) => {
  //* Your Personal Details
  await page.goto("https://demo.opencart.com/en-gb?route=checkout/checkout");
  await page.getByLabel("Guest Checkout").check();
  await page.getByPlaceholder("First Name").fill("Bob");
  await page.getByPlaceholder("Last Name").fill("Smith");
  await page.getByPlaceholder("E-Mail").fill("bobsmith@gmail.col");
  await page.getByPlaceholder("Company").fill("Secrat Service");
  await page.getByPlaceholder("Address 1").fill("221B Baker Street");
  await page.getByPlaceholder("City").fill("London");
  await page.getByPlaceholder("Post Code").fill("11111");
  await page.getByLabel("Region / State").selectOption("3581");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Success: Your guest account")).toBeVisible();

  //* Shipping Method
  await page.getByPlaceholder("Choose shipping method...").click();
  await page.locator("#button-shipping-methods").click();
  await page.getByLabel("Flat Shipping Rate - $").click();
  await page.locator("#button-shipping-method").click();

  //* Payment Method
  await page.getByPlaceholder("Choose payment method...").click();
  await page.locator("#button-payment-methods").click();
  await page.getByLabel("Cash On Delivery").click();
  await page.locator("#button-payment-method").click();

  await page
    .getByLabel("Add Comments About Your Order")
    .fill("I don't like this site!");
  await page.getByRole("button", { name: "Confirm Order" }).click();
  await page.pause();
  await expect(page).toHaveTitle("Your order has been placed!");
});
