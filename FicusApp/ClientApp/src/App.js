import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        <Routes>
          {AppRoutes.map((route, index) => {
            return <Route key={index} {...route} />;
          })}
        </Routes>
    );
  }
}
