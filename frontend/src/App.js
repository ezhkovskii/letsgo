import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Bloggers from './pages/Bloggers';
import Search from './pages/Search';
import Monitoring from './pages/Monitoring';
import PressTours from './pages/PressTours';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="main">
       <Header />
       <div className="main__block">
       <Switch>
          <Route exact path="/">
            <PressTours />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/monitoring">
            <Monitoring />
          </Route>
          <Route path="/bloggers">
            <Bloggers />
          </Route>
        </Switch>
       </div>
      <Footer />
      </div>
    </Router>
  );
}


