import { createContext, useState } from "react";
export const GlobalUseEffectsContext = createContext({});

export function GlobalUseEffectProvider(props) {
	const [transactions, setTransactions] = useState([]);
	const [transactionsData, setTransactionsData] = useState([]);
	
	return( 
		<GlobalUseEffectsContext.Provider value = {{
			transactions, setTransactions,
			transactionsData, setTransactionsData
		}}>
			{props.children}  
		</GlobalUseEffectsContext.Provider>
	);
}
