import { parse } from "date-fns";

export function convertStringToDate(dateString) {
	return parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
}