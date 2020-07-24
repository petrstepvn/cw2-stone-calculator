import Data from './data.json';
import { thousandSeparator } from './utils';
import {
	inputElementsDOM,
	resultElementsDOM,
	inputData,
	resultData,
} from './index';

export const updateInputElements = () => {
	const refinementLevelSliderDOM = inputElementsDOM.find(
		(el) => el.id === 'refinementLevelSlider'
	);
	inputData.stoneGrade
		? (refinementLevelSliderDOM.disabled = true)
		: (refinementLevelSliderDOM.disabled = false);

	const refinementLevels = inputElementsDOM.filter((el) =>
		/refinementLevel/i.test(el.id)
	);
	const infectedLevels = inputElementsDOM.filter((el) =>
		/infectedLevel/i.test(el.id)
	);
	refinementLevels.forEach((el) => (el.value = inputData.refinementLevel));
	infectedLevels.forEach((el) => (el.value = inputData.infectedLevel));

	const infectedLevelXpDOM = document.getElementById('infectedLevelXp');
	const { InfectedExpPerLevel } = Data;
	const { infectedLevel } = inputData;
	const requiredXp = InfectedExpPerLevel.slice(0, infectedLevel + 1).reduce(
		(acc, curr) => acc + curr
	);
	infectedLevelXpDOM.textContent = thousandSeparator(requiredXp);
};

export const updateResultsDOM = () => {
	resultElementsDOM.forEach((element) => {
		element.textContent = thousandSeparator(resultData[element.id]);
	});
};
