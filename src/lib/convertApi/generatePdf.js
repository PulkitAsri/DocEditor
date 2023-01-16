import { htmlToPdf } from "./htmlToPdf";
var ConvertApi = require("convertapi");

let convertApi = ConvertApi("hY4x7r3pwM5OcluO");
export const generatePdf = async ({ preview }) => {
  const htmlDoc = `<html><body>${preview}</body></html>`;
  const { pdfFileLocation } = htmlToPdf({ body: htmlDoc, convertApi });
  console.log(pdfFileLocation);
};
