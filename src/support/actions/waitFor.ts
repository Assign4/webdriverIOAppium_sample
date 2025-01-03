import type { Selector } from 'webdriverio';

type WaitForCommands =
  | 'waitForClickable'
  | 'waitForDisplayed'
  | 'waitForEnabled'
  | 'waitForExist';

export default async (
  selector: Selector,
  ms: string,
  falseState: boolean,
  state: string,
) => {
  const intMs = ms ? parseInt(ms, 10) : undefined;
  let command: WaitForCommands = 'waitForExist';
  let boolFalseState = !!falseState;
  let parsedState = '';

  if (falseState || state) {
    parsedState = state.includes(' ')
      ? state.split(/\s/)[state.split(/\s/).length - 1]
      : state;

    if (parsedState) {
      command = (`waitFor${parsedState[0].toUpperCase()}` +
        `${parsedState.slice(1)}`) as WaitForCommands;
    }
  }

  if (typeof falseState === 'undefined') {
    boolFalseState = false;
  }

  await $(selector)[command]({
    timeout: intMs,
    reverse: boolFalseState,
  });
};
