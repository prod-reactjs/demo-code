import React from 'react';
import { Panel, Row, Col, ProgressBar } from 'react-bootstrap';
import NoDataFound from 'components/Common/NoDataFound';
import Document from './Document';

const UploadManager = ({
  handleDocumentUpload,
  handleDocumentDelete,
  handleDocumentDownload,
  documents = [],
  uploadDocumentProgress = 0,
  setDocument,
}) => (
  <section className="followUp">
    <Row className="documents">
      <Col md={6}>
        <label htmlFor="document" className="upload">Upload Document</label>
        <input
          type="file"
          className="file"
          id="document"
          onChange={handleDocumentUpload}
          multiple
          />
      </Col>
      <Col md={6}>
        <ProgressBar now={uploadDocumentProgress} label={`${Math.round((uploadDocumentProgress * 100) / 100)}%`} />
      </Col>
    </Row>
    <Row className="managements">
      <Panel className="table">
        <Row className="table-header">
          <Col xs={2} sm={2}>
            <div className="column">Document</div>
          </Col>
        </Row>
        {!documents || documents.length === 0 ? <NoDataFound /> :
          documents.map(doc => (
            <Document
              key={doc.id}
              doc={doc}
              deleteFile={handleDocumentDelete}
              download={handleDocumentDownload}
              setDocument={setDocument}
            />
          )
        )}
      </Panel>
    </Row>
  </section>
);

UploadManager.propTypes = {
  handleDocumentUpload: React.PropTypes.func.isRequired,
  handleDocumentDelete: React.PropTypes.func.isRequired,
  handleDocumentDownload: React.PropTypes.func.isRequired,
  setDocument: React.PropTypes.func.isRequired,
  documents: React.PropTypes.array,
  uploadDocumentProgress: React.PropTypes.number,
};

export default UploadManager;
