import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom'
import { Box, BoxNav } from './Box'
import { AppPWGen } from './AppPWGen.js'
import { AppHashPW } from './AppHashPW.js'
import AppTest from './AppTest.js'

class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Box.NavDiv bg="#bbb" {...Box.float("32rem", "100%", "none", "auto")}>
              <BoxNav>
                <NavLink className="route-link" exact to="/" activeStyle={{backgroundColor: "#555"}}>Gen PW</NavLink>
              </BoxNav>
              <BoxNav>
                <NavLink className="route-link" to="/hashpw" activeStyle={{backgroundColor: "#555"}}>Gen Hash PW</NavLink>
              </BoxNav>
              <BoxNav>
                <NavLink className="route-link" to="/test" activeStyle={{backgroundColor: "#555"}}>Test</NavLink>
              </BoxNav>
          </Box.NavDiv>
          <Box.ContentDiv>
            <Route exact path="/" component={AppPWGen} />
            <Route exact path="/hashpw" component={AppHashPW} />
            <Route path="/test" component={AppTest} />
            <Box.ClearDiv />
          </Box.ContentDiv>
        </div>
      </Router>
    )
  }
}

export default AppRoutes