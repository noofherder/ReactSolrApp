import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Link } from 'react-router';
import NavBar from './components/navbar';
import SearchApp from './components/searchapp';

const App = (props) =>
  <div>
    <NavBar/>
    {props.children}
  </div>;

const About = () =>
  <h1>About</h1>;

const Contact = () =>
  <h1>Contact</h1>;

const RoutedApp = () =>
  <Router>
    <Redirect from="/" to="/search" />
    <Route path="/" component={App}>
      <Route path="search" component={SearchApp} />
      <Route path="about" component={About} />
      <Route path="contact" component={Contact} />
    </Route>
  </Router>;

ReactDOM.render(<RoutedApp/>, document.getElementById('app'));
