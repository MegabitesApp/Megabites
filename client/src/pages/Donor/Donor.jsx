import React, { Component } from 'react';
import InputForm from './InputForm.jsx';
import { RaisedButton } from 'material-ui';
import Paper from 'material-ui/paper';

export default class Donor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formNumber: 1,
      food: '',
      servingSize:'',
      finalInput: {},
      id: null,
      Gluten: false,
      Refrigerated: false,
      Nuts: false,
      Dairy: false,
      Vegeterian: false
    }

    this.handleMoreFormInput = this.handleMoreFormInput.bind(this);
    this.addMoreFields = this.addMoreFields.bind(this);
    this.handleFoodInput = this.handleFoodInput.bind(this);
    this.handleServingSizeInput = this.handleServingSizeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleGlutenCheckbox = this.handleGlutenCheckbox.bind(this);
    this.handleRefrigeratedCheckbox = this.handleRefrigeratedCheckbox.bind(this);
    this.handleNutsCheckbox = this.handleNutsCheckbox.bind(this);
    this.handleDairyCheckbox = this.handleDairyCheckbox.bind(this);
    this.handleVegeterianCheckbox = this.handleVegeterianCheckbox.bind(this);
  }

  handleMoreFormInput(id) {
    var finalInput = this.state.finalInput;
    var outputArr = [this.state.food, this.state.servingSize];
    finalInput[id] = outputArr;
    this.setState({
      finalInput: finalInput
    })
  }

  addMoreFields() {
    this.setState({
      formNumber: this.state.formNumber+=1
    });
  }

  handleFoodInput(el, id) {
    this.setState({
      servingSize: el
    })

    this.handleMoreFormInput(id.toString())
  }

  handleServingSizeInput(el, id) {
    this.setState({
      food: el
    });

    this.handleMoreFormInput(id.toString())
  }

  handleGlutenCheckbox() {
    this.setState ({
      Gluten: !this.state.Gluten
    })
  }

  handleRefrigeratedCheckbox() {
    this.setState ({
      Refrigerated: !this.state.Refrigerated
    })
  }

  handleNutsCheckbox() {
    this.setState ({
      Nuts: !this.state.Nuts
    })
  }

  handleDairyCheckbox() {
    this.setState ({
      Dairy: !this.state.Dairy
    })
  }

  handleVegeterianCheckbox() {
    this.setState ({
      Vegeterian: !this.state.Vegeterian
    })
  }

  handleSubmit() {
    console.log(this.state.finalInput);
    // return axios.post(`/claims/complete`, {userId: this.state.user.id, claimId})
    // .then(() => {
    //   this.fetchClaims();
    // });
  }


  render() {
    var form = [];
    for (var i = 0; i < this.state.formNumber; i++) {
      form.push(<InputForm
          handleFoodInput={this.handleFoodInput}
          handleServingSizeInput={this.handleServingSizeInput}
          handleGlutenCheckbox={this.handleGlutenCheckbox}
          handleRefrigeratedCheckbox={this.handleRefrigeratedCheckbox}
          handleNutsCheckbox={this.handleNutsCheckbox}
          handleDairyCheckbox={this.handleDairyCheckbox}
          handleVegeterianCheckbox={this.handleVegeterianCheckbox}
          glutenState={this.state.Gluten} refrigeratedState={this.state.Refrigerated}
          nutsState={this.state.Nuts} dairyState={this.state.Dairy}
          vegeterianState={this.state.Vegeterian}
          id={i}
          key={i}
        />)
    }
    return (
      <Paper className="donor-paper">
          {form}
          <div className="donor-button-cluster">
            <RaisedButton onClick={this.addMoreFields}>+</RaisedButton>
            <RaisedButton onClick={this.handleSubmit}>Submit</RaisedButton>
          </div>
      </Paper>
    )
  }
}
