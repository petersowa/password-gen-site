import React, { Component } from 'react';

import '../style.css';
import { EFFwords } from '../words.js';

const PasswordList = props => {
	return (
		<ul className="app__password-list">
			{props.children.map(pw => (
				<li key={pw} className="app__password-list__item">
					{pw}
				</li>
			))}
		</ul>
	);
};

export class AppPWGen extends Component {
	KeyChars = {
		standard: `abcdefghijklmnopqrstuvwxyz01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`,
		alphaNum:
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890',
		alpha: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
		lowercaseNum: 'abcdefghijklmnopqrstuvwxyz0123456789',
		numeric: '0123456789',
		dice: EFFwords.split('\n'),
	};

	state = {
		password: [],
		length: 8,
		showList: false,
		count: 0,
	};

	makePassword = () => {
		this.setState({ showList: false });

		const delayedPW = () => {
			const password = new Array(this.state.length).fill(' ');
			const newpw = new Uint16Array(password.length);
			window.crypto.getRandomValues(newpw);
			const pw = [];
			Object.values(this.KeyChars).forEach(keyChar => {
				const joinChar = keyChar.length < 200 ? '' : ' + ';
				pw.push(
					password
						.map((e, i) => keyChar[newpw[i] % keyChar.length])
						.join(joinChar)
				);
			});
			this.setState({
				password: pw,
				count: this.state.count + 1,
				showList: true,
			});
		};
		setTimeout(delayedPW, 300);
	};

	onNewPassword = evt => {
		this.makePassword();
	};

	render() {
		const classSlide = this.state.showList ? 'fade-in' : 'fade-out';
		return (
			<>
				<div className="control-group">
					<button onClick={this.onNewPassword}>New Passwords</button>
					<div>
						<button
							onClick={e =>
								this.setState(prevState => ({
									length: prevState.length - 1,
								}))
							}
						>
							-
						</button>
						{` ${this.state.length} `}
						<button
							onClick={e =>
								this.setState(prevState => ({
									length: prevState.length + 1,
								}))
							}
						>
							+
						</button>
					</div>
				</div>

				<div className={classSlide}>
					<PasswordList>{this.state.password}</PasswordList>
				</div>
			</>
		);
	}
}
