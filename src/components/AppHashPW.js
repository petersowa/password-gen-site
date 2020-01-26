import React, { Component } from 'react';
import '../style.css';
import { EFFwords } from '../words.js';

const PasswordList = props => {
	// console.log(props);
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
export class AppHashPW extends Component {
	KeyChars = {
		standard1:
			'abcdefghijklmnopqrstuvwxyz01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ !"#$%&\'()*+,-./:;<=>?@[]^_`{|}~',
		standard: `abcdefghijklmnopqrstuvwxyz01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`,
		alphaNum:
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890',
		alpha: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
		lowercaseNum: 'abcdefghijklmnopqrstuvwxyz0123456789',
		numeric: '0123456789',
		dice: EFFwords.split('\n'),
	};

	state = {
		term: 'foobar',
		password: [],
		length: 8,
		count: 0,
		showList: false,
	};

	makePassword = term => {
		this.setState({ showList: false });
		const password = new Array(this.state.length).fill(' ');
		//let newpw = new Uint16Array(password.length)
		//window.crypto.getRandomValues(newpw)

		crypto.subtle
			.digest('SHA-256', new TextEncoder('utf-8').encode(term))
			.then(val => {
				const pw = [];
				const newpw = Array.from(new Uint16Array(val));
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
				// console.log(pw);
			});
	};

	onNewPassword = evt => {
		evt.preventDefault();
		this.makePassword(this.state.term);
		this.setState({ term: '' });
	};

	updateTerm = evt => {
		this.setState({
			term: evt.target.value,
		});
	};

	render() {
		const classSlide = this.state.showList ? 'fade-in' : 'fade-out';
		return (
			<>
				<form className="control-group" onSubmit={this.onNewPassword}>
					<button type="submit">Hash Password</button>

					<input
						type="password"
						placeholder=""
						value={this.state.term}
						onChange={this.updateTerm}
					/>
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
				</form>

				<div className={classSlide}>
					<PasswordList>{this.state.password}</PasswordList>
				</div>
			</>
		);
	}
}
