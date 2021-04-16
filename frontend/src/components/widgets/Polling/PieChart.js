import Chart from "react-google-charts";
const PieChart = (props) => {
	
	let title = "No Polling Data";
	let pieParams = ['...','...','...'];

	let pie = {
		option: 'Empty',
		votes: 0
	}

if (props.options){

	
	 title =  props.title;

	 //map params
	 pieParams = props.options.map(o => {
		
		 pie = {
			 option: o.choice ? o.choice : '...',
			 votes: o.votes ? o.votes : 0
		 }

		return pie;
	})
}

	return (
		
	<Chart
  width={'300px'}
  height={'200px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Options', 'Votes'],
    [pieParams[0].option, pieParams[0].votes],
    [pieParams[1].option, pieParams[1].votes],
		[pieParams[2].option, pieParams[2].votes],
  ]}
  options={{
		
    title: title.title,
    is3D: true,
		colors: ['rgb(96, 83, 247)', 'rgb(128, 118, 251)', 'rgb(160, 153, 255)'],
		 
		titleTextStyle: {
		
			fontSize: 16, 
		
	}
		
  }}
  rootProps={{ 'data-testid': '2' }}
/>

	);
};

export default PieChart;