import React from 'react';

const Results = (props) =>
  <div className="col-sm-8 app_pink">
    <div className="app_hit">
      <div><strong><a href="#">wombat wombat wombat</a></strong></div>

      <div className="app_vsp03">wibble wibble <mark>foobar</mark> wibble wibble wibble wibble wibble wibble wibble wibble wibble wibble wibble <mark>foobar</mark> wibble wibble wibble wibble wibble wibble <mark>foobar</mark> wibble wibble wibble wibble</div>

      <div className="text-muted app_vsp03">
        Source: <em>Spam and eggs</em>
        &nbsp;Published: <em>15 December 2009</em>
        &nbsp;Wordcount: <em>786</em>
      </div>
    </div>
  </div>;

export default Results;
