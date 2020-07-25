// import 'promise-polyfill/src/polyfill';
import './Dropdowns';
import './Collapse';

import { getInputData } from './GetInputData';
import { calculateResult } from './CalculateResult';
import { updateInputElements, updateResultsDOM } from './UpdateDOM';

const inputID = [
  'refinementLevel',
  'refinementLevelSlider',
  'infectedLevel',
  'infectedLevelSlider',
  'stoneType',
  'eqGrade',
  'stoneGrade',
  'empower',
  'infected',
  'infectedAttribute',
];

export const inputData = {};

export const resultData = {
  PrimaryAttribute: '',
  PrimaryValue: 0,
  PrimaryRefinementLevel: 0,
  PrimaryEqGrade: 0,
  PrimaryStoneGrade: 0,
  PrimaryEmpower: 0,
  SecondaryAttribute: '',
  SecondaryValue: 0,
  SecondaryInfectedLevel: 0,
  SecondaryEqGrade: 0,
  SecondaryStoneGrade: 0,
  SecondaryEmpower: 0,
};

export const inputElementsDOM = inputID.map((id) =>
  document.getElementById(id)
);

inputElementsDOM
  .slice(0, 4)
  .forEach((element) => element.addEventListener('input', (e) => update(e)));
inputElementsDOM
  .slice(4)
  .forEach((element) => element.addEventListener('change', (e) => update(e)));

export const resultElementsDOM = Object.keys(resultData).map((id) =>
  document.getElementById(id)
);

export const update = (e) => {
  getInputData(e, inputElementsDOM, inputData);
  updateInputElements();
  calculateResult();
  updateResultsDOM(resultElementsDOM);
};
update();

document.querySelectorAll('.accordion_button').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const accordionContent = button.nextElementSibling;

    button.classList.toggle('accordion__button--active');

    if (button.classList.contains('accordion__button--active')) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
    } else {
      accordionContent.style.maxHeight = 0;
    }
  });
});
