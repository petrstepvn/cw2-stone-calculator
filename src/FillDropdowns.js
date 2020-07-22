import Data from './data.json';

export const fillDropdowns = (inputElementsDOM) => {
  const selectDOM = inputElementsDOM.filter(
    (element) => element.type === 'select-one'
  );
  const [stoneType, eqGrade, stoneGrade, infectedAttribute] = selectDOM;
  const { Grades, Stones, Infected } = Data;
  const stoneTypes = Object.keys(Stones);
  const infectedAttributes = Object.keys(Infected);

  const fill = (options, element) => {
    options.forEach((option) => {
      const optionDOM = document.createElement('option');
      const optionText = document.createTextNode(option);
      optionDOM.value = option;
      optionDOM.appendChild(optionText);
      element.appendChild(optionDOM);
    });
  };
  fill(infectedAttributes, infectedAttribute);
  fill(stoneTypes, stoneType);
  fill(Grades, eqGrade);
  fill(Grades, stoneGrade);
};
