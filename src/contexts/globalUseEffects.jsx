import { LinearProgress } from "@mui/material";
import { createContext, useState } from "react";
export const GlobalUseEffect = createContext({});

export function LinearProgressProvider(props) {
	const [isLoading, setIsLoading] = useState([]);
	
	return( 
		<GlobalUseEffect.Provider value = {{
			isLoading, setIsLoading,
		}}>
			{props.children}  
		</GlobalUseEffect.Provider>
	);
}
