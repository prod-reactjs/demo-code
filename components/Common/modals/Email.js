import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Popout from 'react-popout-new';
import moment from 'moment';

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popout: false,
    };
  }

  popout = () => {
    this.setState({ popout: true });
  }

  popoutClose = () => {
    this.setState({ popout: false });
  }

  render() {
    const { user, email } = this.props;
    return (
      <Row key={email.id} className="table-row modal-row" onClick={this.popout}>
        <Col sm={4}>
          {moment(email.created_date).format(user.dateDisplayFormat)}
        </Col>
        <Col sm={8}>
          {email.subject}
        </Col>
        {this.state.popout && (
          <Popout title="Message" onClosing={this.popoutClose}>
            <div dangerouslySetInnerHTML={{ __html: email.message || '' }} />
          </Popout>
        )}
      </Row>
    );
  }
}

Email.propTypes = {
  user: React.PropTypes.object,
  email: React.PropTypes.object.isRequired,
};

export default Email;
