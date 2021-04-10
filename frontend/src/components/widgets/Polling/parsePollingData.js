import OptionsList from './OptionsList';
import CreatePoll from './CreatePoll';

export default function parsePollingData(state, createPoll, castVote){

let data = {
  id: 1,
  title: "Create A New Poll",
  description: <CreatePoll
  createPoll={createPoll}
  />,
  options: null
}

if(state.options[0]) {

data.title = state.poll[0].title;
data.description = state.poll[0].description;

data.options = state.options.map((o,index) => {

	return(
		<OptionsList
		key={index}
		index={o.id}
		options={o.choice}
		votes={o.votes}
    vote={() => castVote(o.id)}
    hasVoted={state.hasVoted}
  />
	)
});
}

  return data;

}

