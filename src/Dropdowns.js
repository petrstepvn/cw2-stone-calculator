import Data from './data.json';
import { update } from './index';
const radioDOM = document.querySelectorAll('[type="radio"]');
const selectDOM = document.querySelectorAll('select');
const empowerDOM = document.getElementById('empower');
radioDOM.forEach((element) =>
  element.addEventListener('change', (e) => {
    fillFilteredAttributeDropdowns(e);
    if (/Weapon|Armor/.test(e.target.id)) {
      empowerDOM.checked = true;
      empowerDOM.disabled = false;
    } else {
      empowerDOM.checked = false;
      empowerDOM.disabled = true;
    }
    update();
  })
);

const fill = (options, element) => {
  options.forEach((option) => {
    const optionDOM = document.createElement('option');
    const optionText = document.createTextNode(option);
    optionDOM.value = option;
    optionDOM.appendChild(optionText);
    element.appendChild(optionDOM);
  });
};

const removeChildren = (element) => {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
};

const fillGradesDropdowns = () => {
  const [, eqGrade, stoneGrade] = selectDOM;
  const { Grades } = Data;
  fill(Grades, eqGrade);
  fill(Grades, stoneGrade);
  eqGrade.value = Grades[10];
  stoneGrade.value = Grades[10];
};

const fillFilteredAttributeDropdowns = (e) => {
  const [stoneType, , , infectedAttribute] = selectDOM;
  const selectedType = e
    ? e.target.id.replace('eqType', '').toLowerCase()
    : 'weapon';
  const { Stones, Infected } = Data;
  const filteredStoneTypes = Stones.filter((stone) =>
    stone.eqType.includes(selectedType)
  )
    .map((stone) => stone.name)
    .sort();
  const filteredInfectedAttributes = Infected.filter((attribute) =>
    attribute.eqType.includes(selectedType)
  )
    .map((stone) => stone.attribute)
    .sort();
  removeChildren(stoneType);
  removeChildren(infectedAttribute);
  fill(filteredStoneTypes, stoneType);
  fill(filteredInfectedAttributes, infectedAttribute);
};

fillGradesDropdowns();
fillFilteredAttributeDropdowns();
