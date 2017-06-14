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
    this.state = {
      formSubmitted: false,
      formValid: false
    }
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
    this.handleModalButtonClick = this.handleModalButtonClick.bind(this);
  }

  /**
   * handleFormSubmit
   * @param event
   */
  handleFormSubmit(event) {
    event.preventDefault();

    let dob = document.getElementById("dob").value;
    let phone = document.getElementById("phone").value;
    let ssn = document.getElementById("ssn").value; 

    let dobLength = this.inputConstraints.dob.length;
    let phoneLength = this.inputConstraints.phone.length;
    let ssnLength = this.inputConstraints.ssn.length;

    if (dob.length === dobLength && phone.length === phoneLength && ssn.length === ssnLength) {
      this.setState({ formValid: true });      
    } 

    this.setState({ formSubmitted: true });
  }

  /**
   * handleModalButtonClick
   */
  handleModalButtonClick() {
    this.setState({ formSubmitted: false });
    this.setState({ formValid: false });
  }

  render() {
    const formSubmitted = this.state.formSubmitted;
    const formValid = this.state.formValid;
    return (
      <div className="main">
        <div className="main-section">
          <h1>Rilakkuma is requesting your information for something really cool!</h1>
        </div>
        <div className="main-section">
          <form className="masked-field-form" onSubmit={this.handleFormSubmit}>
            <MaskedInput inputType="dob" id="dob" placeholder="Date of Birth" length={this.inputConstraints.dob.length}/> 
            <MaskedInput inputType="phone" id="phone" placeholder="Phone Number" length={this.inputConstraints.phone.length}/>
            <MaskedInput inputType="ssn" id="ssn" placeholder="SSN" length={this.inputConstraints.ssn.length}/>
            <input type="submit" value="Go!" className="btn-primary" />
          </form>
        </div>
        {formSubmitted &&
          <div className="form-submit-message-modal">
            <div className="form-submit-message-container">
              <div className="form-submit-message">
                {formValid ? "Thank you! Expect a phone call soon!" : "Oh, at least one piece of your information isn't correct!" }
              </div>
              <button className="btn-primary btn-modal" onClick={this.handleModalButtonClick}>Got It!</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
