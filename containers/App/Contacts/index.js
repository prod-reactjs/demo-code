import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactsComponent from 'components/App/Contacts';
import {
  fetchContacts,
  setContacts,
  setContactsSearch,
  setContactsSearchLocal,
  removeContact,
  handleSearchSubmit,
  handleSearchReset,
  toggleSearch,
  clearError,
  starContact,
  unstarContact,
  getUsers,
  getMailchimpList,
  hideModal,
  sendToChimp,
} from 'redux/modules/app/contacts';
import ConfirmDelete from 'components/Common/modals/ConfirmDelete';
import Mailchimp from 'components/App/Contacts/Mailchimp';

class Contacts extends React.Component {
  state = {
    deleteModal: false,
  }
  componentDidMount() {
    this.props.getUsers();
  }
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
      this.toggleDeleteModal();
    }
  }
  requestDelete = id => this.setState({ itemToDelete: id, deleteModal: true })
  handleDelete = () => {
    this.props.handleDelete(this.state.itemToDelete);
  }
  toggleDeleteModal = () => this.setState({ deleteModal: false, itemToDelete: null })
  render() {
    return (
      <section>
        <ContactsComponent {...this.props} handleDelete={this.requestDelete} />
        <ConfirmDelete shown={this.state.deleteModal} handleDelete={this.handleDelete} handleClose={this.toggleDeleteModal} />
        {this.props.modal === 'mailchimp' && (
          <Mailchimp mailchimp={this.props.mailchimp} handleClose={this.props.hideModal} sendToChimp={this.props.sendToChimp} />
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.contacts.user,
  users: state.app.contacts.users,
  error: state.app.contacts.error,
  loading: state.app.contacts.loading,
  contacts: state.app.contacts.list,
  categories: state.app.contacts.categories,
  propertyTypes: state.app.contacts.propertyTypes,
  sources: state.app.contacts.sources,
  pagination: state.app.contacts.pagination,
  searchValues: state.app.contacts.searchValues,
  searchPanel: state.app.contacts.searchPanel,
  mailchimp: state.app.contacts.mailchimp,
  modal: state.app.contacts.modal,
});

const mapDispatchToState = dispatch => bindActionCreators({
  load: fetchContacts,
  setContacts,
  setContactsSearch,
  handleSearchChnage: setContactsSearchLocal,
  handleDelete: removeContact,
  handleSearchSubmit,
  handleSearchReset,
  toggleSearch,
  clearError,
  starContact,
  unstarContact,
  getUsers,
  getMailchimpList,
  hideModal,
  sendToChimp,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToState)(Contacts);
