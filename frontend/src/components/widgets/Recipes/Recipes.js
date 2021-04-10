import React from 'react';

export default function Recipes() {
	const dashboardId = 1; // TODO: needs useContext

	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		axios
			.get(`/dashboards/${dashboardId}/groceries/`)
			.then((res) => setGroceries(res.data))
			.catch((err) => console.log('I AM A COMPONENT ERROR', err));
	}, []);

	return (
		<div id="widget-recipes">
			<h2>Recipes</h2>
		</div>
	);
}
