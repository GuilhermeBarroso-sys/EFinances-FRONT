export function returnMoneyFormat( value, currency = 'R$') {
	const format = `${currency} ${value}`;
	return format;
}