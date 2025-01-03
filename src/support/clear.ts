import { waitForAndClick } from './actions/waitForAndClick.ts';
// import calculatorlocators from '../locators/calculator.json' assert { type: 'json' };

// const calculatorlocator = driver.isIOS
//   ? calculatorlocators['ios']
//   : calculatorlocators['android'];

export async function clear() {
  await waitForAndClick("//*[@content-desc='C']", 5000);
}
