import { test, expect } from '@playwright/test';
import cases from './data/boardCases.json';
import { BoardPage } from './pages/BoardPage';

type Case = {
  name: string;
  project: string;
  cardTitle: string;
  column: string;
  tags: string[];
};

test.describe('Data-driven board verification', () => {
  for (const c of cases as Case[]) {
    test(c.name, async ({ page }) => {
      const board = new BoardPage(page);

      await test.step('Open app (authenticated)', async () => {
        await page.goto('/');
      });

      await test.step(`Open project: ${c.project}`, async () => {
        await board.openProject(c.project);
      });

      await test.step(`Verify "${c.cardTitle}" in "${c.column}" with tags`, async () => {
        await board.expectCardInColumn(c.column, c.cardTitle);
        await board.expectTagsForCardInColumn(c.column, c.cardTitle, c.tags);
      });
    });
  }
});