import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import AddPhotoModal from './AddPhotoModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function Gallery(props) {
  const classes = useStyles();
  const dashboardId = 1;
  const [tileData, setTileData] = useState([]);

  useEffect(() => {
    axios
      .get(`/dashboards/${dashboardId}/photos/`)
      .then((res) => setTileData(res.data))
      .catch((err) => console.log('PHOTOS COMPONENT ERROR', err));
  }, []);

  const loadImage = (targetImg) => {
    props.onClick(targetImg.id)
  }

  const addNewImg = (tile) => {
    setTileData((prev) => [...prev, tile]);
  }
  
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {tileData.map((tile) => (
          <GridListTile key={tile.id} onClick={() => loadImage(tile)}>
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
