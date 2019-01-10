import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { MenuItem } from 'react-bootstrap';
import juvo from 'juvo';

// import { ButtonGroup } from 'react-bootstrap';

const generateLink = ({ offer_id: offer, people_id: contact, property_id: property, tenancy_id: tenancy }) => {
  if (offer) {
    return juvo.offers.infoLink(offer);
  }
  if (tenancy) {
    return juvo.tenancies.infoLink(tenancy);
  }
  if (property) {
    return juvo.properties.infoLink(property);
  }
  if (contact) {
    return juvo.contacts.infoLink(contact);
  }
  return juvo.index;
};

class NoteElement extends React.Component {
  handleRemove = () => {
    this.props.onRemove(this.props.note.id);
  }
  handleComplete = () => {
    this.props.onComplete(this.props.note.id);
  }
  handleEdit = () => {
    this.props.onEdit(this.props.note.id);
  }
  render() {
    const { note } = this.props;

    return (
      <LinkContainer to={generateLink(note)}>
        <MenuItem className="todo-element">
          <div className="info">
            <div className="user">
              <img src="https://www.gravatar.com/avatar/igor@adlab.pro?d=identicon&s=35" alt="" />
            </div>
            <div className="message">
              <div className="text">{note.note}</div>
            </div>
          </div>
        </MenuItem>
      </LinkContainer>
    );
  }
}

export default NoteElement;
