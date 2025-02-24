# Playwright Setup and Execution Guide

## Installation

### Step 1: Install Node.js (Pre-requisite)
Playwright requires Node.js v16+.
Check if you have Node.js installed:

node -v

If not installed, download it from Node.js official site- https://nodejs.org/

### Step 2: Initialize a Playwright Project
Run the following command to set up Playwright with TypeScript:

npx playwright@latest init

This will:
Install Playwright and dependencies.
Create a playwright.config.ts file.
Set up example test files under tests/ directory.

### Step 3: Install Playwright Dependencies
If you already have a project and need to install Playwright manually:

npm init -y  # Initialize package.json (if not created)
npm install -D @playwright/test  # Install Playwright as a dev dependency
npx playwright install  # Install required browsers

### Step 4: Verify Playwright Installation
Run an example test to check if Playwright is installed correctly:

npx playwright test
This will run the sample tests Playwright created in the tests/ folder.

### Step 5: Writing a Basic Playwright Test
Create a test file inside tests/ folder (e.g., tests/example.spec.ts):

import { test, expect } from '@playwright/test';

test('Basic test - Check Playwright site', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});


### Step 6: Executing Playwright Tests
There are multiple ways to run Playwright tests:

Example : 
npx playwright test --ui 
npx playwright test UIBasics --headed --debug

1. Run all tests (Default Mode)

npx playwright test

This runs all tests inside the tests/ directory in headless mode by default.

2. Run a specific test file

npx playwright test tests/example.spec.ts

3. Run tests in headed mode (UI visible)

npx playwright test --headed

4. Run tests in a specific browser

npx playwright test --browser=chromium
npx playwright test --browser=firefox
npx playwright test --browser=webkit

5. Run a test without using the Playwright runner (Using Node.js directly)

Create a standalone test file standaloneTest.ts:

import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://playwright.dev');
  console.log(await page.title());
  await browser.close();
})();

Run it using Node.js:

node standaloneTest.ts

6. Run tests using UI Test Runner
Playwright has an interactive test runner UI:

npx playwright test --ui
npx playwright test UIBasic --ui

This opens a browser UI to view and debug tests.

7. Run tests with a tag (filter specific tests)
Use .only or .skip in test cases:

test.only('Run only this test', async ({ page }) => {
  await page.goto('https://example.com');
});

test.skip('Skip this test', async ({ page }) => {
  await page.goto('https://example.com');
});

Or run with a grep filter:

npx playwright test --grep "Run only this test"

8. Run tests from multiple files

npx playwright test tests/file1.spec.ts tests/file2.spec.ts

9. Run tests in parallel

By default, Playwright runs tests in parallel. To run them serially:

npx playwright test --workers=1

10. Run tests in different environments
Define environments in playwright.config.ts:

use: {
  baseURL: process.env.BASE_URL || 'https://default-site.com',
}
Run with:

BASE_URL=https://staging.example.com npx playwright test
Playwright Test Project Structure

## Common Playwright project structure


project-root/
│── tests/                   # All test files
│   ├── example.spec.ts       # Example test file
│   ├── login.spec.ts         # Another test file
│── playwright.config.ts      # Configuration file
│── package.json              # Node package file
│── package-lock.json         # Dependencies lock file
│── .gitignore                # Git ignore file

Summary

Execution Type	Command
Run all tests	npx playwright test
Run specific test	npx playwright test tests/example.spec.ts
Run in headed mode	npx playwright test --headed
Run in a specific browser	npx playwright test --browser=firefox
Run UI Test Runner	npx playwright test --ui
Run tests with a tag	npx playwright test --grep "tag"
Run without test runner	node standaloneTest.ts
Run tests in parallel	npx playwright test (default)
Run tests serially	npx playwright test --workers=1

## Reports

[trace.playwrght.dev](https://trace.playwright.dev/) (to see trace zip and flow)

### Playwroght codegen

To use Playwright's codegen feature, which helps you generate code by recording your actions in the browser, follow these steps:

1. Open a Terminal: Open a terminal in your Visual Studio Code or any terminal on your system.

2. Run Playwright Codegen: Use the following command to start the code generator. Replace https://example.com with the URL of the website you want to test.

npx playwright codegen https://www.google.com

3. Interact with the Browser: A browser window will open. Perform the actions you want to record. Playwright will generate the corresponding code in the terminal.

4. Save the Generated Code: Copy the generated code from the terminal and paste it into your test file.

### Playwright tets run extension

Install Playwright Test for VSCode rom market place

### Extra Notes

Now, once you provided this from your keyboard type ift command P are ift control P so that it
will open terminal in your Visual Studio code.
And then here, call this debug in PM script. debug npm script (using package.json

So when you make a call to this debug and VM script.

So basically what happens is this NPM will come to this package or JSON file and you are asking to debug

NPM script.

npm install --save-dev @types/playwright

To run the TypeScript code in your Playwright project, follow these steps:

Install Dependencies: Ensure you have all the necessary dependencies installed. Run the following command in the terminal:

npm install

Compile TypeScript: Compile the TypeScript code to JavaScript using the TypeScript compiler. Run:

npx tsc

Run Playwright Tests: Use the Playwright test runner to execute your tests. You can run specific scripts defined in the package.json file. For example, to run all tests, use:

npm run regression

Or to run tests with specific tags, use:

npm run webTests



