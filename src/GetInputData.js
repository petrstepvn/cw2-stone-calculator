export const getInputData = (e, inputElementsDOM, inputData) => {
	const [
		stoneType,
		refinementLevel,
		refinementLevelSlider,
		eqGrade,
		stoneGrade,
		empower,
		infected,
		infectedAttribute,
		infectedLevel,
		infectedLevelSlider,
	] = inputElementsDOM;

	if (e.target.id === 'refinementLevel')
		inputData.refinementLevel = parseInt(refinementLevel.value);
	if (e.target.id === 'refinementLevelSlider')
		inputData.refinementLevel = parseInt(refinementLevelSlider.value);
	if (e.target.id === 'infectedLevel')
		inputData.infectedLevel = parseInt(infectedLevel.value);
	if (e.target.id === 'infectedLevelSlider')
		inputData.infectedLevel = parseInt(infectedLevelSlider.value);

	inputData.stoneType = stoneType.value;
	inputData.eqGrade = eqGrade.value;
	inputData.stoneGrade = stoneGrade.value;
	inputData.empower = empower.checked;
	inputData.infected = infected.checked;
	inputData.infectedAttribute = infectedAttribute.value;

	console.log(inputData);
};
