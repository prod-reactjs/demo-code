import React from 'react';
import {
  Modal,
  // Row,
  // Col,
  Alert,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

const CardComponent = (props) => {
  const { partial = {}, closeModal, user, error = {}, cardError, card = {}, changeCardForm, submitCardForm } = props;
  const quantity = [];
  for (let i = 0; i < 50; i++) {
    quantity.push(i);
  }
  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update your Juvo subscription</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitCardForm} className="billing-form">
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Select Amount of Users</ControlLabel>
            <FormControl
              name="quantity"
              componentClass="select"
              value={card.quantity || 1}
              onChange={changeCardForm}
            >
              {quantity.map(item => (
                <option key={item} value={item + 1}>{item + 1}</option>
              ))}
            </FormControl>
          </FormGroup>
          <Alert bsStyle="info">Total cost {user.currency || '$'} {partial.subscription} monthly
            {partial.partial ? (
              <Alert bsStyle="danger">A Partial payment of {user.currency || '$'} {partial.partial} will be taken for your increased users</Alert>
            ) : null}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <h3>Current Card Details</h3>
          {error.message && (<Alert bsStyle="danger">{error.message}</Alert>)}
          {`${card.brand}****${card.last4} expire date ${card.exp_month}/${card.exp_year}`}
          <h3>Update Card Details</h3>
          {cardError && (<Alert bsStyle="danger">{cardError.message}</Alert>)}
          <FormGroup>
            <ControlLabel>Card Number</ControlLabel>
            <FormControl
              type="text"
              pattern="[0-9]{13,16}"
              name="number"
              value={card.number || ''}
              onChange={changeCardForm}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>CVC</ControlLabel>
            <FormControl
              type="text"
              pattern="[0-9]{3}"
              name="cvc"
              value={card.cvc || ''}
              onChange={changeCardForm}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Expiry Month</ControlLabel>
            <FormControl
              type="text"
              pattern="[0-9]{2}"
              name="exp_month"
              value={card.exp_month || ''}
              onChange={changeCardForm}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Expiry Year</ControlLabel>
            <FormControl
              type="text"
              pattern="[0-9]{4}"
              name="exp_year"
              value={card.exp_year || ''}
              onChange={changeCardForm}
            />
          </FormGroup>
          <Button
            bsStyle="success"
            className="pull-right"
            type="submit"
          >Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

CardComponent.propTypes = {
  partial: React.PropTypes.object,
  user: React.PropTypes.object,
  error: React.PropTypes.object,
  cardError: React.PropTypes.object,
  card: React.PropTypes.object,
  closeModal: React.PropTypes.func.isRequired,
  changeCardForm: React.PropTypes.func.isRequired,
  submitCardForm: React.PropTypes.func.isRequired,
};

export default CardComponent;
