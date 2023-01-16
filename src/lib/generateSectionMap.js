export const generateSectionMap = (htmlStr) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlStr, "text/html");

  var divs = htmlDoc.getElementsByTagName("div");
  var sectionDivs = {};
  var x = [];

  for (var i = 0; i < divs.length; i++) {
    if (divs[i].className === "sectionDiv") {
      x.push(divs[i]);
      sectionDivs[divs[i].id] = divs[i].outerHTML;
    }
  }

  console.log("hehehehe sections", sectionDivs);

  return sectionDivs;
};
