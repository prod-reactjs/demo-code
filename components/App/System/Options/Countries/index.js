import React from 'react';
import { Grid, Panel, Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import juvo from 'juvo';

const CountriesComponent = ({ result = {}, entities = {}, active = {}, toggleCheckbox, saveCurrentCodes, loading }) => (
  <Grid className="properties-page create">
    <Panel>
      <h2 className="flex sb">
        <Link to={juvo.options.index} className="undoLink">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 20 20"
          >
            <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
          </svg>
          System Options
        </Link>
        Mobile Country Codes
      </h2>
      <Row>
        <form onSubmit={saveCurrentCodes} className="countryCodes">
          <Row>
            <Col sm={12} className="flex sb">
              <span>Select which countries you would like to have available in your mobile country codes.</span>
              <Button bsStyle="success" type="submit" disabled={loading}>{loading && <i className="fa fa-circle-o-notch fa-spin" />} Save</Button>
            </Col>
          </Row>
          <Row>
            {result.codes && result.codes.map(item => (
              <Col lg={4} key={item}>
                <FormGroup className="form-checkbox">
                  <Col componentClass={ControlLabel} lg={8}>
                    (+{entities.codes[item].prefix}) {entities.codes[item].name}
                  </Col>
                  <Col lg={4}>
                    <input
                      id={`${entities.codes[item].name}${entities.codes[item].prefix}`}
                      type="checkbox"
                      name={item}
                      checked={active[item] || false} onChange={toggleCheckbox}
                    />
                    <label htmlFor={`${entities.codes[item].name}${entities.codes[item].prefix}`} />
                  </Col>
                </FormGroup>
              </Col>
            ))}
          </Row>
        </form>
      </Row>
    </Panel>
  </Grid>
);

CountriesComponent.propTypes = {
  entities: React.PropTypes.object,
  result: React.PropTypes.object,
  loading: React.PropTypes.bool,
  active: React.PropTypes.object,
  toggleCheckbox: React.PropTypes.func.isRequired,
  saveCurrentCodes: React.PropTypes.func.isRequired,
};

export default CountriesComponent;
