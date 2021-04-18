import { useState } from "react";
import TextField from '@material-ui/core/TextField';

const CreatePoll = (props) => {

const [error, setError] = useState({
	title: false,
	option1: false,
	option2: false,
	option3: false
});

const [input, setInput] = useState({
	title: '',
	description: 'placeholder',
	option1: '',
	option2: '',
	option3: '',
});

const validateInput = createPoll => {

	for (const item in input){

		setError({
			title: false,
			option1: false,
			option2: false,
			option3: false
		})
	
		if(input[item] === ''){
	
			setError((prev) => ({
				...prev,
				[item] : true,
			}));

		return;
		}

	}
	
	return createPoll(input)
};


	return (
		
		<section className='create-poll'>

		<form id="poll-input" onSubmit={(event) => event.preventDefault()}>	

<h1>Create Poll</h1>
		<TextField
			key='0'
			className={'create-poll-input'}
			error={error.title}
			margin='dense'
			label="Question..."
			variant="outlined"
			type="text"
			autoComplete="off"
			value={input.title ? input.title : ''}
			onChange={(event) => setInput((prev) => ({
			...prev,
			title: event.target.value
			}))}
		
		/>	


		<TextField
			key='1'
			className={'create-poll-input'}
			error={error.option1}
			margin='dense'
			size="small"
			label="Option 1"
			type="text"
			variant="outlined"
			autoComplete="off"
			value={input.option1 ? input.option1 : ''}
			onChange={(event) => setInput((prev) => ({
			...prev,
			option1: event.target.value
			}))}
		
		/>	

<TextField
			key='2'
			className={'create-poll-input'}
			error={error.option2}
			margin='dense'
			size="small"
			label="Option 2"
			type="text"
			variant="outlined"
			autoComplete="off"
			value={input.option2 ? input.option2 : ''}
			onChange={(event) => setInput((prev) => ({
			...prev,
			option2: event.target.value
			}))}
			
		/>
				
				<TextField
			key='3'
			className={'create-poll-input'}
			error={error.option3}
			margin='dense'
			size="small"
			label="Option 3"
			type="text"
			variant="outlined"
			autoComplete="off"
			value={input.option3 ? input.option3 : ''}
			onChange={(event) => setInput((prev) => ({
			...prev,
			option3: event.target.value
			}))}
		
		/>
			
			</form>
		<button onClick={() => validateInput(props.createPoll)}>Create</button>
		</section>
// props.createPoll(input)
	);
};

export default CreatePoll;