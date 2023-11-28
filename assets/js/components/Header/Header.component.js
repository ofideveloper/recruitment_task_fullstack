
import React from 'react';
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

const NaviLinks = [
	{
		path: '/exchange-rates',
		label: 'Exchange Rates'
	},
	{
		path: '/setup-check',
		label: 'React Setup Check'
	},
]

export default function Header () {

	let location = useLocation()

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<Link className={"navbar-brand"} to={"/"}> Telemedi Zadanko </Link>

			<div id="navbarText">
				<ul className="navbar-nav mr-auto">
					{ NaviLinks.map((item, index) => (
						<li className="nav-item" key={ index }>

							{/* { JSON.stringify(item) } */}
							<Link className={`nav-link ${ location.pathname === item.path ? 'active' : '' }`} to={item.path}> { item.label } </Link>
						</li>
					)) }
				</ul>
			</div>
		</nav>
	)
}