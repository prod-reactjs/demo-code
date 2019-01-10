import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserEditComponent from 'components/User/UserEdit';
import {
  userChange,
  userSave,
  uploadProfile,
  signatureChange,
  toggleBlockType,
  toggleInlineStyle,
  userSignatureChange,
  userToggleBlockType,
  userToggleInlineStyle,
  clearError,
} from 'redux/modules/user';

class UserEdit extends React.Component {
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <UserEditComponent {...this.props} breadcrumb />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  profileImage: state.user.profileImage,
  identity: state.auth.identity,
  error: state.user.error,
  loading: state.user.loading,
  timezones: state.user.timezones,
  signature: state.user.signature,
  userSignature: state.user.userSignature,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  userChange,
  userSave,
  uploadProfile,
  signatureChange,
  toggleBlockType,
  toggleInlineStyle,
  userSignatureChange,
  userToggleBlockType,
  userToggleInlineStyle,
  clearError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
