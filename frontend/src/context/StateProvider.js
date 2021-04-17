import { createContext, useState } from 'react';

export default function StateProvider(props) {
	// TODO: change base value for dashboardId to 0
	const [dashboardId, setDashboardId] = useState(1);

	const stateData = { dashboardId, setDashboardId };

	return (
		<stateContext.Provider value={stateData}>
			{props.children}
		</stateContext.Provider>
	);
}

export const stateContext = createContext();
