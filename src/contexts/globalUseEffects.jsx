import { createContext, useState } from "react";
export const GlobalUseEffectsContext = createContext({});

export function GlobalUseEffectProvider(props) {
	const [transactions, setTransactions] = useState([]);
	
	return( 
		<GlobalUseEffectsContext.Provider value = {{
			transactions, setTransactions,
		}}>
			{props.children}  
		</GlobalUseEffectsContext.Provider>
	);
}
