import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import useSocket from '../../../hooks/useSocket';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function AddPhotoModal(props) {
	const [cookies] = useCookies(['userID']);
	const dashboardId = cookies.dashboardId;
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState({
		img_url: '',
		text: '',
	});

	//websocket connection
	const { sendSocketMessage } = useSocket();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (newImg) => {
		axios
			.post(`dashboards/${dashboardId}/photos/`, newImg)
			.then((res) => {
				props.addNewImg(res.data);
				setInput({ img_url: '', text: '' });
				setOpen(false);
				sendSocketMessage('photo'); // <--- send websocket msg
			})
			.catch((err) => console.log('PHOTO SUBMIT ERROR', err));
	};

	return (
		<div>
			<Fab
				id="gallery-add-btn"
				onClick={(b) => handleOpen(b)}
				color="primary"
				aria-label="add"
			>
				<AddIcon />
			</Fab>
			<Button variant="contained" onClick={(b) => handleOpen(b)}>
				Add Photo
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<form
							className={classes.root}
							noValidate
							autoComplete="off"
							onSubmit={(e) => e.preventDefault()}
						>
							<TextField
								id="standard-required"
								label="Image URL"
								value={input.img_url}
								onChange={(e) =>
									setInput((prev) => ({ ...prev, img_url: e.target.value }))
								}
							/>
							<br />
							<TextField
								id="standard-basic"
								label="Description"
								value={input.text}
								onChange={(e) =>
									setInput((prev) => ({ ...prev, text: e.target.value }))
								}
							/>
							<br />
							<Button
								variant="contained"
								startIcon={<SaveIcon />}
								type="submit"
								onClick={() => handleSubmit(input)}
							>
								Save
							</Button>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
