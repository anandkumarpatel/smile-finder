import React, { Component } from 'react'

import GoogleLogin from 'react-google-login'


const Photos = require('googlephotos')

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {}


    this.responseGoogle = this.responseGoogle.bind(this)
    this.responseGoogleFail = this.responseGoogleFail.bind(this)
  }

  render() {
    return (
      <div className="signin">
        <GoogleLogin
          clientId="229443907240-eeo219ivkhikqg860l2q56dplpg69rul.apps.googleusercontent.com"
          buttonText="Login with Google"
          scope="https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogleFail}
        />
      </div>
    )
  }


  responseGoogleFail(err) {
    console.error('Error: Signing into google', err.message, err)
    return this.props.loginChange(err)
  }

  responseGoogle(googleUser) {
    const photosClient = new Photos(googleUser.accessToken)
    localStorage.setItem('googleUser', JSON.stringify(googleUser))
    return this.props.loginChange(null, photosClient)
  }
}

export default SignIn
