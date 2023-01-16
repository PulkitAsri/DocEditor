export const getFilteredSectionData = ({ sections, filter }) => {
  let x = {};

  Object.keys(sections).forEach((key) => {
    if (filter[key] == true) {
      x[key] = sections[key].value;
    } else {
      x[key] = "";
    }
  });
  return x;
};
