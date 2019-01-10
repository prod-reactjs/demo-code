import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleImportChange, handleImportSubmit, clearError } from 'redux/modules/app/contacts';
import ContactsImportComponent from 'components/App/Contacts/ContactsImport';

class ContactImport extends React.Component {
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return <ContactsImportComponent {...this.props} />;
  }
}

const mapStateToProps = state => ({
  error: state.app.contacts.error,
  loading: state.app.contacts.loading,
  importValues: state.app.contacts.importValues,
  categories: state.app.contacts.categories,
  enquirySources: state.app.contacts.enquirySources,
  countryCodes: state.app.contacts.countryCodes,
  propertyTypes: state.app.contacts.propertyTypes,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleImportChange,
  handleImportSubmit,
  clearError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContactImport);
