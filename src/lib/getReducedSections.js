export const getReducedSections = ({ sectionsDefaultMap }) => {
  let x = {};

  Object.keys(sectionsDefaultMap).forEach((sectionKey) => {
    x[sectionKey] = false;
  });

  return x;
};
