import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import 'sweetalert2/src/sweetalert2.scss';
import ReactDOM from 'react-dom';
import "./global/styles.module.scss";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AuthProvider } from './contexts/authentication';
import { GlobalLoadingProvider } from './contexts/globalLoading';
import { GlobalUseEffectProvider } from './contexts/globalUseEffects';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import 'react-notifications-component/dist/theme.css';
import { ReactNotifications } from 'react-notifications-component';
const localeMap = {
	ptBr: brLocale
};
ReactDOM.render(
	<React.StrictMode>
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap['ptBr']}>
			<GlobalLoadingProvider>
				<GlobalUseEffectProvider>
					<AuthProvider>
						<ReactNotifications />
						<BrowserRouter>
							<Routes>
								<Route path = '/' element = {<Navigate to = '/dashboard'/>}/>
								<Route path="/dashboard"  element={<Dashboard/>} />
								<Route path="/register" element={<Register/>} />
								<Route path="/login" element={<Login />} />				
								{/* <Route path="/transactions/trash" element={<TransactionTrash/> } /> */}
							</Routes>
						</BrowserRouter>
					</AuthProvider>
				</GlobalUseEffectProvider>
			</GlobalLoadingProvider>
		</LocalizationProvider>
	</React.StrictMode>,
	document.getElementById('root')
);