# Opencart Site Automation Tests

This repository contains end-to-end automation tests for an Opencart e-commerce website using Playwright and TypeScript.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 1.45.3)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [csv-parser]

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/AProskurko/StructShareTestTask.git
   cd StructShareTestTask
   ```

2. Install the dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Install csv-parser package:

   ```sh
   npm install csv-parser
   # or
   yarn add csv-parser
   ```

## Running Test

To execute test:

```sh
npx playwright test
```

## Reporting

Playwright generates a default report after each test run. You can configure reporting in the `playwright.config.ts` file. To view the report:

```sh
npx playwright show-report
```
