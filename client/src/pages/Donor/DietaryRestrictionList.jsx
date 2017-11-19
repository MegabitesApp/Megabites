import React, { Component } from 'react';

export default class  extends Component {
  render() {
    var {handleGlutenCheckbox, handleRefrigeratedCheckbox, handleNutsCheckbox, handleDairyCheckbox, handleVegeterianCheckbox, glutenState, refrigeratedState, nutsState, dairyState, vegeterianState} = this.props;    
    return (
      <div>
        Gluten: <input type="checkbox" checked={glutenState} onChange={handleGlutenCheckbox}/> 
        Refrigerated: <input type="checkbox" checked={refrigeratedState} onChange={handleRefrigeratedCheckbox}/>
        Nuts:<input type="checkbox" checked={nutsState} onChange={handleNutsCheckbox}/>
        Dairy:<input type="checkbox" checked={dairyState} onChange={handleDairyCheckbox}/>
        Vegeterian:<input type="checkbox" checked={vegeterianState} onChange={handleVegeterianCheckbox}/>
      </div>
    )
  }
}
