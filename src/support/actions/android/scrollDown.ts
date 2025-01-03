export async function scrollDownToEnd() {
  let canScrollMore = true;
  const maxScrollAttempts = 2;
  let scrollAttempts = 0;

  while (canScrollMore && scrollAttempts < maxScrollAttempts) {
    try {
      const previousPageSource = await browser.getPageSource();
      await browser.$(
        'android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()',
      );

      const currentPageSource = await browser.getPageSource();
      if (previousPageSource === currentPageSource) {
        canScrollMore = false;
      }

      scrollAttempts++;
    } catch (error) {
      canScrollMore = false;
    }
  }
}

export async function scrollDownToEndIOS() {
  let canScrollMore = true;
  const maxScrollAttempts = 2;
  let scrollAttempts = 0;

  while (canScrollMore && scrollAttempts < maxScrollAttempts) {
    try {
      const previousPageSource = await browser.getPageSource();

      // iOS-specific scroll using touch action
      const { width, height } = await driver.getWindowRect();
      const startX = width / 2;
      const startY = height * 0.8; // Start 80% from top
      const endY = height * 0.2; // End 20% from top

      await driver.touchAction([
        { action: 'press', x: startX, y: startY },
        { action: 'wait', ms: 1000 },
        { action: 'moveTo', x: startX, y: endY },
        { action: 'release' },
      ]);

      const currentPageSource = await browser.getPageSource();
      if (previousPageSource === currentPageSource) {
        canScrollMore = false;
      }

      scrollAttempts++;
    } catch (error) {
      canScrollMore = false;
    }
  }
}
