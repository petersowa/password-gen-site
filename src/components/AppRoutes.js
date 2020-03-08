import React, { Component } from 'react';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { AppPWGen } from './AppPWGen.js';
import { AppHashPW } from './AppHashPW.js';

class AppRoutes extends Component {
	componentDidMount() {
		document.title = `${process.env.REACT_APP_NAME} v${process.env.REACT_APP_VERSION} -- © 2020 by Peter Sowa`;
	}

	render() {
		return (
			<>
				<Router>
					<header className="app__header">
						<NavLink className="app__title app__nav-link" to="/">
							<h1>PW Helper</h1>
						</NavLink>
						<nav className="app__header__nav">
							<NavLink
								className="app__nav-link"
								exact
								to="/genpw"
							>
								Gen PW
							</NavLink>
							<NavLink className="app__nav-link" to="/hashpw">
								Gen Hash PW
							</NavLink>
						</nav>
					</header>

					<main className="app__container app__main">
						<Route exact path="/genpw" component={AppPWGen} />
						<Route exact path="/hashpw" component={AppHashPW} />
					</main>
				</Router>
			</>
		);
	}
}

export default AppRoutes;
