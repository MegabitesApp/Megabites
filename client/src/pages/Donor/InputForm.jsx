import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import DietaryRestrictionList from './DietaryRestrictionList.jsx'

export default class InputForm extends Component {
  render() {

    var {handleFoodInput, handleServingSizeInput, id, handleglutenCheckbox, handleRefrigeratedCheckbox, handleNutsCheckbox, handleDairyCheckbox, handleVegeterianCheckbox, glutenState, refrigeratedState, nutsState, dairyState, vegeterianState} = this.props;
    return (
      <div>
          <Card className="input-card">
            <div className="text-fields">
              <input type="text" placeholder="Food" onChange={(el) => handleFoodInput(el.target.value, id)} />
              <input type="text" placeholder="Serving Size" onChange={(el) => handleServingSizeInput(el.target.value, id)} />
            </div>
            <CardHeader
              className="stupid-header"
              subtitle='specify dietary restrictions'
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
            <DietaryRestrictionList
              handleglutenCheckbox={handleglutenCheckbox}
              handleRefrigeratedCheckbox={handleRefrigeratedCheckbox}
              handleNutsCheckbox={handleNutsCheckbox}
              handleDairyCheckbox={handleDairyCheckbox}
              handleVegeterianCheckbox={handleVegeterianCheckbox}
              glutenState={glutenState} refrigeratedState={refrigeratedState}
              nutsState={nutsState} dairyState={dairyState}
              vegeterianState={vegeterianState}
            />
            </CardText>
          </Card>
      </div>
    )
  }
}
