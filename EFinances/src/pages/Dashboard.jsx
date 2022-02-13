import MenuAppBar from "./components/MenuAppBar";
import MuiContainer from "./components/Container";
export default function Dashboard() {
	return (
		<>
			<MenuAppBar />
			<MuiContainer style = {{backgroundColor:'green'}} maxWidth = 'md'>
				<div> Hello World!</div>
			</MuiContainer>
		</>
	);
}