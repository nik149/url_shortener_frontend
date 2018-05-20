import React from 'react';
import { connect } from 'react-redux';
import './index.css';
import { loginSuccess, logoutSuccess } from '../../actions/userLogin.js';
import API from '../../API/index.js';
import responseFlags from '../../constants/responseFlags.js';

class UserInfoSection extends React.Component {
  constructor(props) {
    super(props);
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    let self = this;
    auth2.signOut().then(function () {
      self.props.dispatch(logoutSuccess());
      window.dispatchEvent(new Event('logged-out'));
    });
  }

  render() {
    if(this.props.user.logged_in) {
      return (
        <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
          <li class="nav-item dropdown show">
            <a class="nav-item nav-link dropdown-toggle mr-md-2" href="#" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              {this.props.user.profile.name}
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
              <a class="dropdown-item" href="#" onClick={this.signOut.bind(this)}>Sign Out</a>
            </div>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav d-none d-lg-flex ml-2 order-3">
        </ul>
      )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoSection);
