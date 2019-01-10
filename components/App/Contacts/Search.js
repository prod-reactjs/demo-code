import React, { PropTypes } from 'react';
import {
  FormGroup,
  FormControl,
  Button,
  Form,
  ControlLabel,
} from 'react-bootstrap';

const SearchForm = (props) => {
  const { defaults, categories, sources, propertyTypes, onSubmit, onChange, users = [], onReset, loading } = props;
  return (
    <Form horizontal onSubmit={onSubmit} className="properties-search-form container">
      <FormGroup>
        <ControlLabel>
          Search Keyword
          <FormControl
            value={defaults.search_string || ''}
            name="search_string"
            type="text"
            placeholder="Search..."
            onChange={onChange}
          />
        </ControlLabel>
      </FormGroup>
      <FormGroup controlId="source">
        <ControlLabel>
          Source
          <FormControl
            value={defaults.search_source || ''}
            name="search_source"
            componentClass="select"
            onChange={onChange}
          >
            <option value={''}>All Sources</option>
            {sources.map(source => (
              <option key={source.id} value={source.id}>{source.name}</option>
            ))}
          </FormControl>
        </ControlLabel>
      </FormGroup>
      <FormGroup controlId="property_types">
        <ControlLabel>
          Proporty Types
          <FormControl
            value={defaults.search_property_types || ''}
            name="search_property_types"
            componentClass="select"
            onChange={onChange}
          >
            <option value={''}>All Types</option>
            {propertyTypes.index.map(key => (
              <option key={key} value={key}>{propertyTypes.value[key].name}</option>
            ))}
          </FormControl>
        </ControlLabel>
      </FormGroup>
      <FormGroup controlId="price">
        <ControlLabel>
          Category
          <FormControl
            value={defaults.search_category || ''}
            name="search_category"
            componentClass="select"
            onChange={onChange}
          >
            <option value={''}>All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </FormControl>
        </ControlLabel>
      </FormGroup>
      <FormGroup controlId="owner">
        <ControlLabel>
          User
          <FormControl
            placeholder="User..."
            value={defaults.search_owner || ''}
            name="search_owner"
            type="text"
            componentClass="select"
            onChange={onChange}
          >
            <option value="" disabled>Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </FormControl>
        </ControlLabel>
      </FormGroup>
      <FormGroup>
        <ControlLabel>
          Price min
          <FormControl
            value={defaults.search_price_min || ''}
            name="search_price_min"
            type="number"
            placeholder="Price min"
            onChange={onChange}
          />
        </ControlLabel>
      </FormGroup>
      <FormGroup>
        <ControlLabel>
          Price max
          <FormControl
            value={defaults.search_price_max || ''}
            name="search_price_max"
            type="number"
            placeholder="Price max"
            onChange={onChange}
          />
        </ControlLabel>
      </FormGroup>
      <FormGroup>
        <Button bsStyle="primary" disabled={loading && loading.list} type="submit">{loading && loading.list && <i className="fa fa-circle-o-notch fa-spin" />} Search</Button>
      </FormGroup>
      <FormGroup>
        <Button bsStyle="warning" type="reset" onClick={onReset}>Reset</Button>
      </FormGroup>
    </Form>
  );
};

SearchForm.propTypes = {
  defaults: PropTypes.object.isRequired,
  categories: PropTypes.array,
  loading: PropTypes.object,
  users: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default SearchForm;
