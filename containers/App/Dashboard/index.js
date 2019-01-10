import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DashboardComponent from 'components/App/Dashboard';
import {
  fetchActivity,
} from 'redux/modules/app/dashboard/activity';

import {
  fetchAppointments,
} from 'redux/modules/app/dashboard/appointments';

import {
  fetchManagements,
} from 'redux/modules/app/dashboard/managements';

import {
  fetchNotes,
} from 'redux/modules/app/dashboard/notes';

import {
  fetchNews,
} from 'redux/modules/app/dashboard/rss';

import {
  showModal,
  hideModal,
  fetchUsers,
  fetchTodos,
  removeTodo,
  completeTodo,
  updateTodo,
  updateTodoLocal,
} from 'redux/modules/app/dashboard/todos';

const mapStateToProps = ({ app: { dashboard }, common }) => ({
  activity: {
    data: (dashboard.activity.data || {}).array,
    isError: dashboard.activity.isError,
    loading: dashboard.activity.loading,
    user: dashboard.activity.user,
  },
  appointments: {
    data: dashboard.appointments.data,
    isError: dashboard.appointments.isError,
    loading: dashboard.appointments.loading,
  },
  managements: dashboard.managements.managements,
  todos: dashboard.todos,
  notes: dashboard.notes,
  rss: dashboard.rss,
  charts: common.dashboard,
  user: common.user,
});

const mapDispatchToProps = dispatch => ({
  activityActions: bindActionCreators({ fetchActivity }, dispatch),
  appointmentsActions: bindActionCreators({ fetchAppointments }, dispatch),
  managementsActions: bindActionCreators({ fetchManagements }, dispatch),
  notesActions: bindActionCreators({ fetchNotes }, dispatch),
  rssActions: bindActionCreators({ fetchNews }, dispatch),
  todosActions: bindActionCreators({
    showModal,
    hideModal,
    fetchUsers,
    fetchTodos,
    removeTodo,
    completeTodo,
    handleSubmit: updateTodo,
    handleChange: updateTodoLocal,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
