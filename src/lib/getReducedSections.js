export const getReducedSections = ({ sections }) => {
  let x = {};

  Object.keys(sections).forEach((sectionKey) => {
    x[sectionKey] = false;
  });

  return x;
};
