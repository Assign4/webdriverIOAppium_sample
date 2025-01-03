import type { Selector } from 'webdriverio';

export default async (method: string, value: string, selector: Selector) => {
  const command = method === 'add' ? 'addValue' : 'setValue';
  let checkValue = value;
  if (!value) {
    checkValue = '';
  }
  await $(selector)[command](checkValue);
};
