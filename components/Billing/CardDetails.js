import React from 'react';
import { Grid, Panel, Row, Col, Form, FormGroup, FormControl, ControlLabel, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import juvo from 'juvo';

const quantities = [];
for (let i = 0; i < 50; i++) {
  quantities.push(i);
}

export default ({
  changeCardForm,
  submitCardForm,
  handleQuantityChange,
  handleQuantitySubmit,
  card = {},
  user = {},
  partial = {},
  error = {},
  quantity = 1,
  cardError,
  existingCard,
  quantityError = {},
  loading,
}) => (
  <Grid className="properties-page create">
    <Panel>
      <h2 className="flex sb">
        <Link to={juvo.billing.index} className="undoLink">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 20 20"
          >
            <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
          </svg>
          Billing
      </Link>
        Current Card Details
    </h2>
      <Row className="propertyContent">
        <div>
          <Col sm={6}>
            <Form onSubmit={handleQuantitySubmit}>
              {quantityError.message && (<Alert bsStyle={quantityError.type || 'danger'}>{quantityError.message}</Alert>)}
              <FormGroup>
                <ControlLabel>Select Amount of Users</ControlLabel>
                <FormControl
                  name="quantity"
                  componentClass="select"
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  {quantities.map(item => (
                    <option key={item} value={item + 1}>{item + 1}</option>
                  ))}
                </FormControl>
              </FormGroup>
              <Alert bsStyle="info">Total cost {user.currency || '$'} {partial.subscription} monthly
              {partial && partial.partial ? (
                <Alert bsStyle="success">A Partial payment of {user.currency || '$'} {partial.partial} will be taken for your increased users</Alert>
              ) : null}
              </Alert>
              <Button
                bsStyle="primary"
                className="pull-right"
                type="submit"
                disabled={loading && loading.quantity}
              >
                {loading && loading.quantity && <i className="fa fa-circle-o-notch fa-spin" />} Update
              </Button>
            </Form>
          </Col>
          <Col sm={6}>
            <Form onSubmit={submitCardForm} className="billing-form">
              {error.message && (<Alert bsStyle={error.type || 'danger'}>{error.message}</Alert>)}
              {existingCard && existingCard.brand ?
                `${existingCard.brand}****${existingCard.last4} expire date ${existingCard.exp_month}/${existingCard.exp_year}`
                : null
              }
              <h3>Update Card Details</h3>
              {cardError && (<Alert bsStyle="danger">{cardError.message}</Alert>)}
              <FormGroup>
                <ControlLabel>Card Number</ControlLabel>
                <FormControl
                  autoComplete="off"
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
                  autoComplete="off"
                  type="password"
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
                bsStyle="primary"
                className="pull-right"
                type="submit"
                disabled={loading && loading.card}
              >
                {loading && loading.card && <i className="fa fa-circle-o-notch fa-spin" />} Update
              </Button>
            </Form>
          </Col>
        </div>
      </Row>
    </Panel>
  </Grid>
);
