// import Groceries from './widgets/Groceries';
// import usePolling from "../hooks/usePolling";
// import parsePollingData from "./Polling/parsePollingData";
import Photos from './widgets/Photos';
import Button from '@material-ui/core/Button';

const App = () => {

	// fetches current polling state from custom hook
  // const {state} = usePolling();
	// const pollingData =  parsePollingData(state.polls);
	// const pollingWidget = pollingData ? pollingData : null;

	
	return (
		<div className="App">
			{/* {pollingWidget} */}
			<Button variant="contained">Default</Button>
			<h1>hi</h1>
			<Photos />
		</div>
	);
};

export default App;
