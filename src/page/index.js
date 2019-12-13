import React from 'react';
import ReactDOM from 'react-dom';

// import DoenetPage from '../React/DoenetPage';
import './mathJax';

  var latex = "$$ \\int_{\\input[sub][2em]{0}}^{\\input[sup][1em]{1}} \\input[integrand][10em]{}\\, dx$$"
    ReactDOM.render(
      <React.Fragment>
        <div>{latex}</div>

      </React.Fragment>
  ,document.getElementById('root'));
