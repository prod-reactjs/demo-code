import React from 'react';
import { Modal, Row, Col, Alert, Button } from 'react-bootstrap';

const CancelComponent = ({ closeModal, approve = false, togleCheckbox, cancelSubscription }) => (
  <Modal show onHide={closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Cancel your Juvo subscription</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row className="clearfix">
        <Col sm={12}>
          <b>Cancelling your Juvo account is immediate and your data will be
         permenantely deleted 7 days after your next invoice due date,
         all data, images and documents entered into Juvo
         will deleted and can not be recovered.
         </b>
        </Col>
      </Row>
      <Alert bsStyle="info">
        <input type="checkbox" checked={approve} onChange={togleCheckbox} /> I understand and wish to close my Juvo account
      </Alert>
    </Modal.Body>
    <Modal.Footer>
      <Button
        bsStyle="danger"
        className={approve ? '' : 'disabled'}
        disabled={!approve}
        onClick={cancelSubscription}
        >Cancel my Juvo account</Button>
    </Modal.Footer>
  </Modal>
);

CancelComponent.propTypes = {
  approve: React.PropTypes.bool,
  closeModal: React.PropTypes.func.isRequired,
  togleCheckbox: React.PropTypes.func.isRequired,
  cancelSubscription: React.PropTypes.func.isRequired,
};

export default CancelComponent;
