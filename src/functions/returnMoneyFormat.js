export function returnMoneyFormat( value, currency = 'R$') {
	const format = `${currency} ${value.toFixed(2)}`;
	return currency == 'R$' ? format.replace('.', ',') : format;
}