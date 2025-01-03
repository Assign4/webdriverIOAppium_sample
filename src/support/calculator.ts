import { DataTable, World } from '@wdio/cucumber-framework';
import { waitForAndClick } from './actions/waitForAndClick.ts';

interface RowData {
  action: string;
  x: string;
  y: string;
}

export async function calculator(this: World, dataTable: DataTable) {
  const rows = dataTable.hashes() as unknown as RowData[];
  for (const row of rows) {
    switch (row['action']) {
      case 'addition':
        addition(row);
        break;
    }
  }
}

async function addition(row: RowData) {
  const key = "//*[@content-desc='{key}']";
  await waitForAndClick(key.replace('{key}', row['x']), 5000);
  await waitForAndClick("//*[@content-desc='+']", 5000);
  await waitForAndClick(key.replace('{key}', row['y']), 5000);
}
