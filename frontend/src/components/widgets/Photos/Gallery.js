import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import AddPhotoModal from './AddPhotoModal';
import useSocket from '../../../hooks/useSocket';

import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
	},

	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
}));

export default function Gallery(props) {
	const classes = useStyles();
	const [cookies] = useCookies(['userID']);
	const dashboardId = cookies.dashboardId;
	const [tileData, setTileData] = useState([]);

	//websocket connection
	const { broadcast } = useSocket();

	useEffect(() => {
		axios
			.get(`/dashboards/${dashboardId}/photos/`)
			.then((res) => setTileData(res.data))
			.catch((err) => console.log('PHOTOS COMPONENT ERROR', err));
	}, [props.childState, broadcast.photo]); // <-- listen for websocket

	const loadImage = (targetImg) => {
		props.onClick(targetImg.id);
	};

	const addNewImg = (tile) => {
		setTileData((prev) => [...prev, tile]);
	};

	return (
		<div id="gallery-comp" className={classes.root}>
			<GridList cellHeight={180} className={classes.gridList}>
				{tileData.map((tile) => (
					<GridListTile
						style={{ padding: 0 }}
						key={tile.id}
						onClick={() => loadImage(tile)}
					>
						<img src={tile.img_url} alt={tile.text} />
						<GridListTileBar title={tile.text} />
					</GridListTile>
				))}
			</GridList>
			<br />
			<AddPhotoModal addNewImg={addNewImg} />
		</div>
	);
}
