import { useState, useEffect } from "react";
import axios from "axios";
import parsePollingData from "./Polling/parsePollingData";

const PollsWidgetItem = (props) => {

	const dash_id = 1; // <-------- TEMP. DASHBOARD_ID FOR TESTING

  //set initial state
  const [state, setState] = useState({
		isCreate: false,
		poll: [],
    options: [],
		hasVoted: true
  });

  //fetch polling data on inital render
  useEffect(() => {
    Promise.all([
			axios.get(`/dashboards/${dash_id}/polls`),
			axios.get(`/dashboards/${dash_id}/polls/options`)
    ]).then((all) => {

      setState((prev) => ({
        ...prev,
        poll: all[0].data,
				options: all[1].data,
				hasVoted:false
      
      }));
     
    });
  }, []);



const renderWidget = () => {

	Promise.all([
			axios.get(`/dashboards/${dash_id}/polls`),
			axios.get(`/dashboards/${dash_id}/polls/options`)
    ]).then((all) => {

      setState((prev) => ({
        ...prev,
        poll: all[0].data,
				options: all[1].data,
			
      }));
     
    }).catch(err => console.log(err));
};


const transitionToCreate = () => {

		setState((prev) => ({
        ...prev,
        isCreate: true
      }));

}


const castVote = index => {

	axios.post(`/dashboards/${dash_id}/polls/${index}`)
	.then((res => {
	
		renderWidget();
		setState((prev) => ({
        ...prev,
        hasVoted: true
      }));

	})
	).catch(err => console.log(err));
}


const deletePoll = admin => {  // <-------- ADD ADMIN PROTECTION

	if(!admin){
		return alert("You do not have delete privlages.")
	}
	
		Promise.all([
			axios.delete(`/dashboards/${dash_id}/polls`),
			axios.delete(`/dashboards/${dash_id}/polls/options`)
    ]).then((all) => {

      setState((prev) => ({
        ...prev,
        poll: [],
				options: [],
				hasVoted: false
			
      }));

    }).catch(err => console.log(err));
}


//parse polling data for UI
	const pollingData = parsePollingData(state, castVote);

	return (
		<section className="polls">

		<header className='header'>
		<h1>{!state.hasVoted ? pollingData.title :  "Thanks for Voting!"}</h1>
		</header>

		<h3>{!state.hasVoted ? pollingData.description : "PIE CHART"}</h3>
		
		<div>
			<h3>
				{pollingData.options}
			</h3>
		</div>

	
		<footer className='footer'>
	{state.options[0] ? 	<button onClick={() => deletePoll()}>Delete</button> : null}
		</footer>

		</section>
	);
};

export default PollsWidgetItem;