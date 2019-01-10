import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import moment from 'moment';
import juvo from 'juvo';
import { momentFormats } from 'common/utils';

class Contact extends React.Component {
  handleClick = (e) => {
    e.stopPropagation();
    browserHistory.push(juvo.contacts.infoLink(this.props.contact.id));
  }
  handleDelete = (e) => {
    e.stopPropagation();
    this.props.onDelete(this.props.contact.id);
  }
  handleStarClick = (e) => {
    e.stopPropagation();
    if (this.props.contact.star) {
      this.props.unstarContact(this.props.contact.id);
    } else {
      this.props.starContact(this.props.contact.id);
    }
  }
  render() {
    const { user = {}, index, contact } = this.props;
    return (
      <Row className={`contact-row ${index % 2 === 0 ? '' : 'even'}`} onClick={this.handleClick}>
        <Col sm={1} className="flex start">
          <i onClick={this.handleStarClick} className={`fa fa-${contact.star ? 'star' : 'star-o'}`} />
        </Col>
        <Col sm={2}>
          <h4>{contact.title_1} {contact.forename_1} {contact.surname_1}</h4>
          <h6>{contact.title_2} {contact.forename_2} {contact.surname_2}</h6>
        </Col>
        <Col sm={7}>
          <p>Phone: {contact.phone}</p>
          <p>Mobile: {contact.mobile}</p>
          <p>Email: {contact.email}</p>
          <p>Address: {contact.address_1}</p>
          <p>Date Registered: {moment(contact.created_date).format(user.dateDisplayFormat || momentFormats['d/m/Y'])}</p>
        </Col>
        <Col sm={2} className="flex end">
          <Button bsStyle="primary" onClick={this.handleClick}>Edit</Button>
          <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
        </Col>
      </Row>
    );
  }
}

Contact.propTypes = {
  user: React.PropTypes.object,
  contact: React.PropTypes.object,
  index: React.PropTypes.number,
};

export default Contact;
