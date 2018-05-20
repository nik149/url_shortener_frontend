import React from 'react';
import { Provider } from 'react-redux';
import store from './src/reducers/store.js';
import ShortenerForm from './src/containers/shortenerForm/index.js';
import UserInfoSection from './src/containers/userInfoSection/index.js';
import HistoryTable from './src/containers/historyTable/index.js';
import SignInModal from './src/containers/signInModal/index.js';

import './App.css';

class App extends React.Component {
   constructor(props) {
    super(props);
   }

   render() {
      return (
        <Provider store={store}>
          <div class="body">
            <SignInModal />
            <nav className="navbar navbar-expand-lg navbar-light">
             <div className="container-fluid">
               <div class="container">
                 <a href="#" className="navbar-brand">URL Shortener</a>
               </div>
               <UserInfoSection />
             </div>
            </nav>

            <div className="container-fluid form-bar">
            <div className="container">
              <ShortenerForm />
            </div>
            </div>

            <div class="container history-table">
              <HistoryTable />
            </div>

          </div>
        </Provider>
      );
   }
}
export default App;
