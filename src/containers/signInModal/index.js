import React from 'react'
import { connect } from 'react-redux';
import './index.css';
import { loginSuccess, logoutSuccess } from '../../actions/userLogin.js';
import API from '../../API/index.js';
import responseFlags from '../../constants/responseFlags.js';
import creds from '../../constants/creds.js';

class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
    this.initializeGoogleLogin = this.initializeGoogleLogin.bind(this);
    this.renderGoogleLoginButton = this.renderGoogleLoginButton.bind(this);
  }

  componentDidMount() {
    if(!this.props.user.logged_in) {
      $('#signInModal').modal('show');
    }
    window.addEventListener('google-loaded',this.initializeGoogleLogin);
  }

  componentDidUpdate() {
    if(this.props.user.logged_in) {
      $('#signInModal').modal('hide');
    } else {
      $('#signInModal').modal('show');
    }
  }

  initializeGoogleLogin() {
    let self = this;
    gapi.auth2.init({
      client_id: creds.GOOGLE_CLIENT_ID,
      fetch_basic_profile: true,
      scope: 'profile'
    }).then(function(){
      self.renderGoogleLoginButton();

      let auth2 = gapi.auth2.getAuthInstance();

      if(auth2.isSignedIn.get()) {
        self.onSignIn(auth2.currentUser.get());
      }
    });
  }

  renderGoogleLoginButton() {
    gapi.signin2.render('g-signin2', {
      'longtitle': true,
      'onsuccess': this.onSignIn,
      'onfailure': this.onFailure
    });
  }

  onSignIn(googleUser) {
    let accessToken = googleUser.getAuthResponse().id_token;
    let profile = googleUser.getBasicProfile();
    
    let userInfo = {
      access_token: accessToken,
      profile: {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        image: profile.getImageUrl()
      }
    };
    let self = this;
    API.createUserSession(userInfo)
    .then(response => {
      if(response.data.flag == responseFlags.SUCCESS) {
        self.props.dispatch(loginSuccess(userInfo));
      } else {
        //TODO: toastr error
        self.signOut();
      }
    })
    .catch(error => {
      //TODO: toastr error
      self.signOut();
    });

  }

  onFailure() {
    //TODO: implement toastr
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    let self = this;
    auth2.signOut().then(function () {
      self.props.dispatch(logoutSuccess());
    });
  }


  render() {
    return (
      <div id="signInModal" className="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-sm">

          <div className="modal-content">
            <div className="modal-body">
              <div class="signin-row">
              <div class='col-md-12 col-sm-12' align="center">
              <div id="g-signin2"></div>
              </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(SignInModal);
