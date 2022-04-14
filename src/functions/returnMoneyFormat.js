export function returnMoneyFormat(value = 0.00, currency = 'R$') {
	const handleValue = typeof(value) == 'string' ? parseFloat(value) : value;
	const fixManyDecimal = parseFloat(handleValue.toFixed(2));
	const format = `${currency} ${fixManyDecimal}`;
	return format;
}