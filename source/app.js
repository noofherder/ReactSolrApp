import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Link, hashHistory } from 'react-router';
import NavBar from './components/navbar';
import SearchAppContainer from './components/searchappcontainer';
import { makeSearchService } from './services/solrsearchservice';
import solrConf from './conf/solrconf';

const searchService = makeSearchService(solrConf);
//const searchService = makeSearchService();

const App = (props) =>
  <div>
    <NavBar/>
    {props.children}
  </div>;

const About = () =>
  <h1>About</h1>;

const Contact = () =>
  <h1>Contact</h1>;

// set the searchService on the SearchAppContainer.
// need to explictly pass props.location from Router.
const SearchAppContainer2 = (props) =>
  <SearchAppContainer location={props.location} searchService={searchService}/>;

const RoutedApp = () =>
  <Router history={hashHistory}>
    <Redirect from="/" to="/search" />
    <Route path="/" component={App}>
      <Route path="search" component={SearchAppContainer2} />
      <Route path="about" component={About} />
      <Route path="contact" component={Contact} />
    </Route>
  </Router>;

ReactDOM.render(<RoutedApp/>, document.getElementById('app'));
