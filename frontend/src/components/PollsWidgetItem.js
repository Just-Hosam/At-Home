const PollsWidgetItem = (props) => {

	return (
		<section className="polls">

		<div className='header'>
		<h1>{props.title}</h1>
		</div>
		<h3>{props.description}</h3>
		
		<div>
			<h3>
				{props.options}
			</h3>
		</div>
	
		</section>
	);
};

export default PollsWidgetItem;