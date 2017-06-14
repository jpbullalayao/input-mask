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
      <div className="main">
        <div className="">
          <h1>Help Rilakkuma </h1>
        </div>
        <div className="">
          <form className="masked-field-form" onSubmit={this.handleFormSubmit}>
            <MaskedInput inputType="dob" placeholder="Date of Birth" length={this.inputConstraints.dob.length}/> 
            <MaskedInput inputType="phone" placeholder="Phone Number" length={this.inputConstraints.phone.length}/>
            <MaskedInput inputType="ssn" placeholder="SSN" length={this.inputConstraints.ssn.length}/>
            <input type="submit" value="Go!" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
