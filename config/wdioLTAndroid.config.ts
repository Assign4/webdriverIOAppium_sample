/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Options } from '@wdio/types';
import * as dotenv from 'dotenv';
import { reporters } from './wdio.reporting.conf.ts';
import { getHooks } from '../src/hooks.ts';
import { worldParameters } from './cucumber.worldParameters.ts';

// Load the .env file
dotenv.config();

const user = process.env.LT_USERNAME;
const key = process.env.LT_PASSWORD;

const date = new Date();
const day = date.getDate().toString().padStart(2, '0');
const month = date.toLocaleString('default', { month: 'short' });
const buildName = `Taygo Mobile App - Android Tests - ${process.env.ENV} - ${day} - ${month}`;

export const config: Options.Testrunner = {
  user,
  key,
  ...getHooks(),
  services: [
    [
      'lambdatest',
      {
        tunnel: true,
      },
    ],
  ],

  specs: ['../src/features/**.feature'],
  exclude: [],

  capabilities: [
    {
      build: buildName,
      name: 'Taygo Mobile App - Android Tests',
      isRealMobile: true,
      platformName: 'Android',
      deviceName: 'Galaxy S9',
      platformVersion: '10',
      app: process.env.LT_APP_NAME_ANDROID,
      devicelog: true,
      network: true,
      autoGrantPermissions: true,
      autoAcceptAlerts: true,
    },
  ],

  logLevel: 'info',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 190000,
  connectionRetryCount: 3,
  path: '/wd/hub',
  hostname: 'mobile-hub.lambdatest.com',
  port: 80,
  maxInstances: 2,

  framework: 'cucumber',
  reporters,
  cucumberOpts: {
    // <string[]> (file/dir) require files before executing features
    require: ['./src/steps/*.ts'],
    // <boolean> show full backtrace for errors
    backtrace: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: [],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: false,
    // <string[]> Only execute the scenarios with name matching the expression (repeatable).
    name: [],
    // <boolean> hide step definition snippets for pending steps
    snippets: true,
    // <boolean> hide source uris
    source: true,
    // <boolean> fail if there are any undefined or pending steps
    strict: false,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    tagExpression: '',
    // <number> timeout for step definitions
    timeout: 60000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
    worldParameters: {
      ...worldParameters,
    },
  },
};
