import React, { Component } from 'react';
import axios from 'axios';
import Paper from 'material-ui/paper';
import PickupFeed from './components/PickupFeed.jsx';
import ClaimList from './components/ClaimList.jsx';

var fakePickups = [
  {
    id: 1,
    name: 'Restaurant Name',
    email: 'restaurant@gmail.com',
    phone: '(123)456-7890',
    address: {
      streetAddress: '123 Fake St, Oakland, Ca 94612',
      lat: 11.1111,
      lng: 11.1,
    },
    foodItems: [
      {
        id: 1,
        description: 'Potatoes',
        quantity: '20 lbs',
        expiry: new Date(),
      },
      {
        id: 2,
        description: 'Baguettes',
        quantity: '15 loaves',
        expiry: new Date(),
      },
      {
        id: 3,
        description: 'Spaghetti',
        quantity: '5 lbs',
        expiry: new Date(),
      }
    ]
  },
  {
    id: 2,
    name: 'Restaurant Name',
    email: 'restaurant@gmail.com',
    phone: '(123)456-7890',
    address: {
      streetAddress: '123 Fake St, Oakland, Ca 94612',
      lat: 11.11,
      lng: 11.13,
    },
    foodItems: [
      {
        id: 1,
        description: 'Potatoes',
        quantity: '20 lbs',
        expiry: new Date(),
      },
      {
        id: 2,
        description: 'Baguettes',
        quantity: '15 loaves',
        expiry: new Date(),
      },
      {
        id: 3,
        description: 'Spaghetti',
        quantity: '5 lbs',
        expiry: new Date(),
      }
    ]
  },
  {
    id: 3,
    name: 'Restaurant Name',
    email: 'restaurant@gmail.com',
    phone: '(123)456-7890',
    address: {
      streetAddress: '123 Fake St, Oakland, Ca 94612',
      lat: 11.12,
      lng: 11.1111,
    },
    foodItems: [
      {
        id: 1,
        description: 'Potatoes',
        quantity: '20 lbs',
        expiry: new Date(),
      },
      {
        id: 2,
        description: 'Baguettes',
        quantity: '15 loaves',
        expiry: new Date(),
      },
      {
        id: 3,
        description: 'Spaghetti',
        quantity: '5 lbs',
        expiry: new Date(),
      }
    ]
  },
]

var fakeClaims = [
  {
    id: 1,
    name: 'Restaurant Name',
    email: 'restaurant@gmail.com',
    phone: '(123)456-7890',
    address: {
      streetAddress: '123 Fake St, Oakland, Ca 94612',
      lat: 11.1,
      lng: 11.1,
    },
    foodItems: [
      {
        id: 1,
        description: 'Potatoes',
        quantity: '20 lbs',
        expiry: new Date(),
      },
      {
        id: 2,
        description: 'Baguettes',
        quantity: '15 loaves',
        expiry: new Date(),
      },
      {
        id: 3,
        description: 'Spaghetti',
        quantity: '5 lbs',
        expiry: new Date(),
      }
    ]
  },
  {
    id: 2,
    name: 'Restaurant Name',
    email: 'restaurant@gmail.com',
    phone: '(123)456-7890',
    address: {
      streetAddress: '123 Fake St, Oakland, Ca 94612',
      lat: 11.1,
      lng: 11.17,
    },
    foodItems: [
      {
        id: 1,
        description: 'Potatoes',
        quantity: '20 lbs',
        expiry: new Date(),
      },
      {
        id: 2,
        description: 'Baguettes',
        quantity: '15 loaves',
        expiry: new Date(),
      },
      {
        id: 3,
        description: 'Spaghetti',
        quantity: '5 lbs',
        expiry: new Date(),
      }
    ]
  },
  {
    id: 3,
    name: 'Restaurant Name',
    email: 'restaurant@gmail.com',
    phone: '(123)456-7890',
    address: {
      streetAddress: '123 Fake St, Oakland, Ca 94612',
      lat: 11.12,
      lng: 11.05,
    },
    foodItems: [
      {
        id: 1,
        description: 'Potatoes',
        quantity: '20 lbs',
        expiry: new Date(),
      },
      {
        id: 2,
        description: 'Baguettes',
        quantity: '15 loaves',
        expiry: new Date(),
      },
      {
        id: 3,
        description: 'Spaghetti',
        quantity: '5 lbs',
        expiry: new Date(),
      }
    ]
  },
]


export default class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickups: fakePickups,
      claims: fakeClaims,
      pickupPins: [],
      claimPins: []
    };

    this.acceptClaim = this.acceptClaim.bind(this);
    this.cancelClaim = this.cancelClaim.bind(this);
    this.completeClaim = this.completeClaim.bind(this);
  }

  componentWillMount() {
    this.fetchPickups();
    this.fetchClaims();
  }

  setClaimPins() {
    var claimPins = [];
    this.state.claims.forEach((claim, idx) => {
      // axios.get(`https://chart.googleapis.com/chart?chst=d_map_pin_letter_withshadowchld=A|FF0000|0000FF`)
      // .then
      claimPins.push(
        new google.maps.Marker({
          position: {lat: claim.address.lat, lng: claim.address.lng},
          map: this.map
        })
      )
    });
    this.setState({claimPins});
  }

  setPickupPins() {
    var pickupPins = [];
    this.state.pickups.forEach((pickup, idx) => {
      pickupPins.push(
        new google.maps.Marker({
          position: {lat: pickup.address.lat, lng: pickup.address.lng},
          map: this.map
        })
      )
    });
    this.setState({pickupPins});
  }

  componentDidMount() {
    var { lat, lng } = this.props.user.address;
   this.map = new google.maps.Map(document.getElementById('map'),
    {center: {lat, lng}, zoom: 12});
    this.setPickupPins();
    this.setClaimPins();
  }

  fetchPickups() {
    return axios.get(`/pickups?userid=${this.props.user.id}`)
    .then((response) => {
      this.setState({pickups: response.data});
      this.setPickupPins();
    });
  }

  fetchClaims() {
    return axios.get(`/claims?userid=${this.props.user.id}`)
    .then((response) => {
      this.setState({claims: response.claims});
      this.setClaimPins();
    });
  }

  acceptClaim(claimId) {
    return axios.post(`/claims/accept`, {userId: this.props.user.id, claimId})
    .then(() => {
      this.fetchClaims();
      this.fetchPickups();
    });
  }

  cancelClaim(claimId) {
    return axios.post(`/claims/cancel`, {userId: this.props.user.id, claimId})
    .then(() => {
      this.fetchClaims();
      this.fetchPickups();
    });
  }

  completeClaim(claimId) {
    return axios.post(`/claims/complete`, {userId: this.props.user.id, claimId})
    .then(() => {
      this.fetchClaims();
    });
  }

  render() {
    var { pickups, claims } = this.state;
    return (
      <div className="Bank">
        <Paper className="map-placeholder">
          <div id="map"></div>
        </Paper>
        <div className="bank-lists">
          <PickupFeed pickups={pickups} accept={this.acceptClaim}/>
          <ClaimList claims={claims} cancel={this.cancelClaim} complete={this.completeClaim}/>
        </div>
      </div>
    );
  }
}
