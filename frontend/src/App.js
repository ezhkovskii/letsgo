import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import BloggersList from './pages/BloggersList';
import Feedback from './pages/Feedback';
import Monitoring from './pages/Monitoring';
import PressTours from './pages/PressTours';
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
       <Header />
        <Switch>
          <Route exact path="/">
            <PressTours />
          </Route>
          <Route path="/feedback">
            <Feedback />
          </Route>
          <Route path="/monitoring">
            <Monitoring />
          </Route>
          <Route path="/bloggers">
            <BloggersList />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}


