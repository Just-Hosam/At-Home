import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '90vh',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    maxHeight: '70vh',
    display: 'block',
    objectFit: 'contain',
  },
}));

export default function Photos(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  
  const dashboardId = 1; // TODO: needs useContext
  const [photos, setPhotos] = useState([]);
  const maxSteps = photos.length;

	useEffect(() => {
		axios
			.get(`/dashboards/${dashboardId}/photos/`)
			.then((res) => {
        console.log('setState', res.data)
        setPhotos(res.data);
        setActiveStep(kyle(res.data, props.imgIndex));
      })
			.catch((err) => console.log('PHOTOS COMPONENT ERROR', err));
	}, []);
  console.log('props.imgIndex', props.imgIndex)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const kyle = (photosArr, photoIndex) => {
    for (const index in photosArr) {
      if (photosArr[index].id === photoIndex) return Number(index);
    }
  }

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{maxSteps > 0 && photos[activeStep].text}</Typography>
      </Paper>
      {maxSteps > 0 && <img
        className={classes.img}
        src={maxSteps > 0 && photos[activeStep].img_url}
        alt={maxSteps > 0 ? photos[activeStep].text : "ph"}
      />}
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}
