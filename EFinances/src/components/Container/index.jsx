import { Container } from "@mui/material";

export default function MuiContainer({children, maxWidth = 'sm', style = {}, isFixed = true}) {

	return (
		<Container fixed={isFixed} disableGutters = {true} maxWidth = {maxWidth} style = {style}>
			{children}
		</Container>
	);
}