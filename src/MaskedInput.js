import React, { Component } from 'react';
import './MaskedInput.css';

class MaskedInput extends Component {

	/**
	 * @constructor
	 */
	constructor(props) {
		super(props);
		this.state = {
			placeholder: this.props.placeholder,
			realValue: ''
		}

		this.inputType = this.props.inputType;
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.insertAtIndex = 0;
		this.cleanInput = '';

		// this.preMasked = false;
		this.preMasked = true;
	}

  /**
   * handleKeyDown
   * @param event
   */
	handleKeyDown(event) {
		this.cleanInput = event.target.value;

		if (event.keyCode === 8)  { // Backspace
			if (event.target.value.length === 0 && this.preMasked) {
				return false;
			}

			if (this.preMasked) {
				if (this.inputType === "dob") {
					this.deleteFromDOB(event);
				} else if (this.inputType === "phone") {
					this.deleteFromPhone(event);
				} else { // SSN
					this.deleteFromSSN(event); 
				}
			} else {
				this.setState({ realValue: this.state.realValue.slice(0, -1) });				
			}
		} else {
			if (event.target.value.length == this.props.length) {
				event.preventDefault(); // Make sure we don't append the new letter onto the form's value
			} else {
				if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
					if (this.inputType === "dob") {
						this.formatDOB(event);
					} else if (this.inputType === "phone") {
						this.formatPhone(event);
					} else { // SSN
						this.formatSSN(event);
					}
				} 
			}
		}
	}

  /**
   * handleFocus
   */
	handleFocus(event) {
		if (this.preMasked) {
			if (this.inputType === "dob") {
				this.setState({ realValue: 'XX/XX/XXXX' });
			} else if (this.inputType === "phone") {
				this.setState({ realValue: '(XXX) XXX-XXXX' });
			} else { // SSN
				this.setState({ realValue: 'XXX-XX-XXXX' });
			}
		}

		if (event.target.value.length === 0) {
			this.setState({ placeholder: '' });			
		}
	}

  /**
   * handleBlur
   */
	handleBlur(event) {
		if (event.target.value.length === 0) {
			this.setState({ placeholder: this.props.placeholder });
			this.setState({ realValue: '' });
		}
	}

  /**
   * formatDOB
   * @param event
   */
	formatDOB(event) {
		var realValue = this.state.realValue;
	
		if (event.target.value.length === 1 || event.target.value.length === 3) {
			if (this.preMasked) {
				this.setState({ realValue: realValue.substr(0, this.insertAtIndex) + event.key + realValue.substr(this.insertAtIndex + 1, realValue.length) });
				this.insertAtIndex += 2;
			} else {
				this.setState({ realValue: this.state.realValue + event.key + '/'});				
			}
		} else {
			if (this.preMasked) {
				this.setState({ realValue: realValue.substr(0, this.insertAtIndex) + event.key + realValue.substr(this.insertAtIndex + 1, realValue.length) });
				this.insertAtIndex++;
			} else {
				this.setState({ realValue: this.state.realValue + event.key });
			}
		}
	}

  /**
   * formatPhone
   * @param event
   */
	formatPhone(event) {
		var realValue = this.state.realValue;

		if (event.target.value.length === 0) {
			if (this.preMasked) {
				this.insertAtIndex = 1;
				this.setState({ realValue: realValue.substr(0, this.insertAtIndex) + event.key + realValue.substr(this.insertAtIndex + 1, realValue.length) });
				this.insertAtIndex++;
			} else {
				this.setState({ realValue: '(' + event.key });				
			}
		} else if (event.target.value.length === 2) {
			if (this.preMasked) {
				this.setState({ realValue: realValue.substr(0, this.insertAtIndex) + event.key + realValue.substr(this.insertAtIndex + 1, realValue.length) });
				this.insertAtIndex += 3;
			} else {
				this.setState({ realValue: this.state.realValue + event.key + ') ' });				
			}
		} else if (event.target.value.length === 5) {
			if (this.preMasked) {
				this.setState({ realValue: realValue.substr(0, this.insertAtIndex) + event.key + realValue.substr(this.insertAtIndex + 1, realValue.length) });
				this.insertAtIndex += 2;
			} else {
				this.setState({ realValue: this.state.realValue + event.key + '-' });				
			}
		} else {
			if (this.preMasked) {
				this.setState({ realValue: realValue.substr(0, this.insertAtIndex) + event.key + realValue.substr(this.insertAtIndex + 1, realValue.length) });
				this.insertAtIndex++;
			} else {
				this.setState({ realValue: this.state.realValue + event.key });				
			}
		}
	}

	/**
	 * formatSSN
	 * @param event
	 */
	formatSSN(event) {
		var realValue = this.state.realValue;

		if (event.target.value.length === 2 || event.target.value.length === 4) {
			if (this.preMasked) {
				this.setState({ realValue: realValue.substr(0, this.insertAtIndex) + event.key + realValue.substr(this.insertAtIndex + 1, realValue.length) });
				this.insertAtIndex += 2;
			} else {
				this.setState({ realValue: this.state.realValue + event.key + '-' });
			}
		} else {
			if (this.preMasked) {
				this.setState({ realValue: realValue.substr(0, this.insertAtIndex) + event.key + realValue.substr(this.insertAtIndex + 1, realValue.length) });
				this.insertAtIndex++;
			} else {
				this.setState({ realValue: this.state.realValue + event.key });
			}
		}
	}

	/**
	 * deleteFromDOB
	 * @param event
	 */
	deleteFromDOB(event) {
		var realValue = this.state.realValue;

		if (event.target.value.length === 2 || event.target.value.length === 4) {
			this.setState({ realValue: realValue.substr(0, this.insertAtIndex - 2) + 'X' + realValue.substr(this.insertAtIndex - 1, realValue.length )});
			this.insertAtIndex -= 2;
		} else {
			this.setState({ realValue: realValue.substr(0, this.insertAtIndex - 1) + 'X' + realValue.substr(this.insertAtIndex, realValue.length) });
			this.insertAtIndex--;
		}
	}

	/** 
	 * deleteFromPhone
	 * @param event
	 */
	deleteFromPhone(event) {
		var realValue = this.state.realValue;

		if (event.target.value.length === 3) {
			this.setState({ realValue: realValue.substr(0, this.insertAtIndex - 3) + 'X' + realValue.substr(this.insertAtIndex - 2, realValue.length) });
			this.insertAtIndex -= 3;			
		} else if (event.target.value.length === 6) {
			this.setState({ realValue: realValue.substr(0, this.insertAtIndex - 2) + 'X' + realValue.substr(this.insertAtIndex - 1, realValue.length) });
			this.insertAtIndex -= 2;
		} else {
			this.setState({ realValue: realValue.substr(0, this.insertAtIndex - 1) + 'X' + realValue.substr(this.insertAtIndex, realValue.length) });
			this.insertAtIndex--;
		}
	}

  /**
   * deleteFromSSN
   * @param event
   */
	deleteFromSSN(event) {
		var realValue = this.state.realValue;

		if (event.target.value.length === 3 || event.target.value.length === 5) {
			this.setState({ realValue: realValue.substr(0, this.insertAtIndex - 2) + 'X' + realValue.substr(this.insertAtIndex - 1, realValue.length )});
			this.insertAtIndex -= 2;
		} else {
			this.setState({ realValue: realValue.substr(0, this.insertAtIndex - 1) + 'X' + realValue.substr(this.insertAtIndex, realValue.length) });
			this.insertAtIndex--;
		}
	}

  render() {
    return (
    	<div className="masked-input-container">
      	<div className="masked-input-real-value">
      		{this.state.realValue}
      	</div>
      	<input type="number" placeholder={this.state.placeholder} id={this.props.id} onFocus={this.handleFocus} onBlur={this.handleBlur} onKeyDown={this.handleKeyDown} className="masked-input-field" />	
    	</div>
    );
	}
}

export default MaskedInput;
