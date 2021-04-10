import OptionsListItem from './OptionsListItem';

const OptionsList = (props) => {

	return (
		
	<OptionsListItem
		options={props.options}
		votes={props.votes}
  />
	);
};

export default OptionsList;