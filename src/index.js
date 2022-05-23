//https://cricket-57e5e.firebaseapp.com/

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom'

import './index.css';
import Auth from './Auth';
import Home from "./Home";
import Watch from "./watchsrc/Watch.js";
import Code from "./Code";
import Nearby from "./Nearby"

ReactDOM.render(
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/code" component={Code} />
      <Route exact path="/watch/:id" component={Watch} />
      <Route path="/create" component={Auth} />
      <Route exect path="/nearby" component={Nearby} />
    </BrowserRouter>,
  document.getElementById('root')
);
