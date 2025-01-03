import type { Selector } from 'webdriverio';

export default async (type: 'link' | 'selector', selector: Selector) => {
  const selector2 = type === 'link' ? `=${selector}` : selector;
  const element = await $(selector2);

  const elementPosition = await element.getLocation();
  const elementSize = await element.getSize();

  await browser.touchAction([
    {
      action: 'press',
      x: elementPosition.x + elementSize.width / 2,
      y: elementPosition.y + elementSize.height / 2,
    },
    { action: 'release' },
  ]);
};
