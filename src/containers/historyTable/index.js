import React from 'react';
import './index.css';
import DataTable from '../../components/dataTable/index.js';
import API from '../../API/index.js';
import responseFlags from '../../constants/responseFlags.js';
import { historyDataFetched, fetchNextData, fetchPrevData, resetHistoryData } from '../../actions/history.js';

import { connect } from 'react-redux';

class HistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('history-updated', this.fetchData);
  }

  componentDidUpdate() {
    if(!this.props.history.fetched && this.props.user.logged_in) {
      this.fetchData();
    }
    if(!this.props.user.logged_in && this.props.history.fetched) {
      this.resetData();
    }
  }

  onNextClick() {
    this.props.dispatch(fetchNextData());
  }

  onPrevClick() {
    this.props.dispatch(fetchPrevData());
  }

  fetchData() {
    API.fetchUserHistoryData(this.props.history.current_link, this.props.user.access_token)
    .then(response => {
      if(response.data.flag === responseFlags.SUCCESS) {
        this.props.dispatch(historyDataFetched(response.data));
      } else if(response.data.flag === responseFlags.INVALID_ACCESS_TOKEN){
        this.signOut();
      } else {
        alert("Something went wrong.");
      }
    })
    .catch(error => {
      alert("Something went wrong.");
    });
  }

  resetData() {
    this.props.dispatch(resetHistoryData());
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
    let dataTableHeaders = [
      {name: 'Original URL', key_name: 'long_url', type: 'link'},
      {name: 'Created', key_name: 'created', type:'time'},
      {name: 'Short URL', type: 'link', key_name: 'short_url'},
      {name: 'Hits', key_name: 'num_hits'}
    ];

    let pagination = {
      current_page: this.props.history.current_page,
      total_pages: this.props.history.total_pages,
      onNextClick: this.onNextClick.bind(this),
      onPrevClick: this.onPrevClick.bind(this)
    }

    if(!this.props.user.logged_in) {
      return (
        <div class="container">Please login to view data.</div>
      );
    } else if(this.props.history.fetched){
      return (
        <DataTable
          data={this.props.history.data}
          headers={dataTableHeaders}
          pagination={pagination}
        />
      );
    } else {
      return (
        <div class="container">
          <h4>
            Loading...
          </h4>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    history: state.history
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTable);
