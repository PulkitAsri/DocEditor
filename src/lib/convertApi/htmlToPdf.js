const { Readable } = require("stream-browserify");
const { v4: uuidv4 } = require("uuid");
const htmlToPdf = async ({ body, convertApi, header, footer }) => {
  console.log("hehehehe", body);
  const htmlStream = Readable.from([body]);
  const tempFileName = `${uuidv4()}.html`;
  const uploadResult = convertApi.upload(htmlStream, tempFileName);
  const convertResult = await convertApi.convert(
    "pdf",
    {
      File: uploadResult,
      PageSize: "a4",
      // CssMediaType: 'convertapi',
      MarginTop: 30,
      MarginBottom: 25,
      MarginRight: 20,
      MarginLeft: 20,
      Header: header ? header : "",
      Footer: footer ? footer : "",
      CssMediaType: "print",
      Timeout: 1200,
    },
    "html"
  );
  const files = convertResult.response.Files;
  const pdfFileLocation = files[0].Url;
  return { pdfFileLocation };
};

module.exports = { htmlToPdf };
