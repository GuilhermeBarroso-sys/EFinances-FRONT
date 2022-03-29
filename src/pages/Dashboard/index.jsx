import MenuAppBar from "../../components/MenuAppBar";
import MuiContainer from "../../components/Container";
import InfoBox from "../../components/InfoBox";
import Box from "../../components/Box";
import MarginTop from "../../components/MarginTop";
import ArrowUp from '@mui/icons-material/ArrowCircleUp';
import ArrowDown from '@mui/icons-material/ArrowCircleDown';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DataTable from "../../components/DataTable";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {addButton} from './styles.module.scss';
import ReactModal from '../../components/ReactModal';
import {useContext, useState} from 'react';
import NewTransaction from "../../components/NewTransaction";
import { AuthContext } from "../../contexts/authentication";
import { LinearProgressContext } from "../../contexts/linearProgress";
import { CircularProgress } from "@mui/material";
export default function Dashboard() {
	const {isAuthenticated} = useContext(AuthContext);
	const {isLoading} = useContext(LinearProgressContext);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	return (
		<>
			{/** Modal content New Transaction */}
			{isAuthenticated()}
			<ReactModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
				<NewTransaction modal = {setModalIsOpen}/>
			</ReactModal>
			<MenuAppBar />
			<MarginTop margin={`3rem`}/>

			{/** Dashboard */}
			<MuiContainer  maxWidth = 'lg' isFixed = {true} >
				<Box >
					<InfoBox title = {'Entrada'} icon = {<ArrowUp style = {{color: 'var(--green)'}}/>} body = {'R$ 1500.00'} />
					<InfoBox title = {'Saida'} icon = {<ArrowDown style = {{color: 'var(--red)'}}/>} body = {'R$ 1300.00'}/>
					<InfoBox title = {'Total'} icon = {<MonetizationOnIcon style = {{color: 'var(--shape)'}}/>} body = {'R$ 200.00'} titleColor = {'white'} bodyColor = {'var(--shape)'}  style = {{backgroundColor: 'var(--green)'}}/>
				</Box>
				<MarginTop margin={`3rem`}/>

			</MuiContainer>

			{/** Datatable */}
			<MuiContainer maxWidth = 'lg'>
				{isLoading ? <CircularProgress disabled /> :<AddCircleIcon onClick = {() => {setModalIsOpen(true);}} className = {addButton}  fontSize = "large"/>}
				<MarginTop margin={`1rem`} />
				<DataTable />
			</MuiContainer>
		</>

	);
}