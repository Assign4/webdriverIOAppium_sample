import { ITestCaseHookParameter } from '@cucumber/cucumber';
import { HookFunctionExtension } from '@wdio/cucumber-framework/build/types';
import { Frameworks } from '@wdio/types';
import { Feature } from '@cucumber/messages';

export interface WdioCucumberHookFunctions extends HookFunctionExtension {}

const scenarioResults = new Map<string, 'passed' | 'failed'>();
const featureResults = new Map<string, 'passed' | 'failed'>();

const getHooks = (): WdioCucumberHookFunctions => ({
  afterScenario(
    world: ITestCaseHookParameter,
    result: Frameworks.PickleResult,
  ) {
    if (result.error) {
      driver.executeScript(
        'lambda-hook: {"action": "setTestStatus","arguments": {"status":"failed"}}',
        [],
      );
      scenarioResults.set(world.pickle.name, 'failed');
    } else if (result.passed) {
      driver.executeScript(
        'lambda-hook: {"action": "setTestStatus","arguments": {"status":"passed"}}',
        [],
      );
      scenarioResults.set(world.pickle.name, 'passed');
    }
  },

  afterFeature(uri: string, feature: Feature) {
    const featureName = feature.name;

    if (featureName) {
      const featureStatus = Array.from(scenarioResults.values()).includes(
        'failed',
      )
        ? 'failed'
        : 'passed';

      driver.executeScript(
        `lambda-hook: {"action": "setTestStatus","arguments": {"status":"${featureStatus}"}}`,
        [],
      );
    }
  },
});

export { getHooks };
