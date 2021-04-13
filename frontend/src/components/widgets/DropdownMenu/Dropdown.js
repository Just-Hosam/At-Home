import { useState, useEffect } from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const Dropdown = (props) => {

  const [state, setState] = useState({
    drawer: false
  })

  console.log(state.drawer);
	return (
		
		<section >
      <div className='nav'>
      <div className='nav-content'>
      <h1><a href='/' className='nav-title'>Dashboard.io</a></h1>
      
      <AccountCircleIcon
      className='nav-settings'
      style={{ fontSize: 40 }}
      onClick={() => alert("nav")}
      />
      </div>
     
      <div className='drawer' >
        <div id={'slide'} className={state.drawer ? 'show' : 'hide'}>

        </div>
      </div>



      </div>
     
		</section>

	);
};

export default Dropdown;