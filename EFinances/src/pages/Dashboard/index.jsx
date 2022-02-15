import MenuAppBar from "../../components/MenuAppBar";
import MuiContainer from "../../components/Container";
import InfoBox from "../../components/InfoBox";
import BoxGrid from "../../components/BoxGrid";
export default function Dashboard() {
	return (
		<>
			<MenuAppBar />
			<MuiContainer style = {{backgroundColor:'green'}} maxWidth = 'md'>
				<BoxGrid repeatCount={3}>
					<InfoBox />
					<InfoBox />
					<InfoBox />
				</BoxGrid>
			</MuiContainer>
		</>

	);
}