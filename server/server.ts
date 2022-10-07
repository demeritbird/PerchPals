import { app } from './app';
import dotenv from 'dotenv';
import * as xlsx from 'xlsx';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: './../config.env' });

const PORT: number = 3001;
app.listen(PORT, () => {
  console.log(process.env.NODE_ENV);

  //// NOTE: Sending XLSX File Route Demo
  //// TODO: Remove upon implementation

  // Read XLSX file
  const ws = xlsx.readFile('./test.xlsx');
  const sheetOne = ws.Sheets['Sheet1'];
  const data = xlsx.utils.sheet_to_json(sheetOne);

  // Edit XLSX file

  // Get Request for XLSX
  app.use(cors({ origin: ['http://localhost:8888', 'http://127.0.0.1:8888'] }));
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
  });

  app.get('/downloadExcel', (req, res, next) => {
    const wb = xlsx.readFile('./test.xlsx');
    const sheetOne = wb.Sheets['Sheet1'];
    const data = xlsx.utils.sheet_to_json(sheetOne);

    // Edit XLSX file
    let newData: any = [];
    data.forEach((e: any) => {
      e.job = 'james';
      newData.push(e);
    });

    const newWs = xlsx.utils.json_to_sheet(newData);

    // Overwrite sheet.
    wb.Sheets[wb.SheetNames[0]] = newWs;
    xlsx.writeFile(wb, './test2.xlsx');
    const excelFilePath = path.join(__dirname, './test2.xlsx');
    res.sendFile(excelFilePath, (err) => {
      fs.unlinkSync(path.join(__dirname, './test2.xlsx'));
      if (err) console.log(err);
    });
  });
  ////

  console.log(`App running on port ${PORT}...`);
});
