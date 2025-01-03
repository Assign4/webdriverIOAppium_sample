export async function waitForAndClick(
  expectedElementName: string,
  timeout: number,
) {
  const expectElement = await $(expectedElementName);

  await expectElement.waitForDisplayed({ timeout });
  await expectElement.click();
}
