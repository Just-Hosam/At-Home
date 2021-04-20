import React from 'react';
import { useCookies } from 'react-cookie';

import NavLoginReg from './NavLoginReg';
import NavUserDetails from './NavUserDetails';

export default function Navbar(props) {
	const [cookies] = useCookies(null);

	return (
		<div id="navbar">
			<h1 onClick={() => props.handlePage('GRID')}>@Home</h1>
			<div>
				{!cookies.userData && <NavLoginReg handlePage={props.handlePage} />}
				{cookies.userData && <NavUserDetails handlePage={props.handlePage} />}
			</div>
		</div>
	);
}
