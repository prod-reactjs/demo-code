import React from 'react';
import { Grid, Panel, Row, Col, Alert, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import juvo from 'juvo';
import Cancel from './modal/Cancel';
// import Card from './modal/Card';
import Invoice from './Invoice';

const BillingComponent = ({
  subscription,
  user = {},
  invoices = {},
  modal = {},
  approve,
  closeModal,
  togleCheckbox,
  cancelSubscription,
  showCancelModal,
  // partial,
  // card,
  // error,
  // cardError,
  // changeCardForm,
  // submitCardForm,
  handleInvoiceClick,
}) => (
  <section>
    <Grid className="properties-page create">
      <Panel>
        <h2>Current Subscription</h2>
        {subscription && (
          <Row className="subscriptionInfo">
            <Alert bsStyle="info" className="clearfix nomargin">
              <p>
                Your current subscription
            is <strong>{user.currency} {subscription.total}</strong> for <strong>{subscription.quantity}</strong> users.
            Next Invoice Date {subscription.next_invoice}
                <span className="pull-right">
                  <Button bsStyle="link" onClick={showCancelModal}>Cancel my subscription</Button>
                </span>
              </p>
            </Alert>
          </Row>
        )}
        <Row>
          <LinkContainer to={juvo.billing.card}>
            <Button bsStyle="primary">Update your card details & subscription</Button>
          </LinkContainer>
        </Row>
        <h2>Invoice History</h2>
        <Row className="propertyContent">
          <Row className="managements">
            <Panel className="table">
              <Row className="table-header">
                <Col xs={2} sm={3}>
                  <div className="column">Date</div>
                </Col>
                <Col xs={2} sm={3}>
                  <div className="column">Amount</div>
                </Col>
                <Col xs={2} sm={3}>
                  <div className="column">Description</div>
                </Col>
              </Row>
              {invoices.data ? invoices.data.map(invoice => (
                <Invoice
                  key={invoice.id}
                  invoice={invoice}
                  handleInvoiceClick={handleInvoiceClick}
                />
              )) : (
                <Alert bsStyle="danger" className="clearfix">
                  <Col sm={3}>No Invoices Found...</Col>
                </Alert>
              )}
            </Panel>
          </Row>
        </Row>
      </Panel>
    </Grid>
    {modal.cancel && (
      <Cancel
        approve={approve}
        closeModal={closeModal}
        togleCheckbox={togleCheckbox}
        cancelSubscription={cancelSubscription}
      />
    )}
    {/* modal.card && (
      <Card
        subscription={subscription}
        partial={partial}
        user={user}
        error={error}
        cardError={cardError}
        card={card}
        closeModal={closeModal}
        changeCardForm={changeCardForm}
        submitCardForm={submitCardForm}
      />
    ) */}
  </section>
);

BillingComponent.propTypes = {
  subscription: React.PropTypes.object,
  user: React.PropTypes.object,
  invoices: React.PropTypes.object,
  modal: React.PropTypes.object,
  approve: React.PropTypes.bool,
  showCancelModal: React.PropTypes.func.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  togleCheckbox: React.PropTypes.func.isRequired,
  cancelSubscription: React.PropTypes.func.isRequired,
  // partial: React.PropTypes.object,
  // error: React.PropTypes.object,
  // cardError: React.PropTypes.object,
  // card: React.PropTypes.object,
  // changeCardForm: React.PropTypes.func.isRequired,
  // submitCardForm: React.PropTypes.func.isRequired,
  handleInvoiceClick: React.PropTypes.func.isRequired,
};

export default BillingComponent;
