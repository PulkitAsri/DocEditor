export const getFilteredSectionData = ({ sectionsMap, filter }) => {
  let x = {};

  Object.keys(sectionsMap).forEach((key) => {
    if (filter[key] === true) {
      x[key] = sectionsMap[key];
    } else {
      x[key] = "";
    }
  });
  return x;
};
