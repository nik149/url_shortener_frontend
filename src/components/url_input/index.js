import React from 'react';
import './index.css';

class URLInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
      <div className="row">
        <div className="col-md-12 form-group ">
          <input
            type={this.props.type}
            className={this.props.class}
            name={this.props.name}
            index={this.props.index}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.handleChange}>
          </input>
          <span class="error">{this.props.error}</span>
        </div>
      </div>
      </div>

    )
  }
}

export default URLInput;
