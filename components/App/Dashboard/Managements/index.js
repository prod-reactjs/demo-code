import React from 'react';
import { Link } from 'react-router';
import juvo from 'juvo';

console.log(juvo);

const routes = {
  appointment: `/diary${juvo.managements.pageLink(1)}`,
  contact: `/contacts${juvo.managements.pageLink(1)}`,
  property: `/properties${juvo.managements.pageLink(1)}`,
  tenancy: `/tenancy${juvo.managements.pageLink(1)}`,
  offer: `/offers${juvo.managements.pageLink(1)}`,
  rent: juvo.tenancies.rents.index,
  rent_today: juvo.tenancies.rents.today,
  landlord: juvo.tenancies.landlords.index,
  landlord_today: juvo.tenancies.landlords.today,
  jobs: juvo.tenancies.jobs.index
};

class Managements extends React.Component {
  componentDidMount() {
    this.props.actions.fetchManagements();
  }
  render() {
    const { loading, managements = {} } = this.props;
    return (
      <div>
        <div className="dashboard-todo panel panel-default">
          <table className="table table-bordered table-hover">
            <tbody>
              {loading && (
                <tr>
                  <td>Loading...</td>
                </tr>
              )}
              <tr>
                <td>
                  <Link to={routes.appointment} className="managementDashboard" >Appointment<span>{managements.appointment}</span> </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to={routes.contact} className="managementDashboard" >Contact<span>{managements.contact}</span> </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to={routes.property} className="managementDashboard" >Property<span>{managements.property}</span> </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to={routes.tenancy} className="managementDashboard" >Tenancy<span>{managements.tenancy}</span> </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to={routes.offer} className="managementDashboard" >Offer<span>{managements.offer}</span> </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>TENANCIES</h3>
        <div className="dashboard-todo panel panel-default">
          <table className="table table-bordered table-hover">
            <tbody>
              {loading && (
                <tr>
                  <td>Loading...</td>
                </tr>
              )}
              <tr>
                <td>
                  <Link to={routes.rent} className="managementDashboard" >Rent (Total)<span>{managements.rent}</span> </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to={routes.rent_today} className="managementDashboard" >Rent (Due Today)<span>{managements.rent_today}</span> </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to={routes.landlord} className="managementDashboard" >Landlord (Total)<span>{managements.landlord}</span> </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to={routes.landlord_today} className="managementDashboard" >Landlord (Due Today)<span>{managements.landlord_today}</span> </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to={routes.jobs} className="managementDashboard" >Jobs<span>{managements.jobs}</span> </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Managements.propTypes = {
  managements: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
};

export default Managements;
