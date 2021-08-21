import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';
import LoadingIndicator from './components/LoadingIndicator';
import Bloggers from './pages/Bloggers';
import Search from './pages/Search';
import Monitoring from './pages/Monitoring';
import PressTours from './pages/PressTours';
import './App/bootstrap.min.css';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="main w-100 h-100">
       <Header />
       <div className="container mt-3">
       <Switch>
          <Route exact path="/">
            <PressTours />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
           <Route path="/bloggers">
               <Bloggers />
           </Route>
          <Route path="/monitoring">
            <Monitoring />
          </Route>
          <Route path="/bloggers">
            <Bloggers />
          </Route>
        </Switch>
       </div>
      </div>
    </Router>
  );
}


