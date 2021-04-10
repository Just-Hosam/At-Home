import { useState, useEffect } from "react";
import axios from "axios";
import parsePollingData from "./parsePollingData";
import PieChart from "./PieChart";

const PollsWidgetItem = (props) => {

	const dash_id = 1; // <-------- TEMP. DASHBOARD_ID FOR TESTING

  //set initial state
  const [state, setState] = useState({
		isCreate: false,
		pollsInput: '',
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


// const transitionToCreate = () => {

// 		setState((prev) => ({
//         ...prev,
//         isCreate: true
//       }));

// }

const createPoll = input => {

	if (!input || state.options.length > 0){
		return alert("Invalid Input")
	}

	for (const item in input){

		if(!input[item] || input[item === '']){
			return alert("Missing Require Field")
		}
	}


		axios.post(`/dashboards/${dash_id}/polls`, {input})
		.then((res) => {
    return axios.post(`/dashboards/${dash_id}/polls/options`, {input});
  })
  .then((final) => {
   
		setState((prev) => ({
        ...prev,
				isCreate: false,
				pollsInput: '',
        poll: [],
				options: [],
				hasVoted:false
      }));
		renderWidget();
  });
};




const castVote = index => {

	axios.post(`/dashboards/${dash_id}/polls/${index}`)
	.then((res => {
	
		setState((prev) => ({
        ...prev,
        hasVoted: true
      }));
	renderWidget();
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
	const pollingData = parsePollingData(state, createPoll, castVote);

	return (
		<section className="polls">

		<header className='header'>
		<h1>{!state.hasVoted ? pollingData.title :  "Thanks for Voting!"}</h1>
		</header>

		<h3>{!state.hasVoted ? pollingData.description : <PieChart
																											title={pollingData.title}
																											options={pollingData.options}
																										 />
		}</h3>
		
		<div>
			<h3>
				{!state.hasVoted ? pollingData.options : null}
			</h3>
		</div>

	
		<footer className='footer'>
	{state.options[0] ? 	<button onClick={() => deletePoll()}>Delete</button> : null}

		</footer>

		</section>
	);
};

export default PollsWidgetItem;