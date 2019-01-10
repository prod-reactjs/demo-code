import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';


class Document extends React.Component {
  handleDelete = () => {
    this.props.deleteFile(this.props.doc.id);
  }

  handleDownload = () => {
    this.props.download(this.props.doc.id, this.props.doc.filename);
  }
  handleEmail = () => {
    this.props.setDocument(this.props.doc);
  }
  render() {
    const { doc } = this.props;
    return (
      <Row className="table-row">
        <Col md={11}>
          {doc.filename}
        </Col>
        <Col md={1} className="flex">
          <Glyphicon glyph="envelope" onClick={this.handleEmail} />
          <Glyphicon glyph="download" onClick={this.handleDownload} />
          <Glyphicon glyph="remove-circle" onClick={this.handleDelete} />
        </Col>
      </Row>
    );
  }
}

Document.propTypes = {
  doc: React.PropTypes.object.isRequired,
  download: React.PropTypes.func.isRequired,
  deleteFile: React.PropTypes.func.isRequired,
};

export default Document;
