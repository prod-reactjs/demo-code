import React from 'react';
import moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap';
import { MenuItem } from 'react-bootstrap';

const Element = ({ user, activity }) => (
  <LinkContainer to={activity.url}>
    <MenuItem className="activity-element">
      <div className="info">
        <div className="user">
          <img src="https://www.gravatar.com/avatar/igor@adlab.pro?d=identicon&s=35" alt="" />
        </div>
        <div className="message">
          <div className="text" dangerouslySetInnerHTML={{ __html: activity.description || '' }} />
          <div className="footer">{moment(activity.date).format(user && user.dateDisplayFormat)}</div>
        </div>
      </div>
    </MenuItem>
  </LinkContainer>
);

export default Element;
