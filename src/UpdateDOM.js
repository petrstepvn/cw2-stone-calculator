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

  const infLvl = [
    'infectedLevelXp',
    'infectedLevelXpTotal',
    'infectedLevelXpTotalEnd',
  ];
  const infLvlFrag = [
    'infectedLevelXpFragment',
    'infectedLevelXpFragmentTotal',
    'infectedLevelXpFragmentTotalEnd',
  ];
  const infLvlDOM = infLvl.map((el) => document.getElementById(el));
  const infLvlFragDOM = infLvlFrag.map((el) => document.getElementById(el));

  const xp = InfectedExpPerLevel[infectedLevel];
  const xpTotal = InfectedExpPerLevel.slice(0, infectedLevel + 1).reduce(
    (acc, curr) => acc + curr
  );
  const xpTotalEnd = InfectedExpPerLevel.slice(infectedLevel, 31).reduce(
    (acc, curr) => acc + curr
  );

  const xpFrag = Math.ceil(xp / 2000);
  const xpFragTotal = Math.ceil(xpTotal / 2000);
  const xpFragTotalEnd = Math.ceil(xpTotalEnd / 2000);

  infectedLevelSmall.forEach((el) => (el.textContent = infectedLevel));
  infLvlDOM[0].textContent = thousandSeparator(xp);
  infLvlDOM[1].textContent = thousandSeparator(xpTotal);
  infLvlDOM[2].textContent = thousandSeparator(xpTotalEnd);
  infLvlFragDOM[0].textContent = thousandSeparator(xpFrag);
  infLvlFragDOM[1].textContent = thousandSeparator(xpFragTotal);
  infLvlFragDOM[2].textContent = thousandSeparator(xpFragTotalEnd);
};

export const updateResultsDOM = () => {
  resultElementsDOM.forEach((element) => {
    element.textContent = thousandSeparator(resultData[element.id]);
  });
};
