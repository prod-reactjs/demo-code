import React from 'react';
import { Modal, Button, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { getValidationStatus } from 'common/utils';

class QuickProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {}
    };
  }
  handleSubmit = () => {
    this.props.quickCreateProperty({ ...this.state.property });
  }
  handleChange = (event) => {
    const property = { ...this.state.property };
    property[event.target.name] = event.target.value;
    this.setState({ property });
  }
  render() {
    const { property } = this.state;
    const { categories = [], types = [], onHide, loading, error } = this.props;
    return (
      <Modal show onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div key="quickContact" className="quickContact">
            <FormGroup className="clearfix" validationState={getValidationStatus(error, 'category_id', property)}>
              <Col componentClass={ControlLabel} sm={3}>
                Category
              </Col>
              <Col sm={9}>
                <FormControl
                  value={property.category_id || ''}
                  name="category_id"
                  type="text"
                  componentClass="select"
                  onChange={this.handleChange}
                >
                  <option value="" disabled>Select category</option>
                  {categories && categories.map(category => (
                    <option key={`${category.id}${Date.now()}${Math.random()}`} value={category.id}>{category.name}</option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" validationState={getValidationStatus(error, 'type_id', property)}>
              <Col componentClass={ControlLabel} sm={3}>
                Type
              </Col>
              <Col sm={9}>
                <FormControl
                  value={property.type_id || ''}
                  name="type_id"
                  type="text"
                  componentClass="select"
                  onChange={this.handleChange}
                >
                  <option value="" disabled>Select type</option>
                  {types && types.map(type => (
                    <option key={`${type.id}${Date.now()}${Math.random()}`} value={type.id}>{type.name}</option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" validationState={getValidationStatus(error, 'address_1', property)}>
              <Col componentClass={ControlLabel} sm={3}>
                Address Line 1
              </Col>
              <Col sm={9}>
                <FormControl
                  value={property.address_1 || ''}
                  name="address_1"
                  type="text"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" validationState={getValidationStatus(error, 'address_2', property)}>
              <Col componentClass={ControlLabel} sm={3}>
                Address Line 2
              </Col>
              <Col sm={9}>
                <FormControl
                  value={property.address_2 || ''}
                  name="address_2"
                  type="text"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" validationState={getValidationStatus(error, 'town', property)}>
              <Col componentClass={ControlLabel} sm={3}>
                Town
              </Col>
              <Col sm={9}>
                <FormControl
                  value={property.town || ''}
                  name="town"
                  type="text"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" validationState={getValidationStatus(error, 'county', property)}>
              <Col componentClass={ControlLabel} sm={3}>
                County
              </Col>
              <Col sm={9}>
                <FormControl
                  value={property.county || ''}
                  name="county"
                  type="text"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" validationState={getValidationStatus(error, 'postcode', property)}>
              <Col componentClass={ControlLabel} sm={3}>
                Postcode
              </Col>
              <Col sm={9}>
                <FormControl
                  value={property.postcode || ''}
                  name="postcode"
                  type="text"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="clearfix" >
              <Col sm={12}>
                <Button
                  bsStyle="success"
                  className="pull-right"
                  onClick={this.handleSubmit}
                  disabled={loading && loading.quickProperty}
                >
                  {loading && loading.quickProperty && <i className="fa fa-circle-o-notch fa-spin" />} Create
                </Button>
              </Col>
            </FormGroup>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

QuickProperty.propTypes = {
  loading: React.PropTypes.object,
  categories: React.PropTypes.array,
  types: React.PropTypes.array,
  quickCreateProperty: React.PropTypes.func.isRequired,
  onHide: React.PropTypes.func.isRequired,
  error: React.PropTypes.object,
};

export default QuickProperty;
