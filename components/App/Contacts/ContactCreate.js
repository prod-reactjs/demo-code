import React from 'react';
import { Grid, Panel } from 'react-bootstrap';
import MainForm from './MainForm';

const ContactCreateComponent = ({
  error,
  user,
  contact,
  categories,
  sources,
  countryCodes,
  mainFormSubmit,
  mainFormChange,
  propertyTypes,
  fillAddress,
}) => (
  <Grid fluid className="properties-page create">
    <Panel>
      <h2 className="page-header">Create Contact</h2>
      <MainForm
        error={error}
        user={user}
        values={contact || {}}
        categories={categories}
        sources={sources}
        countryCodes={countryCodes}
        onSubmit={mainFormSubmit}
        onChange={mainFormChange}
        propertyTypes={propertyTypes}
        fillAddress={fillAddress}
        />
    </Panel>
  </Grid>
);

ContactCreateComponent.propTypes = {
  user: React.PropTypes.object,
  contact: React.PropTypes.object,
  categories: React.PropTypes.array,
  sources: React.PropTypes.array,
  countryCodes: React.PropTypes.array,
  propertyTypes: React.PropTypes.object,
  mainFormSubmit: React.PropTypes.func.isRequired,
  mainFormChange: React.PropTypes.func.isRequired,
  fillAddress: React.PropTypes.func.isRequired,
};

export default ContactCreateComponent;
