import { ReporterEntry } from '@wdio/types/build/Reporters';
const reporters: ReporterEntry[] = [
  'spec',
  [
    'junit',
    {
      outputDir: './reports/junit/',
      outputFileFormat(options) {
        return `results-${options.cid}.xml`;
      },
    },
  ],
];

export { reporters };
