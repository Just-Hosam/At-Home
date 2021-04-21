import Chart from "react-google-charts";
import { useCookies } from 'react-cookie';

const PieChart = (props) => {

	const [cookies] = useCookies(['userID']);

	const theme = cookies.theme.includes('DARK') ?
	{
		font: '#fff',
		background:'#2c303a' 
	}
	:
	{
		font: '#2c303a',
		background:'#fff' 
	};

	const colorOptions = [
		['#8076fb', '#9a92fa', '#bdb7fa'],
		['#1b8fee','#2fa2ff','#78c2fe'],
		['#e2a54a','#d39a45','#c99b55'],
		['#c96784','#cc5276','#f786a8']
	];

	let i = 0;
	switch(cookies.theme){
		case 'LIGHT_PURPLE':
		i = 0
		break;
		case 'LIGHT_BLUE':
		i = 1
		break;
		case 'DARK_YELLOW':
		i = 2
		break;
		case 'DARK_PINK':
		i = 3
		break;
		default:
		i = 0;
	}
	


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
		
    title: null,
    is3D: true,
		colors: [colorOptions[i][0],colorOptions[i][1],colorOptions[i][2]],
		color:theme.font,
		backgroundColor: theme.background,
		titleTextStyle: {
			color: theme.font,
			fontSize: 18, 
	},
	legend: {
		textStyle: {
				color: theme.font,
				fontWeight: 'normal'
		}
}
		
  }}
  rootProps={{ 'data-testid': '2' }}
/>

	);
};

export default PieChart;