import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';

class Invoice extends React.Component {
  handleClick = () => {
    this.props.handleInvoiceClick(this.props.invoice.id);
  }
  render() {
    const { invoice } = this.props;
    return (
      <Row key={invoice.id} className="table-row clearfix">
        <Col sm={3}>
          {invoice.date_created}
        </Col>
        <Col sm={3}>
          {invoice.amount}
        </Col>
        <Col sm={5}>
          {invoice.description}
        </Col>
        <Col sm={1}>
          <Glyphicon glyph="file" onClick={this.handleClick} />
        </Col>
      </Row>
    );
  }
}

Invoice.propTypes = {
  invoice: React.PropTypes.object.isRequired,
  handleInvoiceClick: React.PropTypes.func.isRequired,
};

export default Invoice;
