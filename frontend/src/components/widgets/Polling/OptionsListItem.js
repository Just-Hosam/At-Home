const OptionsListItem = (props) => {


	return (
		
		<section>
		<div className='options'>
		<div>{props.options}</div>

		<div className='vote'>
		{props.votes}
		<button disabled={props.hasVoted} onClick={() => props.vote(props.id)}>Vote</button>
		</div>
		</div>
		</section>

	);
};

export default OptionsListItem;