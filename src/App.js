import React, { Component } from 'react';
import logo from './logo.svg';
import MaskedInput from './MaskedInput.js';
import './App.css';

class App extends Component {

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = { value: ''};
    this.inputConstraints = {
      dob: {
        length: 8
      },
      phone: {
        length: 10
      },
      ssn: {
        length: 9
      }
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    console.log(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jourdan's Input Field Mask</h2>
        </div>

        <form className="masked-field-form" onSubmit={this.handleFormSubmit}>
          <MaskedInput inputType="dob" placeholder="Date of Birth" length={this.inputConstraints.dob.length}/> 
          <MaskedInput inputType="phone" placeholder="Phone Number" length={this.inputConstraints.phone.length}/>
          <MaskedInput inputType="ssn" placeholder="SSN" length={this.inputConstraints.ssn.length}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
