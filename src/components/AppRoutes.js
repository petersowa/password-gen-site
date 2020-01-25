import React, { Component } from 'react';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { AppPWGen } from './AppPWGen.js';
import { AppHashPW } from './AppHashPW.js';
import AppTest from './AppTest.js';

class AppRoutes extends Component {
	componentDidMount() {
		document.title = `${process.env.REACT_APP_NAME} v${process.env.REACT_APP_VERSION} -- © 2020 by Peter Sowa`;
	}

	render() {
		return (
			<Router>
				<div className="app__container">
					<header className="app__header">
						<h1>App Title</h1>
						<nav class="app__header__nav">
							<NavLink className="route-link" exact to="/">
								Gen PW
							</NavLink>
							<NavLink className="route-link" to="/hashpw">
								Gen Hash PW
							</NavLink>
							<NavLink className="route-link" to="/test">
								Test
							</NavLink>
						</nav>
					</header>
					<main className="app__main">
						<Route exact path="/" component={AppPWGen} />
						<Route exact path="/hashpw" component={AppHashPW} />
						<Route path="/test" component={AppTest} />
					</main>
				</div>
			</Router>
		);
	}
}

export default AppRoutes;
