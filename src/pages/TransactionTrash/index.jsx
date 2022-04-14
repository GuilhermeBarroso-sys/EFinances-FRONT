import MenuAppBar from "../../components/MenuAppBar";
import MuiContainer from "../../components/Container";
import MarginTop from "../../components/MarginTop";
import {useContext, useEffect} from 'react';
import { AuthContext } from "../../contexts/authentication";
import styles from './styles.module.scss';
import {Trash} from '../../components/Trash';
export function TransactionTrash() {
	const {isAuthenticated} = useContext(AuthContext);
	useEffect(() => {
	});
	return (
		<div className={styles.trashPage}>
			{/** Modal content New Transaction */}
			{isAuthenticated()}

			<MenuAppBar />
      

			{/** Dashboard */}
			<MarginTop margin={`6rem`}/>
			<h1>Transações deletadas</h1> 
			{/** Datatable */}
			<MuiContainer maxWidth = 'lg'>
			
				<MarginTop margin={`1rem`} />
			
				<Trash />
			</MuiContainer>
		</div>
	);
} 