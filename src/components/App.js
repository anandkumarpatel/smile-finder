import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import SignInPage from './SignIn'
import GamePage from './Game'

import * as routes from '../constants/routes'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }


  render() {
    return <Router>
      <div>
        <Route
          exact path={routes.LANDING}
          component={SignInPage}
        />
        <Route
          exact path={routes.GAME}
          component={GamePage}
          gameEngine={this.state.gameEngine}
        />
      </div>
    </Router>
  }
}
export default App
