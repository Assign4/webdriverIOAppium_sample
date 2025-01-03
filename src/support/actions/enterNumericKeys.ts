type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export async function enterKeys(phoneNumber: string) {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  const digitKeyCodes: Record<Digit, number> = {
    '0': 7,
    '1': 8,
    '2': 9,
    '3': 10,
    '4': 11,
    '5': 12,
    '6': 13,
    '7': 14,
    '8': 15,
    '9': 16,
  };

  for (const digit of digitsOnly) {
    await browser.pressKeyCode(digitKeyCodes[digit as Digit]);
  }
  await browser.pressKeyCode(66);
}
