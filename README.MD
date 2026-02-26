# Playwright Data-Driven Evaluation

## Goal
Data-driven Playwright test suite in TypeScript. Test scenarios are defined in a JSON file to minimize duplication and improve scalability.

## Tech
- Playwright Test
- TypeScript
- Data-driven cases: `tests/data/boardCases.json`
- Page Objects: `tests/pages/*`

## Setup
```bash
npm i
npx playwright install 
```

## Authentication (Setup Project + storageState)
This suite uses a dedicated Playwright setup project to avoid repeating login in every test.
•	tests/auth.setup.ts logs in once and saves the authenticated state to playwright/.auth.json
•	The chromium project depends on setup and reuses that state via storageState
•	The file playwright/.auth.json is generated automatically on first run

Note: the playwright/ folder is kept in the repo via playwright/.gitkeep so the auth state file can be created.

## Run tests

Run the full suite (setup runs first automatically):

npm test

Run only the setup (creates playwright/.auth.json):

npx playwright test --project=setup

Run only the authenticated tests:

npx playwright test --project=chromium

## Reports

npm run report