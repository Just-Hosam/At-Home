import PollsWidget from '../PollsWidget';
import OptionsList from '../OptionsList';
export default function parsePollingData(data){

let polling = <PollsWidget
key={1}
title={"Create New Poll"}
options={<button onClick={() => alert("Add universal create new widget component here...")}>+</button>}
/>;

if (data[0]){

 const options = data.map((o, index) => {
  return(
    <OptionsList
    key={index}
    options={o.choice}
    votes={o.votes}
    />
  )
})

polling = <PollsWidget
key={1}
title={data[0].title}
description={data[0].description}
options={options}
/>

}

  return polling;

}