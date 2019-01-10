import React from 'react';
import { Grid, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import juvo from 'juvo';
// import Loading from 'components/Common/Loading';
import Error from 'components/Common/Error';
import Empty from 'components/Common/Empty';
import Pagination from 'components/Common/Pagination';
import ManagementButton from 'components/Common/ManagementButton';
import NoDataFound from 'components/Common/NoDataFound';

import Search from './Search';
import Contact from './Contact';

const ContactsComponent = (props) => {
  const {
    user,
    contacts,
    searchValues,
    categories,
    sources,
    propertyTypes,
    pagination = {},
    loading,
    error,
    handleSearchSubmit,
    handleSearchChnage,
    load,
    handleDelete,
    searchPanel,
    toggleSearch,
    getMailchimpList,
  } = props;
  const hasSystemInfoMessages = loading || error;
  return (
    <Grid fluid className="contacts-page">
      <div className="contacts-content panel panel-box">
        <div className="listControls flex sb">
          <h2>Contact {pagination && pagination.total ? <span>({pagination.total})</span> : <span>(0)</span>}</h2>
          <div>
            <div>
              <Button className={searchPanel ? 'active' : ''} bsStyle="primary" onClick={toggleSearch}><i className="fa fa-search" aria-hidden="true" />Search Contacts</Button>
              {pagination.plugin && pagination.plugin.mailchimp && pagination.plugin.mailchimp.active ? (
                <Button className={searchPanel ? 'active' : ''} bsStyle="warning" onClick={getMailchimpList}>Send to Mailchimp</Button>
              ) : null}
            </div>
            <div>
              <LinkContainer to={juvo.contacts.create} className={searchPanel ? 'active' : ''}>
                <Button bsStyle="success">Create Contact</Button>
              </LinkContainer>
              <LinkContainer to={juvo.contacts.importFile} className={searchPanel ? 'active' : ''}>
                <Button bsStyle="success">Import Your Data</Button>
              </LinkContainer>
            </div>
          </div>
          <ManagementButton category={juvo.contacts.index} count={pagination.management_count || 0} fill={searchPanel} />
        </div>
        <div className={`searchPanel ${searchPanel ? 'expanded' : 'collapsed'}`}>
          <Search
            categories={categories || []}
            sources={sources || []}
            propertyTypes={propertyTypes || []}
            defaults={searchValues || {}}
            onSubmit={handleSearchSubmit}
            onChange={handleSearchChnage}
            onReset={props.handleSearchReset}
            users={props.users}
            loading={loading}
          />
        </div>
      </div>
      <div className="contacts-content list">
        {/* loading && loading.list ? <Loading /> : null */}
        {error && error.message ? <Error onRetry={load} /> : null}
        {(
          !hasSystemInfoMessages && !contacts.length
            ? <Empty
              content={<Button bsStyle="primary">New Contact</Button>}
              message="You currently have no contacts, click Create Contact to get started."
            />
            : null
        )}
        <Row className="table-row table-header">
          <Col sm={2} smOffset={1}>
            <div className="column">Name</div>
          </Col>
          <Col sm={9}>
            <div className="column">Details</div>
          </Col>
        </Row>
        {!contacts || contacts.length === 0 ? <NoDataFound /> :
          contacts.map((contact, index) => (
            <Contact
              user={user}
              key={contact.id}
              contact={contact}
              index={index}
              onDelete={handleDelete}
              starContact={props.starContact}
              unstarContact={props.unstarContact}
            />
          )
        )}
      </div>
      {pagination && (
        <Pagination pagination={pagination} route={juvo.contacts.pageLink} />
      )}
    </Grid>
  );
};

ContactsComponent.propTypes = {
  user: React.PropTypes.object,
  searchValues: React.PropTypes.object,
  searchPanel: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.object,
  contacts: React.PropTypes.array,
  categories: React.PropTypes.array,
  pagination: React.PropTypes.object,
  handleSearchSubmit: React.PropTypes.func.isRequired,
  handleSearchChnage: React.PropTypes.func.isRequired,
  load: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired,
  toggleSearch: React.PropTypes.func.isRequired,
};

export default ContactsComponent;
