import PollsWidgetItem from './PollsWidgetItem';

const PollsWidget = (props) => {

	return (
		
	<PollsWidgetItem
		title={props.title}
		description={props.description}
		options={props.options}
		votes={props.votes}
  />
	);
};

export default PollsWidget;