import { expect, Page, Locator } from '@playwright/test';

export class BoardPage {
  constructor(private readonly page: Page) {}

  async openProject(projectName: string) {
    const projectBtn = this.page
      .getByRole('button', { name: new RegExp(`^${projectName}\\b`, 'i') })
      .first();
  
    await expect(projectBtn).toBeVisible();
    await projectBtn.click();
  
    await expect(
      this.page.getByRole('banner').getByRole('heading', { name: new RegExp(`^${projectName}$`, 'i') })
    ).toBeVisible();
  }
  private columnRoot(columnName: string): Locator {
    const header = this.page.locator('h2').filter({ hasText: new RegExp(columnName, 'i') });
    return this.page.locator('div').filter({ has: header }).first();
  }
  private cardInColumn(columnName: string, cardTitle: string): Locator {
    const column = this.columnRoot(columnName);
    const title = this.page.locator('h3', { hasText: new RegExp(cardTitle, 'i') });
    return column.locator('div.bg-white').filter({ has: title }).first();
  }
  async expectCardInColumn(columnName: string, cardTitle: string) {
    const card = this.cardInColumn(columnName, cardTitle);
    await expect(card).toBeVisible();
  }

  async expectTagsForCardInColumn(columnName: string, cardTitle: string, expectedTags: string[]) {
    const card = this.cardInColumn(columnName, cardTitle);
    await expect(card).toBeVisible();

    // Tag chips live in a flex-wrap container; collect only the tag <span> elements.
    const tagSpans = card.locator('div.flex.flex-wrap span');

    const actual = (await tagSpans.allTextContents())
      .map(t => t.trim())
      .filter(Boolean);

    const expected = expectedTags.map(t => t.trim());

    // Strict match: same tag set (order-insensitive).
    actual.sort();
    expected.sort();

    expect(actual).toEqual(expected);
  }
}