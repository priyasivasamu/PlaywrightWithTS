import ExcelJs from 'exceljs';
import { test, expect } from '@playwright/test';

interface Output {
  row: number;
  column: number;
}

async function writeExcelTest(searchText: string, replaceText: string, change: { colChange: number }, filePath: string): Promise<void> {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  if (!worksheet) {
    throw new Error('Worksheet "Sheet1" not found');
  }
  const output = await readExcel(worksheet, searchText);

  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet: ExcelJs.Worksheet, searchText: string): Promise<Output> {
  let output: Output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}