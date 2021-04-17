import React from 'react';

import Button from '@material-ui/core/Button';

export default function NavLoginReg(props) {
	return (
		<div id="navloginreg">
			<Button
				onClick={() => props.handlePage('LOGIN')}
				className="navbtn"
				variant="contained"
			>
				Login
			</Button>
			<Button
				onClick={() => props.handlePage('REGISTER')}
				className="navbtn"
				variant="contained"
			>
				Register
			</Button>
		</div>
	);
}
