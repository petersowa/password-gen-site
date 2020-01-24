import React, { Component } from 'react';
import { Box, BoxNav } from './Box';
import '../style.css';
import { EFFwords } from '../words.js';

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
	};

	makePassword = term => {
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
				this.setState({ password: pw, count: this.state.count + 1 });
			});
	};

	onNewPassword = evt => {
		this.makePassword(this.state.term);
	};

	updateTerm = evt => {
		this.setState({ term: evt.target.value });
	};

	render() {
		const navBgColor = 'hsla(50,0%,64%,.5)';
		const fontFamily =
			'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace';
		return (
			<div>
				<Box
					bg="transparent"
					{...Box.float('100%', '100%', 'none', 'auto')}
				>
					<BoxNav
						bg="grey"
						fg="lightgrey"
						{...Box.style({
							margin: 0,
							padding: 10,
							borderStyle: 'none',
						})}
						onClick={this.onNewPassword}
					>
						Password Generate App
					</BoxNav>
					<BoxNav
						bg="grey"
						fg="lightgrey"
						{...Box.style({
							margin: 0,
							padding: 10,
							borderStyle: 'none',
							float: 'right',
						})}
					>
						<input
							placeholder=""
							value={this.state.term}
							onChange={this.updateTerm}
						/>
					</BoxNav>
					<Box.ClearDiv />
				</Box>

				<Box.NavDiv bg={navBgColor} loc="bottom">
					<BoxNav bg="lightgray" {...Box.style({ marginRight: 1 })}>
						<button onClick={this.onNewPassword}>
							New Password
						</button>
					</BoxNav>
				</Box.NavDiv>

				{this.state.password.length > 0 && (
					<Box
						bg="#fff"
						{...Box.float('24rem', '100%', 'none', '10px auto')}
					>
						<Box
							bg="silver"
							{...Box.style({
								textAlign: 'center',
								border: 'none',
								fontSize: '1.5rem',
								fontFamily,
							})}
							data={this.state.password}
						/>
					</Box>
				)}
			</div>
		);
	}
}
