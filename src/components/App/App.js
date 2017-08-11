import React, { Component } from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';

import Navbar from 'components/Navbar';

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
        <Navbar />
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
