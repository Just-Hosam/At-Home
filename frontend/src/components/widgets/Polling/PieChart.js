import Chart from "react-google-charts";
const PieChart = (props) => {


	let title = "No Polling Data";
	let pieParams = ['...','...','...'];

	let pie = {
		option: 'Empty',
		votes: 0
	}

if (props.options){
	 title = props.title ? props.title : "No title found...";

	 pieParams = props.options.map(o => {

		 pie = {
			 option: o.props.options,
			 votes: o.props.votes
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
    title: title,
    is3D: true,
		 colors: ['#06aff5', '0066aa', '#227da3']
		
  }}
  rootProps={{ 'data-testid': '2' }}
/>

	);
};

export default PieChart;