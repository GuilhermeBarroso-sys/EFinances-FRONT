import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
const localeMap = {
	ptBr: brLocale
};
ReactDOM.render(
	<React.StrictMode>
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap['ptBr']}>
			<App />
		</LocalizationProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
