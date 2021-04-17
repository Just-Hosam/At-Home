import Options from './Options';

export default function parsePollingData(state, castVote){

let data = {}
if(state.options && state.options[0]) {

data.title = state.poll.title;
data.description = state.poll.description;

data.options = state.options.map((o,index) => {

const picked = state.picked === o.choice ? 'picked' : null;
const opStyle = state.hasVoted ? 'post-vote-option' : 'pre-vote-option';

	return(
		<Options
		key={index}
    index={o.id}
    picked={picked}
    opStyle={opStyle}
		options={o.choice}
		votes={o.votes}
    vote={() => castVote(o.id, o.choice)}
    hasVoted={state.hasVoted}
  />
  
	)
});
}

  return data;

}

