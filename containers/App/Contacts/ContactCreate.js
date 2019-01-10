import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactCreateComponent from 'components/App/Contacts/ContactCreate';
import {
  setContactDetailed,
  handleMainFormChange,
  handleMainFormSubmit,
  clearError,
  fillAddress,
} from 'redux/modules/app/contacts';


class ContactCreate extends Component {
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <ContactCreateComponent
        {...this.props}
        />
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.contacts.user,
  error: state.app.contacts.error,
  contact: state.app.contacts.contact,
  categories: state.app.contacts.categories,
  sources: state.app.contacts.enquirySources,
  countryCodes: state.app.contacts.countryCodes,
  propertyTypes: state.app.contacts.propertyTypes,
  loading: state.app.contacts.loading,
});

const mapDispatchToState = dispatch => bindActionCreators({
  mainFormChange: handleMainFormChange,
  mainFormSubmit: handleMainFormSubmit,
  setContactDetailed,
  clearError,
  fillAddress,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToState)(ContactCreate);
