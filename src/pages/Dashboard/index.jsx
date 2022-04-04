import MenuAppBar from "../../components/MenuAppBar";
import MuiContainer from "../../components/Container";
import InfoBox from "../../components/InfoBox";
import Box from "../../components/Box";
import MarginTop from "../../components/MarginTop";
import ArrowUp from '@mui/icons-material/ArrowCircleUp';
import ArrowDown from '@mui/icons-material/ArrowCircleDown';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {addButton} from './styles.module.scss';
import ReactModal from '../../components/ReactModal';
import {useContext, useState} from 'react';
import NewTransaction from "../../components/NewTransaction";
import { AuthContext } from "../../contexts/authentication";
import { GlobalLoadingContext } from "../../contexts/globalLoading";
import { CircularProgress } from "@mui/material";
import { Transactions } from "../../components/Transactions";
import { getIncomeSum } from "../../functions/getIncomeSum";
export default function Dashboard() {
	const {isAuthenticated} = useContext(AuthContext);
	const {isLoading} = useContext(GlobalLoadingContext);
	const {transactions} = useContext(GlobalLoadingContext);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	return (
		<>
			{/** Modal content New Transaction */}
			{isAuthenticated()}
			<ReactModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
				<NewTransaction modal = {setModalIsOpen} />
			</ReactModal>
			<MenuAppBar />
			<MarginTop margin={`3rem`}/>

			{/** Dashboard */}
			<MuiContainer  maxWidth = 'lg' isFixed = {true} >
				<Box >
					<InfoBox title = {'Entrada'} icon = {<ArrowUp style = {{color: 'var(--green)'}}/>} body = {getIncomeSum(transactions)} />
					<InfoBox title = {'Saida'} icon = {<ArrowDown style = {{color: 'var(--red)'}}/>} body = {'R$ 1300.00'}/>
					<InfoBox title = {'Total'} icon = {<MonetizationOnIcon style = {{color: 'var(--shape)'}}/>} body = {'R$ 200.00'} titleColor = {'white'} bodyColor = {'var(--shape)'}  style = {{backgroundColor: 'var(--green)'}}/>
				</Box>
				<MarginTop margin={`3rem`}/>

			</MuiContainer>

			{/** Datatable */}
			<MuiContainer maxWidth = 'lg'>
				{isLoading ? <CircularProgress disabled /> :<AddCircleIcon onClick = {() => {setModalIsOpen(true);}} className = {addButton}  fontSize = "large"/>}
				<MarginTop margin={`1rem`} />
			
				<Transactions />
			</MuiContainer>
		</>

	);
}