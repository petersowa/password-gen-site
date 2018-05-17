import React, { Component } from 'react';
import { Box, BoxNav } from './Box'
import '../style.css';
import { EFFwords } from '../words.js'

export class AppPWGen extends Component {
  KeyChars = {
    standard: `abcdefghijklmnopqrstuvwxyz01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`,
    alphaNum: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890",
    alpha: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercaseNum: "abcdefghijklmnopqrstuvwxyz0123456789",
    numeric: "0123456789",
    dice: EFFwords.split('\n')
  }

  state = {
    password: [],
    length: 8,
    showList: false,
    count: 0
  }

  makePassword = () => {
    this.setState({ showList: false })
    
    const delayedPW = () => {
      const password = new Array(this.state.length).fill(' ')
      const newpw = new Uint16Array(password.length)
      window.crypto.getRandomValues(newpw)
      const pw = []
      Object.values(this.KeyChars).forEach(keyChar => {
        const joinChar = (keyChar.length < 200) ? '' : ' + '
        pw.push(password.map((e, i) => keyChar[(newpw[i] % keyChar.length)]).join(joinChar))
      })
      this.setState({ password: pw, count: this.state.count + 1, showList: true })
    }
    setTimeout(delayedPW,300)
  }

  onNewPassword = evt => {
    this.makePassword()
  }

  render() {
    const navBgColor = "hsla(50,0%,64%,.5)"
    const fontFamily = "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace"
    const classSlide = (this.state.showList) ? "fade-in" : "fade-out"
    return (
      <div>

        <Box bg="transparent" {...Box.float("100%", "100%", "none", "auto") }>
          <BoxNav bg="grey" fg="lightgrey" { ...Box.style({ margin: 0, padding: 10, borderStyle: "none" }) } onClick={this.onNewPassword}>Password Generate App</BoxNav>
          <BoxNav bg="grey" fg="lightgrey" { ...Box.style({ margin: 0, padding: 10, borderStyle: "none", float: "right" }) }>
            <button
              onClick={e => this.setState({ length: this.state.length - 1 })}>-</button>
            {` ${this.state.length} `}
            <button
              onClick={e => this.setState({ length: this.state.length + 1 })}>+</button>
          </BoxNav>
          <Box.ClearDiv />
        </Box>

        <Box.NavDiv bg={navBgColor} loc="bottom">
          <BoxNav bg="lightgray" {...Box.style({ marginRight: 1 }) }>
            <button onClick={this.onNewPassword}>New Password</button>
          </BoxNav>
        </Box.NavDiv>

        <div className={classSlide}>
          <Box bg="#fff" {...Box.style({ margin: "10px auto", width: "24rem" }) } >
            <Box bg="silver"
              {...Box.style({ textAlign: "center", border: "none", fontSize: "1.5rem", fontFamily }) }
              data={this.state.password} />
          </Box>
        </div>

      </div>
    )
  }
}