import { inputData, resultData } from './index';
import Data from './data.json';

export const calculateResult = () => {
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
	if (currentStone.attribute2 && sg) {
		resultData.PrimaryAttribute = currentStone.attribute2;
		resultData.PrimaryRefinementLevel = 0;
	}
	resultData.PrimaryEqGrade = currentStone.multEq * eg;
	resultData.PrimaryStoneGrade = currentStone.multStone * sg;
	resultData.PrimaryEmpower = empower ? currentStone.multEq * 15 : 0;
	if (currentStone.name === 'Stone of Empower') {
		resultData.PrimaryEqGrade = currentStone.eqGrade[eg];
		resultData.PrimaryStoneGrade = currentStone.stoneGrade[sg];
		resultData.PrimaryEmpower = 0;
	}
	resultData.PrimaryValue =
		resultData.PrimaryRefinementLevel +
		resultData.PrimaryEqGrade +
		resultData.PrimaryStoneGrade +
		resultData.PrimaryEmpower;

	resultData.SecondaryAttribute = infectedAttribute;
	resultData.SecondaryInfectedLevel = currentInfected.base[ilvl];
	resultData.SecondaryEqGrade = currentInfected.multEq * eg;
	resultData.SecondaryStoneGrade = currentInfected.multStone * sg;
	resultData.SecondaryEmpower = empower ? currentInfected.multEq * 15 : 0;
	resultData.SecondaryValue =
		resultData.SecondaryInfectedLevel +
		resultData.SecondaryEqGrade +
		resultData.SecondaryStoneGrade +
		resultData.SecondaryEmpower;

};
