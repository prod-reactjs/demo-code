import React from 'react';
import { Grid, Panel, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import ReactHighcharts from 'react-highcharts';
import { momentFormats } from 'common/utils';
import Activity from './Activity';
import Appointments from './Appointments';
import Managements from './Managements';
import Notes from './Notes';
import Rss from './Rss';
import Todos from './Todos';


const DashboardComponent = (props) => {
  const {
    user,
    activity,
    appointments,
    managements,
    notes,
    todos,
    activityActions,
    appointmentsActions,
    managementsActions,
    notesActions,
    rss,
    rssActions,
    todosActions,
  } = props;
  const contacts = {
    chart: {
      spacingBottom: 0,
      spacingTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      height: 200,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    series: [{
      color: '#51CCDD',
      name: 'Contacts',
      lineWidth: 1,
      data: props.charts && props.charts.contacts,
    }],
    scrollbar: {
      enabled: false,
    },
    title: {
      text: 'CONTACTS',
      margin: 25,
      align: 'left',
      style: {
        fontFamily: 'Raleway',
        fontSize: '14px',
        fontWeight: 500,
        textAlign: 'left',
        color: '#7fbfb7',
      },
    },
    tooltip: {
      valueDecimals: 2,
      xDateFormat: '%Y-%m-%d',
      crosshairs: [false],
      formatter: function formatTooltip() {
        return `<span>${moment(this.key).format(user.dateDisplayFormat || momentFormats['d/m/Y'])}</span>
          <br/>
          <span class="highTooltip">${this.series.name}: <b>${this.y}</b></span>
        `;
      }
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    }
  };
  const viewings = {
    chart: {
      spacingBottom: 0,
      spacingTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      height: 200,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    series: [{
      color: '#51CCDD',
      name: 'Viewings',
      lineWidth: 1,
      data: props.charts && props.charts.viewings,
    }],
    scrollbar: {
      enabled: false,
    },
    title: {
      text: 'VIEWINGS',
      margin: 25,
      align: 'left',
      style: {
        fontFamily: 'Raleway',
        fontSize: '14px',
        fontWeight: 500,
        textAlign: 'left',
        color: '#7fbfb7',
      },
    },
    tooltip: {
      valueDecimals: 2,
      xDateFormat: '%Y-%m-%d',
      crosshairs: [false],
      formatter: function formatTooltip() {
        return `<span>${moment(this.key).format(user.dateDisplayFormat || momentFormats['d/m/Y'])}</span>
          <br/>
          <span class="highTooltip">${this.series.name}: <b>${this.y}</b></span>
        `;
      }
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    }
  };
  const valuations = {
    chart: {
      spacingBottom: 0,
      spacingTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      height: 200,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    series: [{
      // animation: chartAnimation,
      color: '#51CCDD',
      name: 'Valuations',
      lineWidth: 1,
      data: props.charts && props.charts.valuations,
    }],
    scrollbar: {
      enabled: false,
    },
    title: {
      text: 'VALUATIONS',
      margin: 25,
      align: 'left',
      style: {
        fontFamily: 'Raleway',
        fontSize: '14px',
        fontWeight: 500,
        textAlign: 'left',
        color: '#7fbfb7',
      },
    },
    tooltip: {
      valueDecimals: 2,
      xDateFormat: '%Y-%m-%d',
      formatter: function formatTooltip() {
        return `<span>${moment(this.key).format(user.dateDisplayFormat || momentFormats['d/m/Y'])}</span>
          <br/>
          <span class="highTooltip">${this.series.name}: <b>${this.y}</b></span>
        `;
      }
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    }
  };

  return (
    <div className="dashboard">
      <Panel>
        <Grid>
          <Row>
            <Col sm={8}>
              <h3>STATS</h3>
            </Col>
            <Col sm={4}>
              <h3>MANAGEMENT</h3>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <Row>
                <Col sm={4}>
                  <div className="highchart">
                    <ReactHighcharts config={viewings} />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="highchart">
                    <ReactHighcharts config={contacts} />
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="highchart">
                    <ReactHighcharts config={valuations} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col sm={4}>
              <Managements managements={managements} actions={managementsActions} />
            </Col>
          </Row>
        </Grid>
      </Panel>
      <Grid className="dashboard">
        <Row>
          <Col sm={8}>
            <Row>
              <Col sm={12}>
                <Todos todos={todos} actions={todosActions} />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6}>
                <Appointments appointments={appointments} actions={appointmentsActions} user={user} />
                <Notes notes={notes} actions={notesActions} />
              </Col>
              <Col xs={12} sm={6}>
                <Activity user={user} activity={activity} actions={activityActions} />
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <Rss rss={rss} actions={rssActions} />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

DashboardComponent.propTypes = {
  user: React.PropTypes.object,
  activity: React.PropTypes.object,
  appointments: React.PropTypes.object,
  managements: React.PropTypes.object,
  notes: React.PropTypes.object,
  rss: React.PropTypes.object,
  todos: React.PropTypes.object,
  activityActions: React.PropTypes.object.isRequired,
  appointmentsActions: React.PropTypes.object.isRequired,
  managementsActions: React.PropTypes.object.isRequired,
  notesActions: React.PropTypes.object.isRequired,
  rssActions: React.PropTypes.object.isRequired,
  todosActions: React.PropTypes.object.isRequired,
};


export default DashboardComponent;
