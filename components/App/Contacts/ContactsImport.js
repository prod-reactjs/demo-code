import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Alert, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import juvo from 'juvo';

const ContactsImportComponent = ({
  importValues = {},
  categories = [],
  enquirySources = [],
  countryCodes = [],
  handleImportChange,
  handleImportSubmit,
  loading,
}) => (
  <Grid className="options">
    <Row className="breadcrumb">
      <Link to={juvo.contacts.index}>Client List</Link>
      <span> / Import Clients</span>
    </Row>
    <form className="clearfix" onSubmit={handleImportSubmit}>
      <Col md={6}>
        <h3>Import Options</h3>
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={3}>
            Client Category
        </Col>
          <Col sm={9}>
            <FormControl
              value={importValues.category || ''}
              name="category"
              type="text"
              componentClass="select"
              onChange={handleImportChange}
              >
              <option value="" disabled>Select category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </FormControl>
          </Col>
        </FormGroup>
        <hr />
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={3}>
            Enquiry Source
        </Col>
          <Col sm={9}>
            <FormControl
              value={importValues.source || ''}
              name="source"
              type="text"
              componentClass="select"
              onChange={handleImportChange}
              >
              <option value="" disabled>Select source</option>
              {enquirySources.map(source => (
                <option key={source.id} value={source.id}>{source.name}</option>
              ))}
            </FormControl>
          </Col>
        </FormGroup>
        <hr />
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={3}>
            Mobile Country Code
        </Col>
          <Col sm={9}>
            <FormControl
              value={importValues.country_code || ''}
              name="country_code"
              type="text"
              componentClass="select"
              onChange={handleImportChange}
              >
              <option value="" disabled>Select source</option>
              {countryCodes.map(code => (
                <option key={code.id} value={code.id}>{code.name}</option>
              ))}
            </FormControl>
          </Col>
        </FormGroup>
        <hr />
        <FormGroup className="upload-manager">
          <Col componentClass={ControlLabel} sm={3}>
            File
        </Col>
          <Col md={9}>
            <label htmlFor="document" className="upload">Upload CSV</label>
            <input
              type="file"
              className="file"
              id="document"
              name="file"
              onChange={handleImportChange}
            />
            {importValues.file ? ` ${importValues.file.name}` : null}
          </Col>

        </FormGroup>
      </Col>
      <Col md={6}>
        <Alert bsStyle="info">
          <h2>Before your start your import...</h2>
          <ol>
            <li>Ensure you include the first line of the spreadsheet</li>
            <li>You only need to include the Name column of the spreadsheet all other columns are optional</li>
            <li>Make sure you select the correct Category, Enquiry Source or Mobile Country Code from the form below these options will be used for all clients in the spreadsheet.</li>
            <li>The only required columns in the spreadsheet are Title, Forname and Surname all other columns are optional.</li>
            <li>If you use your own spreadsheet and not our spreadsheet template you will need to save the spreadsheet in a CSV format. You can do this by choosing the Save As dropdown when saving the spreadsheet and selecting CSV (Comma Deliminated). For more information on saving in a CSV format please follow the following tutorial <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.extendoffice.com/documents/excel/613-excel-export-to-csv-file.html"
              >Save as CSV</a></li>
          </ol>
          <a
            className="submit btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://s3-eu-west-1.amazonaws.com/sys-juvo-io/import.csv"
            >Download Spreadsheet Template</a>
        </Alert>
      </Col>
      <FormGroup>
        <Col sm={10}>
          <Button
            bsStyle="success"
            type="submit"
            className="submit"
            disabled={loading && loading.import}
          >
            {loading && loading.import && <i className="fa fa-circle-o-notch fa-spin" />} Start Import</Button>
        </Col>
      </FormGroup>
    </form>
  </Grid>
  );

ContactsImportComponent.propTypes = {
  loading: React.PropTypes.object,
  importValues: React.PropTypes.object,
  categories: React.PropTypes.array,
  enquirySources: React.PropTypes.array,
  countryCodes: React.PropTypes.array,
  handleImportChange: React.PropTypes.func.isRequired,
};

export default ContactsImportComponent;
