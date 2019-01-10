import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getContactInfo,
  handleMainFormChange,
  handleMainFormSubmit,
  clearError,
  setPrintValues,
  handlePrintSubmit,
  hideModal,
  getContactNotes,
  setNote,
  setCreateNote,
  setDeleteNote,
  getContactSMS,
  handleSMSCreate,
  handleSMSChange,
  getContactEmails,
  handleEmailCreate,
  handleEmailChange,
  setCreateDocument,
  setDeleteDocument,
  handleDocumentDownload,
  uploadDocument,
  setContactLocationsLocal,
  setUpdateLocations,
  setLoading,
  fillAddress,
  handleAttachmentRemove,
  handleTemplateChange,
  handleMessageChange,
  setDocument,
  handleRecipientSelect,
  handleRecipientChange,
  handleSignableCreate,
} from 'redux/modules/app/contacts';

import ContactInfoComponent from 'components/App/Contacts/ContactInfo';

class ContactInfo extends React.Component {
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <ContactInfoComponent
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.contacts.user,
  contact: state.app.contacts.contact,
  recipients: state.app.contacts.recipients,
  categories: state.app.contacts.categories,
  sources: state.app.contacts.enquirySources,
  countryCodes: state.app.contacts.countryCodes,
  templates: state.app.contacts.templates,
  printTemplates: state.app.contacts.printTemplates,
  propertyTypes: state.app.contacts.propertyTypes,
  printValues: state.app.contacts.printValues,
  locations: state.app.contacts.locations,
  note: state.app.contacts.note,
  notes: state.app.contacts.notes,
  noteCategories: state.app.contacts.noteCategories,
  sms: state.app.contacts.sms,
  smss: state.app.contacts.smss,
  modal: state.app.contacts.modal,
  loading: state.app.contacts.loading,
  error: state.app.contacts.error,
  activity: state.app.contacts.activity,
  appointments: state.app.contacts.appointments,
  documents: state.app.contacts.documents,
  uploadDocumentProgress: state.app.contacts.uploadDocumentProgress,
  contactLocations: state.app.contacts.contactLocations,
  printedDoc: state.app.contacts.printedDoc,
});

const mapDispatchToState = dispatch => bindActionCreators({
  getContactInfo,
  mainFormChange: handleMainFormChange,
  mainFormSubmit: handleMainFormSubmit,
  clearError,
  handlePrintChange: setPrintValues,
  handleModalClose: hideModal,
  handleNotesClick: getContactNotes,
  handleNoteChange: setNote,
  handleNoteCreate: setCreateNote,
  handleNoteDelete: setDeleteNote,
  handleSMSClick: getContactSMS,
  handleSMSCreate,
  handleSMSChange,
  handleEmailsClick: getContactEmails,
  handleEmailCreate,
  handleEmailChange,
  handlePrintSubmit,
  setCreateDocument,
  handleDocumentDelete: setDeleteDocument,
  handleDocumentDownload,
  handleDocumentUpload: uploadDocument,
  handleChangeLocations: setContactLocationsLocal,
  handleSubmitLocations: setUpdateLocations,
  setLoading,
  fillAddress,
  handleAttachmentRemove,
  handleTemplateChange,
  handleMessageChange,
  setDocument,
  handleRecipientSelect,
  handleRecipientChange,
  handleSignableCreate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToState)(ContactInfo);
