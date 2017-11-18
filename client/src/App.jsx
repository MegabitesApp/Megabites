import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FlatButton } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import Home from './pages/Home/Home.jsx';
import Donor from './pages/Donor/Donor.jsx';
import Bank from './pages/Bank/Bank.jsx';

var fakeUser = {
  id: 1,
  name: 'West Oakland Food Pantry',
  phone: '(123)456-7890',
  email: 'wofp@gmail.com',
  type: 'RECEIVER',
  address: {
    streetAddress: '123 Fake St',
    city: 'Oakland',
    state: 'CA',
    zip: 94612,
    lat: 11.1111,
    lng: 11.1111,
  }
}

var fakeBank = {"id": 1,
              "name": "SF-Marin Food Bank",
              "phone": "(415)282-1900",
              "email": "paul@sf-marinfoodbank.org",
              "type": "RECEIVER",
              "address": {
                  "address": "900 Pennsylvania Ave., SF, CA 94107",
                  "lat": 37.7544355,
                  "lng": -122.395706,
                  }
              };

var fakeDonor = {"id": 1,
              "name": "Chez Panisse",
              "phone": "(510) 548-5525",
              "email": "alice@chezpanisse.com",
              "type": "DONOR",
              "address": {
                  "address": "1517 Shattuck Ave, Berkeley, CA 94709",
                  "lat": 37.8796128,
                  "lng": -122.2710068,
                  }
              }



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: fakeBank,
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
          <AppBar title="Megabites" iconElementLeft={<img src="Logo.png" height="50" />} iconElementRight={label}/>
          { activeView }
        </div>
      </MuiThemeProvider>
    );
  }
}
