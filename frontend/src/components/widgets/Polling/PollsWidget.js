import { useState, useEffect } from "react";
import axios from "axios";
import parsePollingData from "./parsePollingData";
import PieChart from "./PieChart";
import CreatePoll from "./CreatePoll";


import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from '@material-ui/icons/Delete';
import PieChartIcon from '@material-ui/icons/PieChart';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const useStyles = makeStyles(theme => ({
    dialogPaper: {
       width : '400px'
		},
		
		pieIcon: {
			
			color: 'grey',
			'&:hover': {
				cursor: 'pointer',
				color: "#06aff5",
		 },
		},

		deleteIcon: {
			color: 'grey',
			'&:hover': {
				cursor: 'pointer',
       color: "red",
		},
	}

}));

const PollsWidgetItem = (props) => {
const classes = useStyles();
	const dash_id = 1; // <-------- TEMP. DASHBOARD_ID FOR TESTING

	//set initial state
	const [mode, setMode] = useState('INIT')
  const [state, setState] = useState({
		poll: {},
		options: [],
		hasVoted: true,
		picked: null
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

//create a new poll
const createPoll = input => {

	if (!input){
		return alert("Invalid Input")
	}

	for (const item in input){

		if(!input[item] || input[item] === ''){
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
        poll: {},
				options: [],
				hasVoted:false
      }));
		renderWidget();
  }).catch(err => console.log(err));
};

const createMode = () => {
	
setMode(null);

}

const addOrCreate = mode === "INIT" 
? 
<AddCircleIcon className='add-poll-icon'
style={{ fontSize: 80 }}
onClick={() => createMode()}/>
: 
<CreatePoll
createPoll={createPoll}
/>;



//vote on the poll
const castVote = (index, choice) => {

	axios.post(`/dashboards/${dash_id}/polls/${index}`)
	.then((res => {

		setTimeout(function(){
			showPie();
		},500)


		setState((prev) => ({
        ...prev,
				hasVoted: true,
				picked: choice
			}));
	
	
	renderWidget();
	})
	).catch(err => console.log(err));
}


//delete the entire poll
const deletePoll = admin => {  // <-------- ADD ADMIN PROTECTION

		const confirmation = window.confirm("Are you sure you want to delete this poll?\nThis action cannot be undone.");

	if(!confirmation) {
		return;
	}
	
		Promise.all([
			axios.delete(`/dashboards/${dash_id}/polls`),
			axios.delete(`/dashboards/${dash_id}/polls/options`)
    ]).then((all) => {

      setState((prev) => ({
        ...prev,
        poll: {},
				options: [],
				hasVoted: false
      }));

    }).catch(err => console.log(err));
}


//shows the pie chart
 const [open, setOpen] = React.useState(false);

  const showPie = () => {
	
		setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


const dialogBtns = state.options.length < 1 ? null : 
<div className='footer-icons'>
		
<PieChartIcon
			className={classes.pieIcon}
			onClick={showPie}
		/>
<DeleteIcon
		className={classes.deleteIcon}
		onClick={deletePoll}
/>
</div>


//parse polling data for UI
const pollingData = parsePollingData(state, castVote);

	return (
		<section className="polls">
		
		<div className='header-wrapper'>
		<header className='header'>
		<h1>{pollingData.options ? pollingData.title : "Create New Poll"}</h1>
		<h2>{pollingData.options ? pollingData.description : null}</h2>
		</header>
		</div>

		<div>
			<h3>
				{pollingData.options ? pollingData.options : addOrCreate}
			</h3>
		</div>

	
  {dialogBtns}
		
      <Dialog
			 classes={{ paper : classes.dialogPaper}}
        open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{pollingData.title}</DialogTitle>
        <DialogContent>
         
            <PieChart
						title={pollingData.description}
						options={pollingData.options}
						/>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    
		

		</section>
	);
};

export default PollsWidgetItem;