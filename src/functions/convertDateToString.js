import { format, parseISO } from "date-fns";

export function convertDateToString(date) {
	return format(date, 'yyyy-MM-dd HH:mm:ss');
}