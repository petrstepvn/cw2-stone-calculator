export const thousandSeparator = (number) => {
	return number.toLocaleString('en-GB').replace(/,/g, ' ');
};
