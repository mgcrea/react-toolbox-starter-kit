import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-toolbox/lib/switch';

import styles from './Button.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default class Button extends Component {
  static propTypes = {
    /** Description of prop "foo". */
    foo: PropTypes.number,
    /** Description of prop "baz". */
    baz: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
  };
  state = {
    switch_1: false
  }
  handleChange = (field, value) => {
    this.setState({...this.state, [field]: value});
  };
  render = () => (
    <div className={styles.root}>
      <Switch
        checked={this.state.switch_1}
        label="Push notifications"
        onChange={this.handleChange.bind(this, 'switch_1')}
      />
      <button>Foo: {this.props.children}</button>
    </div>
  )
}
