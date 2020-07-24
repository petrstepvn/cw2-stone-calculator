import Data from './data.json';
import { inputElementsDOM, inputData } from './index';

export const getInputData = (e) => {
	const { Grades } = Data;
	const [
		refinementLevel,
		refinementLevelSlider,
		infectedLevel,
		infectedLevelSlider,
		stoneType,
		eqGrade,
		stoneGrade,
		empower,
		infected,
		infectedAttribute,
	] = inputElementsDOM;

	if (!e) {
		inputData.refinementLevel = parseInt(refinementLevel.value);
		inputData.infectedLevel = parseInt(infectedLevel.value);
	} else {
		if (e.target.id === 'refinementLevel')
			inputData.refinementLevel = parseInt(refinementLevel.value);
		if (e.target.id === 'refinementLevelSlider')
			inputData.refinementLevel = parseInt(refinementLevelSlider.value);
		if (e.target.id === 'infectedLevel')
			inputData.infectedLevel = parseInt(infectedLevel.value);
		if (e.target.id === 'infectedLevelSlider')
			inputData.infectedLevel = parseInt(infectedLevelSlider.value);
	}

	inputData.stoneType = stoneType.value;
	inputData.eqGrade = Grades.indexOf(eqGrade.value);
	inputData.stoneGrade = Grades.indexOf(stoneGrade.value);
	inputData.empower = empower.checked;
	inputData.infected = infected.checked;
	inputData.infectedAttribute = infectedAttribute.value;

};
