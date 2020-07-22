// import 'promise-polyfill/src/polyfill';
import Data from './data.json';
import { fillDropdowns } from './FillDropdowns';
import { getInputData } from './GetInputData';
console.log('xd');
console.log(Data);

const inputID = [
  'eqTypeWeapon',
  'eqTypeArmor',
  'eqTypeBelt',
  'eqTypeRing',
  'stoneType',
  'refinementLevel',
  'refinementLevelSlider',
  'eqGrade',
  'stoneGrade',
  'empower',
  'infected',
  'infectedAttribute',
  'infectedLevel',
  'infectedLevelSlider',
];

const inputData = {
  eqTypeWeapon: true,
  eqTypeArmor: false,
  eqTypeBelt: false,
  eqTypeRing: false,

  empower: false,
  infected: true,

  refinementLevel: 12,
  infectedLevel: 20,

  stoneType: '',
  eqGrade: '',
  stoneGrade: '',
  infectedAttribute: '',
};

const resultData = {
  PrimaryAttribute: '',
  PrimaryValue: 0,
  PrimaryRefinementLevel: 0,
  PrimaryEqGrade: 0,
  PrimaryStoneGrade: 20,
  PrimaryEmpower: 0,
  SecondaryAttribute: '',
  SecondaryValue: 0,
  SecondaryInfectedLevel: 0,
  SecondaryEqGrade: 0,
  SecondaryStoneGrade: 0,
  SecondaryEmpower: 0,
};

const inputElementsDOM = inputID.map((id) => document.getElementById(id));
const resultElementsDOM = Object.keys(resultData).map((id) =>
  document.getElementById(id)
);
console.log(resultElementsDOM);
inputElementsDOM.forEach((item) =>
  item.addEventListener('input', (e) => update(e))
);

const selectDOM = inputElementsDOM.filter(
  (element) => element.type === 'select-one'
);

fillDropdowns(inputElementsDOM);
const update = (e) => {
  getInputData(e, inputElementsDOM, inputData);
  calculate();
  updateDOM();
};

const updateDOM = () => {
  resultElementsDOM.forEach((element) => {
    element.textContent = resultData[element.id];
  });

  const refinementLevel = inputElementsDOM.filter((el) =>
    /refinementLevel/i.test(el.id)
  );
  const infectedLevel = inputElementsDOM.filter((el) =>
    /infectedLevel/i.test(el.id)
  );

  refinementLevel.forEach((el) => (el.value = inputData.refinementLevel));
  infectedLevel.forEach((el) => (el.value = inputData.infectedLevel));
  document.getElementById('infectedLevelSmall').textContent =
    inputData.infectedLevel;

  const test = Data.InfectedExpPerLevel.slice(
    0,
    inputData.infectedLevel + 1
  ).reduce((total, current) => total + current);
  document.getElementById('infectedLevelXp').textContent = test
    .toLocaleString('en-GB')
    .replace(/,/g, ' ');
  console.log(test);
  const infWrapper = document.querySelector('.infectedOuterWrapper');
  inputData.infected
    ? infWrapper.classList.remove('disabled')
    : infWrapper.classList.add('disabled');
};

const calculate = () => {
  const {
    stoneType,
    refinementLevel,
    infectedAttribute,
    infectedLevel,
    eqGrade,
    stoneGrade,
    empower,
  } = inputData;
  const { Grades, Stones, Infected } = Data;

  resultData.PrimaryAttribute = Stones[stoneType].attribute;
  resultData.PrimaryRefinementLevel =
    Stones[stoneType].refinementLevel[refinementLevel];
  resultData.PrimaryStoneGrade =
    Stones[stoneType].stoneGrade[Grades.indexOf(stoneGrade)];
  resultData.PrimaryValue =
    resultData.PrimaryRefinementLevel +
    resultData.PrimaryEqGrade +
    resultData.PrimaryStoneGrade +
    resultData.PrimaryEmpower;

  resultData.SecondaryAttribute = infectedAttribute;
  resultData.SecondaryInfectedLevel =
    Infected[infectedAttribute].base[infectedLevel];
  resultData.SecondaryEqGrade =
    Infected[infectedAttribute].multEq * Grades.indexOf(eqGrade);
  resultData.SecondaryStoneGrade =
    Infected[infectedAttribute].multStone * Grades.indexOf(stoneGrade);
  resultData.SecondaryEmpower = empower
    ? Infected[infectedAttribute].multEq * 15
    : 0;
  resultData.SecondaryValue =
    resultData.SecondaryInfectedLevel +
    resultData.SecondaryEqGrade +
    resultData.SecondaryStoneGrade +
    resultData.SecondaryEmpower;
};
