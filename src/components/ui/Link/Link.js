import React from 'react';
import PropTypes from 'prop-types';

// import classnames from 'classnames';
import LinkButton from 'react-toolbox/lib/link';
import FontIcon from 'react-toolbox/lib/font_icon';
import {Link as RouterLink} from 'react-router-dom';

import styles from './Link.scss';

const Link = ({to, active, children, className, count, icon, label, theme, ...others}) => {
  // const _className = classnames(theme.link, {
  //   [theme.active]: active
  // }, className);
  return (
    <RouterLink to={to} className={styles.root} {...others}>
      {icon ? <FontIcon className={styles.icon} value={icon} /> : null}
      {label ? <abbr className={styles.label}>{label}</abbr> : null}
      {count && parseInt(count, 10) !== 0 ? <small>{count}</small> : null}
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  count: PropTypes.number,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  label: PropTypes.string
};

Link.defaultProps = {
  to: '/',
  active: false,
  className: ''
};

export default Link;

/*
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LINK } from '../identifiers.js';
import FontIcon from '../font_icon/FontIcon.js';

const Link = ({active, children, className, count, icon, label, theme, ...others}) => {
  const _className = classnames(theme.link, {
    [theme.active]: active
  }, className);

  return (
    <a data-react-toolbox='link' className={_className} {...others}>
      {icon ? <FontIcon className={theme.icon} value={icon} /> : null}
      {label ? <abbr>{label}</abbr> : null}
      {count && parseInt(count) !== 0 ? <small>{count}</small> : null}
      {children}
    </a>
  );
};

Link.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  count: PropTypes.number,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  label: PropTypes.string,
  theme: PropTypes.shape({
    active: PropTypes.string,
    icon: PropTypes.string,
    link: PropTypes.string
  })
};

Link.defaultProps = {
  active: false,
  className: ''
};

export default themr(LINK)(Link);
export { Link };

*/
