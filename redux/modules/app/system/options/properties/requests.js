import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_TYPES = '/admin/option/property_type/full';
const URL_FETCH_TYPES_ACTIVE = '/admin/option/property_type/current';
const URL_UPDATE_TYPES = '/admin/option/property_type/save';

export const fetchTypes = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_TYPES)}`)
  ).then(checkStatus);

export const fetchCurrent = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_TYPES_ACTIVE)}`)
  ).then(checkStatus);

export const updateCurrent = data => getRequest(
    request => request
      .post(`${endpoint(URL_UPDATE_TYPES)}`)
      .send(data)
  ).then(checkStatus);
