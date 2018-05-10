import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { Box, BoxNav } from './components'
import './style.css';

import { text } from './data'

class App extends Component {
  render() {
    const navBgColor="hsla(50,0%,64%,.5)"
    return (
      <div>
        <Box.NavDiv bg={navBgColor}>
          <BoxNav bg="lightgray" {...Box.style({marginRight: 1})}>Test1</BoxNav>
        </Box.NavDiv>
        <Box.NavDiv bg={navBgColor} loc="bottom">
          <BoxNav bg="lightgray" {...Box.style({marginRight: 1})}>Test1</BoxNav>
          <BoxNav bg="lightgray" {...Box.style({marginRight: 1})}>Test2</BoxNav>
          <BoxNav bg="lightgray" {...Box.style({marginRight: 1})}>Test3</BoxNav>
          <BoxNav bg="lightgray" {...Box.style({marginRight: 1})}>Test4</BoxNav>
        </Box.NavDiv>

        <Box.ContentDiv>
          <Box bg="red" {...Box.float() }>Lorem...</Box>
          <Box bg="yellow" {...Box.float("5rem") } >Lorem...</Box>
          <Box.ClearDiv />
          <Box bg="grey" style={{ margin: "15 auto", height: "100%" }}>
            This is a content box test Overflow.
            <Box data={text} className="box data-content" {...Box.float("31%", "22rem", "left", "1%") } />
            <Box bg="lightgrey" {...Box.float("20%", "12rem", "right", "1%") } >
              <Box bg="orange">This is a test</Box>
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
            </Box>
            <Box {...Box.style({ width: "31%", height: "10rem", float: "left", margin: "1%" }) }>
              <button className="box">Click Here</button>
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
            </Box>
            <Box {...Box.style({ width: "31%", height: "10rem", float: "left", margin: "1%" }) }>
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
            </Box>
            <Box.ClearDiv />
          </Box>

          <Box {...{ ...Box.styles.noPadding, ...Box.styles.smMargin }}>This is a content box test2.</Box>
          <Box>This is a content box test.</Box>
          <Box bg="lightgrey" className="box border" style={{ width: "31%", height: "10rem", float: "left", margin: "1%" }}>
            <Box bg="orange" className="box border">This is a test</Box>
            <Box bg="blue" className="box border" fg="white">This is a test</Box>
            This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
              This is a content box test.
          </Box>
          <Box.ClearDiv />
        </Box.ContentDiv>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
