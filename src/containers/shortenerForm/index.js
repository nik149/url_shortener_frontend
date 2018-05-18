import React from 'react';
import './index.css';

import URLInput from '../../components/url_input/index.js';
import API from '../../API/index.js';

const initialURLList = [{
  name: 'long_url_0',
  key: 0,
  value: '',
  can_close: false,
  show_validation_error: true,
  error: null
}];

class ShortenerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url_list: initialURLList,
      api_error: null
    };
  }

  addNewInput() {
    let newKey = this.state.url_list.length;

    let newState = this.state;

    newState.url_list.push({
      name: 'long_url_'+newKey,
      key: newKey,
      value: '',
      can_close: newKey == 0 ? false : true,
      show_validation_error: true,
      error: null
    });
    this.setState({url_list: newState.url_list});
  }

  removeInput(key) {
    let newUrlList = this.state.url_list.filter(function(url) {
      return url.key != key;
    });

    this.setState({url_list: newUrlList});
  }

  isValidURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(str);
  }

  handleChange(event) {
    event.preventDefault();
    let oldState = this.state;
    let value = event.target.value;
    let errorMessage = null
    if(!this.isValidURL(value)) {
      errorMessage = 'Please enter correct URL'
    }

    let newState = this.state.url_list.map(function(element) {
      if(element.name == event.target.name) {
        element.value = value;
        element.error = errorMessage;
      }
    });

    this.setState(newState);
  }

  submitForm() {
    event.preventDefault();
    API.shortenURL(this.state.url_list).then((response) => {
      console.log(response);
      $('#myModal').modal('show');
      this.setState({url_list: [{
        name: 'long_url_0',
        key: 0,
        value: '',
        can_close: false,
        show_validation_error: true,
        error: null
      }], response: response});
    }).catch((err) => {
      this.setState({...this.state, api_error: err.message});
    });
  }

  getInputFields() {
    let self = this;
    let document = this.state.url_list.map(function(element) {
      let elementHtml = (
        <div class="row">
          <div class="col-md-6">
            <URLInput
              name={element.name}
              index={element.key}
              value={element.value}
              class='form-control'
              type='text'
              placeholder='Type your input here'
              error={element.error}
              handleChange={self.handleChange.bind(self)}
            />
          </div>
          <div class="col-md-1">
            {element.can_close ?
              (<button type="button" class="close" aria-label="Close" onClick={self.removeInput.bind(self, element.key)}>
                        <span aria-hidden="true">&times;</span>
                      </button>) : ''}
          </div>

      </div>
      );
      return elementHtml;
    });

    document.push(<div class="row">
      <button class="btn btn-default" onClick={self.addNewInput.bind(self)}>+Add</button>
    </div>);

    return document;
  }

  render() {
    return (
      <div>
      <div className="form">
        <div className="row">
          <div className="col-md-12">
            <h1 className="form-header">Simplify your links</h1>
          </div>
          <div class="error">
            {this.state.api_error}
          </div>
        </div>

        {this.getInputFields()}

        <div class="row">
          <div className="col-md-4 col-xs-4 col-lg-4">
            <button type="submit" className="btn btn-default form-submit-button" onClick={this.submitForm.bind(this)}>SHORTEN URL</button>
          </div>
        </div>

      </div>


      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">
              <p>Some text in the modal.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>
</div>
    );
  }
}

export default ShortenerForm;
