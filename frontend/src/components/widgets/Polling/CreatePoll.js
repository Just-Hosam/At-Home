import { useState } from "react";
const CreatePoll = (props) => {

const [input, setInput] = useState({
	title: '',
	description: '',
	option1: '',
	option2: '',
	option3: '',
});

	return (
		
		<section className='create-poll'>
	
		<form id="poll-input" onSubmit={(event) => event.preventDefault()}>			
				<input
					type="text"
					placeholder="title"
					value={input.title}
					onChange={(event) => setInput((prev) => ({
					...prev,
					title: event.target.value
					}))}
				/>
				<input
					type="text"
					placeholder="description"
					value={input.description}
					onChange={(event) => setInput((prev) => ({
					...prev,
					description: event.target.value
					}))}
				/>
				<input
					type="text"
					placeholder='option 1'
					value={input.option1}
					onChange={(event) => setInput((prev) => ({
					...prev,
					option1: event.target.value
      	}))}
				/>
				<input
				type="text"
					placeholder='option 2'
					value={input.option2}
					onChange={(event) => setInput((prev) => ({
					...prev,
					option2: event.target.value
					}))}
				/>
				<input
					type="text"
					placeholder='option 3'
					value={input.option3}
					onChange={(event) => setInput((prev) => ({
					...prev,
					option3: event.target.value
					}))}
				/>

			</form>
		<button onClick={() => props.createPoll(input)}>Post</button>
		</section>

	);
};

export default CreatePoll;