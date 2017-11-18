import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FlatButton } from 'material-ui';
import Home from './pages/Home/Home.jsx';
import Donor from './pages/Donor/Donor.jsx';
import Bank from './pages/Bank/Bank.jsx';
import AppBar from 'material-ui/AppBar';

var fakeUser = {
  id: 1,
  name: 'West Oakland Food Pantry',
  phone: '(123)456-7890',
  email: 'wofp@gmail.com',
  type: 'DONOR',
  address: {
    streetAddress: '123 Fake St',
    city: 'Oakland',
    state: 'CA',
    zip: 94612,
    lat: 11.1111,
    lng: 11.1111,
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: fakeUser,
    }
  }

  fetchUserInfo() {
    return axios.get(`/user?id=${this.state.user.id}`)
    .then((response) => this.setState({user: response.data}));
  }

  render() {
    var { user } = this.state;
    if (user) {
      var label = null;
      if (user.type === 'DONOR') var activeView = <Donor user={user} />
      if (user.type === 'RECEIVER') var activeView = <Bank user={user} />
    } else {
      var label = <FlatButton label="login"/>
    };
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Megabites" iconElementRight={label}/>
          { activeView }
        </div>
      </MuiThemeProvider>
    );
  }
}
