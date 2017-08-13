import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import Checkbox from 'react-toolbox/lib/checkbox';

import Navbar from 'components/nav/Navbar';

import styles from './App.scss';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

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
      <Router>
        <div className={styles.root}>
          <Navbar />
          <p className={styles.intro}>
            To get started2, edit <code>src/App4.js</code> and save to reload.
          </p>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Home}/>
        </div>
      </Router>
    );
  }
}

export default App;
