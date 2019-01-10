import React from 'react';
import { Col } from 'react-bootstrap';
import moment from 'moment';

const AppointmentElement = ({ appointment, user = {} }) => (
  <div className="appointment-element clearfix">
    <Col sm={6}>
      {appointment.title}
    </Col>
    <Col sm={6}>
      {moment(appointment.start_date).format(user.dateDisplayFormat)}
    </Col>
  </div>
);

export default AppointmentElement;
