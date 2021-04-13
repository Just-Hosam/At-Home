import { useState} from "react";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: 'black'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Dropdown = (props) => {


  const [state, setState] = useState({
    drawer: false,
    mode: 'DASHBOARD',
    content: ''
  })

  const slideIn = () => {
   
    if (state.drawer === false){
      setState({
        drawer: true
      })
    } else {
      setState({
        drawer: false
      })
    }

  };


  const settingSelected = mode => {

    let items = [];

    setState({
      mode: mode
    })

    switch(mode) {


      case 'DASHBOARD':
        handleClickOpen();
        items = [
          {title:"Dashboard 1",body:"Family"}, 
          {title:"Dashboard 2",body:"Project Managment"}
        ]
       
        setState({
          content: modalItems(items)
        })
        break;

        case 'INVITE':
        window.location.href = "mailto:?subject=Dashboard.io Invite&body=";
        break;

      case 'SETTINGS':
        handleClickOpen();
        items = [
          {title:"Theme 1",body:"Light Mode"}, 
          {title:"Theme 2",body:"Dark Mode"}
        ]
        
        setState({
          content: modalItems(items)
        })
        break;

        case 'GIT':
          window.open("https://github.com/Just-Hosam/modular_dashboard");
          break;
      

      case 'LOGOUT':
        window.location.reload();
        break;

      default:
       console.log("Error line 26 Dropdown.js");
    }

  };


  const modalItems = items => {

    const data = items.map((i,index) => {
  
        return(
          <div key={index}>
          <ListItem  button>
            <ListItemText primary={i.title} secondary={i.body} />
          </ListItem>
          <Divider />
          </div>
        
        )
      });
            
        return data;

    }
 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const settingsIcon = state.drawer 
  ?
  <ArrowForwardIosIcon
  className='nav-settings'
  style={{ fontSize: 30 }}
  onClick={() => slideIn()}
  />
  :
  <AccountCircleIcon
  className='nav-settings'
  style={{ fontSize: 40 }}
  onClick={() => slideIn()}
  />

  const backdrop = state.drawer ? <div className='backdrop'></div> : null;
  
	return (
		
		<section >
      {backdrop}
      <div className='nav'>
      <div className='nav-content'>
      <h1><a href='/' className='nav-title'>Dashboard.io</a></h1>
      
      {settingsIcon}
      </div>
     
      </div>

      <div className={state.drawer ? 'show-drawer' : 'hide-drawer'}>
      <div className='drawer'>

        <div onClick={() => settingSelected('DASHBOARD')} id='first-settings-item' className='settings-list'>
          <div className='settings-list-item'>
          <h3>Dashboards</h3>
          </div>
        </div>

        <div onClick={() => settingSelected('INVITE')} className='settings-list-dos'>
          <div className='settings-list-item'>
          <h3>Send Invite</h3>
          </div>
        </div>

        <div onClick={() => settingSelected('SETTINGS')} className='settings-list'>
          <div className='settings-list-item'>
          <h3>Settings</h3>
          </div>
        </div>

      
        <div onClick={() => settingSelected('GIT')} className='settings-list-dos'>
          <div className='settings-list-item'>
          <h3>Github</h3>
          </div>
        </div>
       

        <div onClick={() => settingSelected('LOGOUT')} id='last-settings-item' className='settings-list'>
          <div className='settings-list-item'>
          <h3>Logout</h3>
          </div>
        </div>

      </div>
      </div>
    

      <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {state.mode}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
       
       <List>
       {state.content}
       </List>
       
      </Dialog>
    </div>
     
		</section>

	);
};

export default Dropdown;