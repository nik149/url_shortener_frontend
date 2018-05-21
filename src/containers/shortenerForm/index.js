import React from 'react';
import './index.css';
import { connect } from 'react-redux';

import URLInput from '../../components/url_input/index.js';
import DataTable from '../../components/dataTable/index.js';
import API from '../../API/index.js';
import responseFlags from '../../constants/responseFlags.js';

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
    this.signOut = this.signOut.bind(this);
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
      errorMessage = 'Please enter correct URL format (http://www.example.com)'
    }

    let newState = this.state.url_list.map(function(element) {
      if(element.name == event.target.name) {
        element.value = value;
        element.error = errorMessage;
      }
    });

    this.setState(newState);
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    let self = this;
    auth2.signOut().then(function () {
      self.props.dispatch(logoutSuccess());
      window.dispatchEvent(new Event('logged-out'));
    });
  }

  submitForm() {
    event.preventDefault();
    let self = this;
    API.shortenURL(this.state.url_list, this.props.user.access_token).then((response) => {
      console.log(response.data);
      if(response.data.flag == responseFlags.SUCCESS) {
        self.handleSuccessResponse(response.data);
      } else if(response.data.flag === responseFlags.INVALID_ACCESS_TOKEN){
        this.signOut();
      } else {
        console.log(response);
      }
    }).catch((err) => {
      if(err.response.status == 404 && err.response.data.flag == responseFlags.CONTAINS_INVALID_URLs) {
        this.setState({...this.state, api_error: 'Please enter valid URLs'});
      } else if(err.response.status == 403 && err.response.data.flag == responseFlags.INVALID_ACCESS_TOKEN){
        this.signOut();
      } else {
        this.setState({...this.state, api_error: err.message});
      }
    });
  }

  handleSuccessResponse(response) {
    $('#responseModal').modal('show');

    this.setState({
        url_list: [{
          name: 'long_url_0',
          key: 0,
          value: '',
          can_close: false,
          show_validation_error: true,
          error: null,
          api_error: null
      }],
      response_data: response.data
    });

    window.dispatchEvent(new Event('history-updated'));
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

    document.push(
      <div class="row">
        <div class="col-md-1">
          <button class="btn btn-default add-button" onClick={self.addNewInput.bind(self)}>+Add</button>
        </div>
      </div>
    );

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
          </div>
          
          <div class="row">
            <div class="col-md-12 error">
              <h6 className="error-message">{this.state.api_error}</h6>
            </div>
          </div>

          {this.getInputFields()}

          <div class="row form-submit">
            <div className="col-md-2 col-xs-2 col-lg-2">
              <button type="submit" className="btn btn-default form-submit-button" onClick={this.submitForm.bind(this)}>SHORTEN URL</button>
            </div>
          </div>

        </div>


        <div id="responseModal" className="modal fade" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Your Short URLs</h4>
              </div>
              <div className="modal-body">
                <DataTable data={this.state.response_data} headers={[{name: 'Original URL', key_name: 'long_url'}, {name: 'Short URL', type: 'copy', key_name: 'short_url'}]}/>
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

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShortenerForm);
