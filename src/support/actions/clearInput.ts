import type { Selector } from 'webdriverio';

export default async (selector: Selector) => {
  await $(selector).clearValue();
};
