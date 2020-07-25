import Data from './data.json';
import { thousandSeparator } from './utils';
import {
  inputElementsDOM,
  resultElementsDOM,
  inputData,
  resultData,
} from './index';

export const updateInputElements = () => {
  const { InfectedExpPerLevel } = Data;
  const { stoneGrade, refinementLevel, infectedLevel } = inputData;

  const refinementLevelSliderDOM = inputElementsDOM.find(
    (el) => el.id === 'refinementLevelSlider'
  );
  stoneGrade
    ? (refinementLevelSliderDOM.disabled = true)
    : (refinementLevelSliderDOM.disabled = false);

  const refinementLevels = inputElementsDOM.filter((el) =>
    /refinementLevel/i.test(el.id)
  );
  const infectedLevels = inputElementsDOM.filter((el) =>
    /infectedLevel/i.test(el.id)
  );
  refinementLevels.forEach((el) => (el.value = refinementLevel));
  infectedLevels.forEach((el) => (el.value = infectedLevel));

  const infectedLevelSmall = document.querySelectorAll('.infectedLevelSmall');
  const infectedLevelXpDOM = document.getElementById('infectedLevelXp');
  const infectedLevelXpTotalDOM = document.getElementById(
    'infectedLevelXpTotal'
  );
  const requiredXp = InfectedExpPerLevel[infectedLevel];
  const requiredXpTotal = InfectedExpPerLevel.slice(
    0,
    infectedLevel + 1
  ).reduce((acc, curr) => acc + curr);
  infectedLevelXpDOM.textContent = thousandSeparator(requiredXp);
  infectedLevelXpTotalDOM.textContent = thousandSeparator(requiredXpTotal);
  infectedLevelSmall.forEach((el) => (el.textContent = infectedLevel));
};

export const updateResultsDOM = () => {
  resultElementsDOM.forEach((element) => {
    element.textContent = thousandSeparator(resultData[element.id]);
  });
};
