import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';
// import tileData from './tileData';

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

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
// const genCols = () => {
//   axios
//     .get(`/dashboards/${dashboardId}/photos/`)
// };

export default function Gallery() {
  const classes = useStyles();
  const dashboardId = 1;
  const photoId = null;
  const [tileData, setTileData] = useState([]);

  useEffect(() => {
    axios
      .get(`/dashboards/${dashboardId}/photos/`)
      .then((res) => setTileData(res.data))
      .catch((err) => console.log('PHOTOS COMPONENT ERROR', err));
  }, []);

  const loadImage = (i) => {
    axios
      .get(`/dashboards/${dashboardId}/photos/${photoId}`)
  }
  


  return (
    <>
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img_url} cols={tile.cols || 1}>
            <img src={tile.img_url} alt={tile.text} />
          </GridListTile>
        ))}
      </GridList>
    </div>
    <br></br>
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
        {tileData.map((tile) => (
          <GridListTile key={tile.img_url} onClick={()=>console.log(`image ${tile.id}`)}>
            <img src={tile.img_url} alt={tile.text} />
            <GridListTileBar
              title={tile.text}
              // subtitle={<span>by: {tile.author}</span>}
              // actionIcon={
              //   <IconButton
              //     aria-label={`info about ${tile.title}`}
              //     className={classes.icon}
              //   >
              //     <InfoIcon />
              //   </IconButton>
              // }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  </>
  );
}


// import React, { useEffect, useState } from 'react';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import MobileStepper from '@material-ui/core/MobileStepper';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import axios from 'axios';

// const tutorialSteps = [
//   {
//     label: 'San Francisco – Oakland Bay Bridge, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bird',
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bali, Indonesia',
//     imgPath:
//       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
//   },
//   {
//     label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Goč, Serbia',
//     imgPath:
//       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ];

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 400,
//     flexGrow: 1,
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     height: 50,
//     paddingLeft: theme.spacing(4),
//     backgroundColor: theme.palette.background.default,
//   },
//   img: {
//     height: 255,
//     maxWidth: 400,
//     overflow: 'hidden',
//     display: 'block',
//     width: '100%',
//   },
// }));

// export default function Photos() {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
  
//   const dashboardId = 1; // TODO: needs useContext
//   const [photos, setPhotos] = useState([]);
//   const maxSteps = photos.length;

// 	useEffect(() => {
// 		axios
// 			.get(`/dashboards/${dashboardId}/photos/`)
// 			.then((res) => {
//         console.log('setState', res.data)
//         setPhotos(res.data)
//       })
// 			.catch((err) => console.log('PHOTOS COMPONENT ERROR', err));
// 	}, []);
//   console.log(photos)
//   console.log(activeStep)
//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   return (
//     <div className={classes.root}>
//       <Paper square elevation={0} className={classes.header}>
//         <Typography>{maxSteps > 0 && photos[activeStep].text}</Typography>
//       </Paper>
//       <img
//         className={classes.img}
//         src={maxSteps > 0 && photos[activeStep].img_url}
//         alt={maxSteps > 0 && photos[activeStep].text}
//       />
//       <MobileStepper
//         steps={maxSteps}
//         position="static"
//         variant="text"
//         activeStep={activeStep}
//         nextButton={
//           <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
//             Next
//             {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//           </Button>
//         }
//         backButton={
//           <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
//             {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//             Back
//           </Button>
//         }
//       />
//     </div>
//   );
// }
