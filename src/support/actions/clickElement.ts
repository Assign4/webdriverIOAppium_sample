import type { Selector } from 'webdriverio';

export default async (
  action: 'click' | 'doubleClick',
  type: 'link' | 'selector',
  selector: Selector,
) => {
  const selector2 = type === 'link' ? `=${selector}` : selector;
  const method = action === 'click' ? 'click' : 'doubleClick';
  await $(selector2)[method]();
};
