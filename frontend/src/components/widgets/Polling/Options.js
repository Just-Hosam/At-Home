import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
const Options = (props) => {


	return (
		
		<section className={props.picked} onClick={() => props.vote(props.id)}>
		<div className='options'>

		<div className={props.opStyle}>
		<div>{props.options}</div>
		
		<div className='vote'>
		{props.votes}
		<ThumbUpAltIcon className={props.hasVoted ? 'post-vote' : 'pre-vote'} disabled={props.hasVoted}></ThumbUpAltIcon>
		</div>
		</div>

		</div>
		</section>

	);
};

export default Options;