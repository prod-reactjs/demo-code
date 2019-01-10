import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import juvo from 'juvo';

const ManagementButton = ({category, count = 0, fill}) => (
  <LinkContainer
    to={category ? `${category}${juvo.managements.pageLink(1)}` : juvo.managements.pageLink(1)}
    className={`viewManagement btn-pink ${fill ? 'active' : ''}`}
  >
    <Button>Management
      <span>{count}</span>
    </Button>
  </LinkContainer>
);

ManagementButton.propTypes = {
  category: React.PropTypes.string.isRequired,
  count: React.PropTypes.number.isRequired,
  fill: React.PropTypes.bool,
};

export default ManagementButton;
