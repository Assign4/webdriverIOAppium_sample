import { Given } from '@cucumber/cucumber';
import { calculator } from '../support/calculator.ts';
import { clear } from '../support/clear.ts';

Given('I perform following actions', calculator);

Given('I clear the console', clear);
