import { test, expect } from '@playwright/test';
import { BrowserAgent } from '../src/browserAgent';

test.describe('BrowserAgent', () => {
  let agent: BrowserAgent;

  test.beforeEach(async () => {
    agent = new BrowserAgent();
    await agent.init();
  });

  test.afterEach(async () => {
    await agent.close();
  });

  test('should navigate to a website and get title', async () => {
    await agent.navigate('https://example.com');
    const title = await agent.getText('h1');
    expect(title).toBe('Example Domain');
  });

  test('should take a screenshot', async () => {
    await agent.navigate('https://example.com');
    await agent.screenshot('./screenshots/example.png');
  });
});