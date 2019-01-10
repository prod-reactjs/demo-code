import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserEditComponent from 'components/User/UserEdit';
import {
  userChange,
  uploadProfile,
  profileSave as userSave,
  signatureChange,
  toggleBlockType,
  toggleInlineStyle,
  userSignatureChange,
  userToggleBlockType,
  userToggleInlineStyle,
  clearError,
} from 'redux/modules/user';

class MyProfile extends React.Component {
  componentWillReceiveProps(props) {
    console.log(props);
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <UserEditComponent {...this.props} breadcrumb={false} />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  identity: state.auth.identity,
  profileImage: state.user.profileImage,
  error: state.user.error,
  loading: state.user.loading,
  timezones: state.user.timezones,
  signature: state.user.signature,
  userSignature: state.user.userSignature,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  userChange,
  uploadProfile,
  userSave,
  signatureChange,
  toggleBlockType,
  toggleInlineStyle,
  userSignatureChange,
  userToggleBlockType,
  userToggleInlineStyle,
  clearError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
