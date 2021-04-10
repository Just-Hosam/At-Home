import Groceries from './widgets/Groceries'; // will be added later
import usePolling from "../hooks/usePolling";
import parsePollingData from "./Polling/parsePollingData";

const App = () => {

	//fetches current polling state from custom hook
  const {state} = usePolling();
	const pollingData =  parsePollingData(state.polls);
	const pollingWidget = pollingData ? pollingData : null;

	
	return (
		<div className="App">
		{pollingWidget}
		</div>
	);
};

export default App;
