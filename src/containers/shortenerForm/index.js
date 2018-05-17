import React from 'react';
import './index.css';

class ShortenerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      long_url: ''
    };
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({long_url: event.target.value});
  }

  submitForm() {
    event.preventDefault();
    console.log(this.state.long_url);
  }

  render() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-md-12">
            <h1 className="form-header">Simplify your links</h1>
          </div>

        </div>
        <div className="row">
          <div className="col-md-12 col-xs-12 col-lg-12">

            <div className="col-md-8 col-xs-8 col-lg-8">
              <div className="form-group">
                <input type="text" name="long-url" className="form-control" placeholder="Type your original link here" onChange={this.handleChange.bind(this)}/>
              </div>
            </div>

            <div className="col-md-4 col-xs-4 col-lg-4">
              <button type="submit" className="btn btn-default form-submit-button" onClick={this.submitForm.bind(this)}>SHORTEN URL</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ShortenerForm;
