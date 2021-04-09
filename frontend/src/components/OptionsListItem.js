const OptionsListItem = (props) => {

const onVote = () => {
	alert("Democracy coming soon...");
}

	return (
		
		<section>
		<div className='options'>
		<div>{props.options}</div>

		<div className='vote'>
		{props.votes}
		<button onClick={() => onVote()}>Vote</button>
		</div>
		</div>
		</section>

	);
};

export default OptionsListItem;