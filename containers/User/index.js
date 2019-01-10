import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserComponent from 'components/User';
import {
  fetchUsers,
  getUserInfo,
  deleteUser,
  clearError,
} from 'redux/modules/user';
import {
  getCurrentSubscription
} from 'redux/modules/billing';

class User extends React.Component {
  componentDidMount() {
    this.props.getCurrentSubscription();
    this.props.fetchUsers();
  }
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <UserComponent {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  users: state.user.users,
  identity: state.auth.identity,
  usersMap: state.user.usersMap,
  subscription: state.user.subscription,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUsers,
  getUserInfo,
  deleteUser,
  getCurrentSubscription,
  clearError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
