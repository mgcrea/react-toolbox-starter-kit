import React, { Component } from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';

import logo from './logo.svg';

import styles from './App.scss';

class App extends Component {
  state = {
    isChecked: false
  }
  handleInputChange = (value, ev) => {
    const {name} = ev.target;
    return this.setState({[name]: value});
  }
  render() {
    const {isChecked} = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={styles.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <Checkbox
            checked={isChecked}
            label="Checked option"
            name="isChecked"
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
