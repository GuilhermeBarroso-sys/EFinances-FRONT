import { LinearProgress } from "@mui/material";
import { createContext, useState } from "react";
export const LinearProgressContext = createContext({});

export function LinearProgressProvider(props) {
	const [isLoading, setIsLoading] = useState(false);
	
	return( 
		<LinearProgressContext.Provider value = {{setIsLoading}}>
			{isLoading && <LinearProgress />}
			{props.children}  
		</LinearProgressContext.Provider>
	);
}
