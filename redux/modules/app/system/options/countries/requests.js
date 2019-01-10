import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_CODES = '/utils/country_codes';
const URL_FETCH_CODES_ACTIVE = '/admin/option/mobile_code/current';
const URL_UPDATE_CODES = '/admin/option/mobile_code/save';

export const fetch = () => getRequest(
    request => request
      .get(`${endpoint(URL_FETCH_CODES)}`)
  ).then(checkStatus);

export const fetchCurrent = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_CODES_ACTIVE)}`)
  ).then(checkStatus);

export const updateCurrent = data => getRequest(
    request => request
      .post(`${endpoint(URL_UPDATE_CODES)}`)
      .send(data)
  ).then(checkStatus);
