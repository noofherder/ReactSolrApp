import React from 'react';
import { Link } from 'react-router';

const NavBar = (props) =>
  <nav className="navbar navbar-inverse navbar-static-top">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">React Solr Example</a>
      </div>
      <div id="navbar" className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li><Link activeClassName="app_underline" to="/search">Search</Link></li>
          <li><Link activeClassName="app_underline" to="/about">About</Link></li>
          <li><Link activeClassName="app_underline" to="/contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  </nav>;

export default NavBar;
