/**
 * @param {Array} fields 
 */
export function requiredFieldsIsNull(fields) {
	if(fields.length === 0) {
		return true;
	}
	return fields.filter(field => field === '').length >= 1 ? true : false ;
}