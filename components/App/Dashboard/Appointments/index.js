import React from 'react';
import AppointmentElement from './AppointmentElement';

class Appointments extends React.Component {
  componentDidMount() {
    this.props.actions.fetchAppointments();
  }
  render() {
    const { appointments: { data = [], isError, loading }, user } = this.props;
    return (
      <div className="dashboard-todo panel panel-default">
        <div className="panel-heading">
          Appointments
        </div>
        <table className="table table-bordered table-hover">
          <tbody>
            {loading && (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
            {isError && (
              <tr>
                <td>
                  <h5 className="text-center">
                    <i className="glyphicon glyphicon-warning-sign" /> Can not fetch Todo
                  </h5>
                </td>
              </tr>
            )}
            {data.length ? (
              data.map((appointment, index) => (
                <tr key={index}>
                  <td><AppointmentElement appointment={appointment} user={user} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <h5 className="text-center">Nothing to show...</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

Appointments.propTypes = {
  appointments: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
};

export default Appointments;
