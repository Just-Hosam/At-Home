import OptionsListItem from './OptionsListItem';

const OptionsList = (props) => {

	return (
		
	<OptionsListItem
		index={props.index}
		options={props.options}
		votes={props.votes}
		vote={props.vote}
		hasVoted={props.hasVoted}
  />
	);
};

export default OptionsList;