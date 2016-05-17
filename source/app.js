import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar';
import SearchApp from './components/searchapp';

const App = (props) =>
  <dev>
    <NavBar/>
    <SearchApp query="Webpack rocks"/>
  </dev>;

ReactDOM.render(<App/>, document.getElementById('app'));
