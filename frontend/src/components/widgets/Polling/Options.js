const Options = (props) => {


	return (
		
		<section className={props.picked} onClick={() => props.vote(props.id)}>
		<div className='options'>

		<div className={props.opStyle}>
		<div>{props.options}</div>
		
		<div className='vote'>
		{props.votes}
		<button className={props.hasVoted ? 'post-vote' : 'pre-vote'} disabled={props.hasVoted}>Vote</button>
		</div>
		</div>

		</div>
		</section>

	);
};

export default Options;