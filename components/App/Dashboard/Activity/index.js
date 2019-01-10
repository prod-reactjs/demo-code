import React from 'react';
import ActivityElement from './ActivityElement';

class Activity extends React.Component {
  componentDidMount() {
    this.props.actions.fetchActivity();
  }
  render() {
    const { activity: { user, data = [], isError, loading } } = this.props;
    return (
      <div className="dashboard-todo panel panel-default">
        <div className="panel-heading">
          Activity
        </div>
        <table className="table table-bordered table-hover">
          <tbody>
            {loading && (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
            {!loading && isError && (
              <tr>
                <td>
                  <h5 className="text-center"><i className="glyphicon glyphicon-warning-sign" /> Can not fetch Activity
                  </h5>
                </td>
              </tr>
            )}
            {data.length ? (
              data.map((activity, index) => (
                <tr key={index}>
                  <td><ActivityElement user={user} activity={activity} /></td>
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

Activity.propTypes = {
  activity: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
};

export default Activity;
