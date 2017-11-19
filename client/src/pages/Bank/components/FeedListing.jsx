import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { RaisedButton } from 'material-ui';
import FoodItem from './FoodItem.jsx';

export default class FeedListing extends Component {
  constructor(props) {
    super(props);

    this.handleClaim = this.handleClaim.bind(this);
  }

  handleClaim() {
    this.props.accept(this.props.id);
  }

  render() {
    var { name, email, phone, address, foodItems } = this.props;
    var streetAddress = address.streetAddress;
    return (
      <Card className="FeedListing">
        <CardHeader
          title={name}
          subtitle={streetAddress}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText className="food-items" expandable={true}>
          { foodItems.map((foodItem) => <FoodItem { ...foodItem } key={foodItem.id} />)}
          <RaisedButton fullWidth={true} label="Claim" onClick={this.handleClaim}/>
        </CardText>
      </Card>
    );
  }
}
