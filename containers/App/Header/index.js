import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from 'redux/modules/auth';
import HeaderComponent from 'components/App/Header';
import { getSearchData, setSelectedSearch, handleNotificationsClick } from 'redux/modules/common';

const Header = props => (
  <HeaderComponent
    {...props}
  />
);

const mapStateToProps = state => ({
  identity: state.auth.identity,
  location: state.auth.location,
  search: state.common.search,
  user: state.common.user,
  notifications: state.common.notifications,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  getSearchData,
  setSelectedSearch,
  handleNotificationsClick,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
