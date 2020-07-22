export const getInputData = (e, inputElementsDOM, inputData) => {
  const [
    eqTypeWeapon,
    eqTypeArmor,
    eqTypeBelt,
    eqTypeRing,
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

  inputData.eqTypeWeapon = eqTypeWeapon.checked;
  inputData.eqTypeArmor = eqTypeArmor.checked;
  inputData.eqTypeBelt = eqTypeBelt.checked;
  inputData.eqTypeRing = eqTypeRing.checked;
  inputData.empower = empower.checked;
  inputData.infected = infected.checked;
  inputData.stoneType = stoneType.value;
  inputData.eqGrade = eqGrade.value;
  inputData.stoneGrade = stoneGrade.value;
  inputData.infectedAttribute = infectedAttribute.value;

  console.log(inputData);
};
