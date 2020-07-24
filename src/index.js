// import 'promise-polyfill/src/polyfill';
import Data from './data.json';
import './Dropdowns';
import { getInputData } from './GetInputData';
import { thousandSeparator } from './utils';

const inputID = [
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
	refinementLevel: 12,
	infectedLevel: 20,
};

const inputElementsDOM = inputID.map((id) => document.getElementById(id));
inputElementsDOM.forEach((element) =>
	element.addEventListener('input', (e) => update(e))
);

const update = (e) => {
	getInputData(e, inputElementsDOM, inputData);
	updateInputElements();
	calculateResult();
	updateResultsDOM();
};

const updateInputElements = () => {
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

const resultData = {
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

const resultElementsDOM = Object.keys(resultData).map((id) =>
	document.getElementById(id)
);

const updateResultsDOM = () => {
	resultElementsDOM.forEach((element) => {
		element.textContent = resultData[element.id];
	});
};

const calculateResult = () => {
	const {
		stoneType,
		refinementLevel: lvl,
		infectedAttribute,
		infectedLevel: ilvl,
		eqGrade: eg,
		stoneGrade: sg,
		empower,
	} = inputData;
	const { Grades, Stones, Infected } = Data;
	const currentStone = Stones.find((stone) => stone.name === stoneType);
	const currentInfected = Infected.find(
		(inf) => inf.attribute === infectedAttribute
	);

	resultData.PrimaryAttribute = currentStone.attribute;
	resultData.PrimaryRefinementLevel = currentStone.refinementLevel[lvl];
	// resultData.PrimaryEqGrade = ;
	resultData.PrimaryStoneGrade = currentStone.stoneGrade[Grades.indexOf(sg)];
	// resultData.PrimaryEmpower =
	resultData.PrimaryValue =
		resultData.PrimaryRefinementLevel +
		// resultData.PrimaryEqGrade +
		resultData.PrimaryStoneGrade;
	// resultData.PrimaryEmpower

	resultData.SecondaryAttribute = infectedAttribute;
	resultData.SecondaryInfectedLevel = currentInfected.base[ilvl];
	resultData.SecondaryEqGrade = currentInfected.multEq * Grades.indexOf(eg);
	resultData.SecondaryStoneGrade =
		currentInfected.multStone * Grades.indexOf(sg);
	resultData.SecondaryEmpower = empower ? currentInfected.multEq * 15 : 0;
	resultData.SecondaryValue =
		resultData.SecondaryInfectedLevel +
		resultData.SecondaryEqGrade +
		resultData.SecondaryStoneGrade +
		resultData.SecondaryEmpower;
};

// 	document.getElementById('infectedLevelSmall').textContent = inputData.infectedLevel;

// 	requiredXp(Data, inputData);

// 	const infWrapper = document.querySelector('.infectedOuterWrapper');
// 	inputData.infected ? infWrapper.classList.remove('disabled') : infWrapper.classList.add('disabled');
// };

// const calculate = () => {

// 	resultData.PrimaryAttribute = Stones[stoneType].attribute;
// 	resultData.PrimaryRefinementLevel = Stones[stoneType].refinementLevel[refinementLevel];
// 	resultData.PrimaryStoneGrade = Stones[stoneType].stoneGrade[Grades.indexOf(stoneGrade)];
// 	resultData.PrimaryValue =
// 		resultData.PrimaryRefinementLevel +
// 		resultData.PrimaryEqGrade +
// 		resultData.PrimaryStoneGrade +
// 		resultData.PrimaryEmpower;

// 	resultData.SecondaryAttribute = infectedAttribute;
// 	resultData.SecondaryInfectedLevel = Infected[infectedAttribute].base[infectedLevel];
// 	resultData.SecondaryEqGrade = Infected[infectedAttribute].multEq * Grades.indexOf(eqGrade);
// 	resultData.SecondaryStoneGrade = Infected[infectedAttribute].multStone * Grades.indexOf(stoneGrade);
// 	resultData.SecondaryEmpower = empower ? Infected[infectedAttribute].multEq * 15 : 0;
// 	resultData.SecondaryValue =
// 		resultData.SecondaryInfectedLevel +
// 		resultData.SecondaryEqGrade +
// 		resultData.SecondaryStoneGrade +
// 		resultData.SecondaryEmpower;
// };
