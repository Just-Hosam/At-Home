import React, { useEffect, useState } from "react";
import axios from "axios";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import useSocket from "../../../hooks/useSocket";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "90vh",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    maxHeight: "70vh",
    display: "block",
    objectFit: "contain",
  },
}));

export default function Photos(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const dashboardId = 1; // TODO: needs useContext
  const [photos, setPhotos] = useState([]);
  const [staging, setStaging] = useState({});
  const maxSteps = photos.length;

  //websocket connection
	const {
		sendSocketMessage
	} = useSocket();

  useEffect(() => {
    axios
      .get(`/dashboards/${dashboardId}/photos/`)
      .then((res) => {
        setPhotos(res.data);
        setActiveStep(getImgIndex(res.data, props.imgIndex));
       
      })
      .catch((err) => console.log("PHOTOS COMPONENT ERROR", err));
  }, []); 

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getImgIndex = (photosArr, photoIndex) => {
    for (const index in photosArr) {
      if (photosArr[index].id === photoIndex) {
        setStaging(photosArr[index]);
        return Number(index);
      }
    }
  };

  const handleDelete = () => {
    axios
      .delete(`/dashboards/${dashboardId}/photos/${staging.id}`)
      .then(() => {
        axios
          .get(`/dashboards/${dashboardId}/photos/`)
          .then((res) => {
            props.handleState(res.data);
            setPhotos(res.data);
          })
          .then(() => {
            setStaging({});
            sendSocketMessage('photo'); // <--- send websocket msg
          });
      })
      .catch((err) => console.log("DELETE PHOTOS ERROR", err));
  };

  // TODO: Delete? Fix?
  const handleNextKey = (key) => {
    if (key === "ArrowRight") {
      handleNext();
    }
  };

  // TODO: Delete? Fix?
  const handleBackKey = (key) => {
    if (key === "ArrowLeft") {
      handleBack();
    }
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>
          {maxSteps > 0 && photos[activeStep].text}

          <span className={classes.root}>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </span>
        </Typography>
      </Paper>
      {maxSteps > 0 && (
        <img
          className={classes.img}
          src={maxSteps > 0 && photos[activeStep].img_url}
          alt={maxSteps > 0 ? photos[activeStep].text : "ph"}
        />
      )}
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            onKeyDown={(k) => handleNextKey(k.key)}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            onKeyDown={(k) => handleBackKey(k.key)}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}
