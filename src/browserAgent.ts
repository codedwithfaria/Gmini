import { Browser, BrowserContext, Page, chromium } from 'playwright';

export class BrowserAgent {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  async init(headless: boolean = true) {
    this.browser = await chromium.launch({ headless });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async navigate(url: string) {
    if (!this.page) throw new Error('Browser not initialized');
    await this.page.goto(url);
  }

  async getText(selector: string): Promise<string> {
    if (!this.page) throw new Error('Browser not initialized');
    const element = await this.page.locator(selector).first();
    return await element.textContent() || '';
  }

  async click(selector: string) {
    if (!this.page) throw new Error('Browser not initialized');
    await this.page.click(selector);
  }

  async type(selector: string, text: string) {
    if (!this.page) throw new Error('Browser not initialized');
    await this.page.fill(selector, text);
  }

  async screenshot(path: string) {
    if (!this.page) throw new Error('Browser not initialized');
    await this.page.screenshot({ path });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.context = null;
      this.page = null;
    }
  }
}