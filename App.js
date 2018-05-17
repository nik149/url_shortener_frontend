import React from 'react';
import ShortenerForm from './src/containers/shortenerForm/index.js';
import './App.css';

class App extends React.Component {
   render() {
      return (
        <div class="body">
          <nav className="navbar navbar-expand-lg navbar-light">
           <div className="container">
             <a href="#" className="navbar-brand">URL Shortener</a>

             <div className="collapse navbar-collapse">
             <ul className="navbar-nav d-none d-lg-flex ml-2 order-3">
               <li className="nav-item"><a className="nav-link" href="#">Sign in</a></li>
               <li className="nav-item"><a className="nav-link" href="#">Sign up</a></li>
             </ul>
             </div>
           </div>
          </nav>

          <div className="container-fluid form-bar">
          <div className="container">
            <ShortenerForm />
          </div>
          </div>
        </div>
      );
   }
}
export default App;
