import React from 'react';
import './Notification.scss';
import {CSSTransition} from 'react-transition-group'

function Notification (props) {
  return (
    <CSSTransition
      in={props.showNotification}
      timeout={500}
      classNames="notification"
      unmountOnExit
    />
  );
}

export default Notification