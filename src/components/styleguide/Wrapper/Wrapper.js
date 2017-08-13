import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

// const {Provider} = require('react-redux');
// const configureStore = require('../utils/configureStore').default;
// const initialState = {
//   app: {
//     name: 'Pizza Delivery'
//   }
// };
// const store = configureStore({ initialState });
// <Provider store={store}>
//   {this.props.children}
// </Provider>
export default class Wrapper extends Component {
  render() {
    return (
      <Router>
        {this.props.children}
      </Router>
    );
  }
}
