import { createContext, useEffect, useState } from "react";
export const GlobalUseEffectsContext = createContext({});

export function GlobalUseEffectProvider(props) {
	const [transactions, setTransactions] = useState([]);
	const [transactionsData, setTransactionsData] = useState([]);
	const [transactionsDataIsLoading, setTransactionsDataIsLoading] = useState([]);

	useEffect(() => {
		if(transactionsData.length != 0) {
			setTransactionsDataIsLoading(false);
		}
	}, [transactionsData]);
	
	return( 
		<GlobalUseEffectsContext.Provider value = {{
			transactions, setTransactions,
			transactionsData, setTransactionsData,
			transactionsDataIsLoading, setTransactionsDataIsLoading
		}}>
			{props.children}  
		</GlobalUseEffectsContext.Provider>
	);
}
