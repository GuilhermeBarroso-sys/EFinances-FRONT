import { LinearProgress } from "@mui/material";
import { createContext, useState } from "react";
export const GlobalLoadingContext = createContext({});

export function GlobalLoadingProvider(props) {
	const [isLoading, setIsLoading] = useState(false);
	
	return( 
		<GlobalLoadingContext.Provider value = {{isLoading, setIsLoading}}>
			{isLoading && <LinearProgress />}
			{props.children}  
		</GlobalLoadingContext.Provider>
	);
}
