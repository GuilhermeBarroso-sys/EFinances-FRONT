import { MenuItem, TextField } from "@mui/material";

export default function SelectOptions({options, selectLabel, helperText, value, setValue}) {
	function helperValue(event)  {
		setValue(event.target.value);
	}
	return (
		<TextField
			id="outlined-select-currency"
			select
			label={selectLabel}
			value={value}
			onChange={helperValue}
			helperText={helperText}
		>
			{options.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
}