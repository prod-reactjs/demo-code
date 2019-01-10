import React, { PropTypes } from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { getValidationStatus } from 'common/utils';
import GetAddress from 'components/Common/GetAddress';

const MainForm = (props) => {
  const {
    error,
    user,
    values,
    categories,
    sources,
    countryCodes,
    propertyTypes,
    loading,
    onSubmit,
    onChange,
    fillAddress,
  } = props;
  return (
    <div>
      <Form onSubmit={onSubmit} horizontal>
        <Row>
          {values && values.id && <FormControl value={values.id} name="id" type="hidden" />}
          <Col sm={6}>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Category
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.category_id || ''}
                  name="category_id"
                  type="text"
                  componentClass="select"
                  onChange={onChange}
                >
                  <option value="" disabled>Select category</option>
                  {categories && categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Source
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.source_id || ''}
                  name="source_id"
                  type="text"
                  componentClass="select"
                  onChange={onChange}
                >
                  <option value="" disabled>Select source</option>
                  {sources && sources.map(source => (
                    <option key={source.id} value={source.id}>{source.name}</option>
                  ))}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup validationState={getValidationStatus(error, 'title_1', values)}>
              <Col componentClass={ControlLabel} lg={4}>
                First Name
              </Col>
              <Col lg={8} className="contactTitle">
                <Row>
                  <Col xs={4}>
                    <FormControl
                      value={values.title_1 || ''}
                      name="title_1"
                      componentClass="select"
                      onChange={onChange}
                    >
                      <option value="" disabled>Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Miss">Miss</option>
                      <option value="Dr">Dr</option>
                    </FormControl>
                  </Col>
                  <Col xs={4}>
                    <FormControl
                      value={values.forename_1 || ''}
                      name="forename_1"
                      type="text"
                      placeholder="Forename"
                      onChange={onChange}
                    />
                  </Col>
                  <Col xs={4}>
                    <FormControl
                      value={values.surname_1 || ''}
                      name="surname_1"
                      type="text"
                      placeholder="Surname"
                      onChange={onChange}
                    />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup validationState={getValidationStatus(error, 'title_2', values)}>
              <Col componentClass={ControlLabel} lg={4}>
                Secondary Name
              </Col>
              <Col lg={8} className="contactTitle">
                <Row>
                  <Col xs={4}>
                    <FormControl
                      value={values.title_2 || ''}
                      name="title_2"
                      componentClass="select"
                      onChange={onChange}
                    >
                      <option value="" disabled>Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Miss">Miss</option>
                      <option value="Dr">Dr</option>
                    </FormControl>
                  </Col>
                  <Col xs={4}>
                    <FormControl
                      value={values.forename_2 || ''}
                      name="forename_2"
                      type="text"
                      placeholder="Forename"
                      onChange={onChange}
                    />
                  </Col>
                  <Col xs={4}>
                    <FormControl
                      value={values.surname_2 || ''}
                      name="surname_2"
                      type="text"
                      placeholder="Surname"
                      onChange={onChange}
                    />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Business Name
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.business_name || ''}
                  name="business_name"
                  type="text"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Phone
              </Col>
              <Col lg={8}>
                <FormControl
                  defaultValue={values.phone || ''}
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Mobile
              </Col>
              <Col lg={8} className="contactTitle">
                <FormControl
                  value={values.mobile_country_code_id || ''}
                  name="mobile_country_code_id"
                  componentClass="select"
                  onChange={onChange}
                >
                  <option value="" disabled>Select country</option>
                  {countryCodes && countryCodes.map((code, index) => (
                    <option key={index} value={code.id}>{`${code.name} (+${code.prefix})`}</option>
                  ))}
                </FormControl>
                <FormControl
                  value={values.mobile || ''}
                  name="mobile"
                  type="tel"
                  placeholder="Mobile"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Email
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.email || ''}
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Fax
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.fax || ''}
                  name="fax"
                  type="tel"
                  placeholder="Fax"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Price Min {user && user.currency}
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.price_min || ''}
                  name="price_min"
                  type="number"
                  step="0.1"
                  placeholder="min price"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Price Max {user && user.currency}
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.price_max || ''}
                  name="price_max"
                  type="number"
                  step="0.1"
                  placeholder="max price"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <GetAddress callback={fillAddress} />
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Line 1
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.address_1 || ''}
                  name="address_1"
                  type="text"
                  placeholder="Line 1"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Line 2
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.address_2 || ''}
                  name="address_2"
                  type="text"
                  placeholder="Line 2"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Line 3
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.address_3 || ''}
                  name="address_3"
                  type="text"
                  placeholder="Line 3"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Town
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.town || ''}
                  name="town"
                  type="text"
                  placeholder="Town"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                County
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.county || ''}
                  name="county"
                  type="text"
                  placeholder="County"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Postcode
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.postcode || ''}
                  name="postcode"
                  type="text"
                  placeholder="Postcode"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Min Bed
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.bed_min || ''}
                  name="bed_min"
                  type="number"
                  step="0.1"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Min Bath
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.bath_min || ''}
                  name="bath_min"
                  type="number"
                  step="0.1"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={4}>
                Comments
              </Col>
              <Col lg={8}>
                <FormControl
                  value={values.comment || ''}
                  name="comment"
                  componentClass="textarea"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
          </Col>
          {propertyTypes && (
            <Col sm={12}>
              <FormGroup>
                <Col componentClass={ControlLabel} lg={2}>
                  Property types
                </Col>
                <Col lg={10} className="propTypes">
                  {propertyTypes.index.map((key) => {
                    return key ? (
                      <Col lg={4} key={key}>
                        <FormGroup className="form-checkbox list">
                          <input
                            id={`propertyType${key}`}
                            type="checkbox"
                            name={key}
                            onChange={onChange}
                            checked={(values.types && values.types.indexOf(key) !== -1) || false}
                          />
                          <label htmlFor={`propertyType${key}`}><span>{propertyTypes.value[key].name}</span></label>
                        </FormGroup>
                      </Col>
                    ) : null;
                  })}
                </Col>
              </FormGroup>
            </Col>
          )}
        </Row>
        <Row>
          <Col lg={12}>
            <FormGroup>
              <Col smOffset={11} sm={1}>
                <Button bsStyle="primary" type="submit" disabled={loading && loading.general} className="submit">{loading && loading.general && <i className="fa fa-circle-o-notch fa-spin" />} Save</Button>
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

MainForm.propTypes = {
  user: PropTypes.object,
  values: PropTypes.object.isRequired,
  categories: PropTypes.array,
  sources: PropTypes.array,
  countryCodes: PropTypes.array,
  propertyTypes: React.PropTypes.object,
  loading: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  fillAddress: PropTypes.func.isRequired,
};

export default MainForm;
