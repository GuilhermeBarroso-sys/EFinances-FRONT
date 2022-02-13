import { Container } from "@mui/material";

export default function MuiContainer({children, maxWidth = 'sm', style = {}, isFixed = false}) {
	const fixed = isFixed ? 'fixed' : '';
	return (
		<Container {...fixed} maxWidth = {maxWidth} style = {style}>
			{children}
		</Container>
	);
}