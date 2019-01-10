import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH = '/admin/info';
const URL_UPDATE = '/admin/setting';
const URL_SIGN = '/admin/sign';
export const URL_AWS_LOGO = 'https://account-media-juvo.s3-eu-west-1.amazonaws.com';


export const fetch = () => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH)}`)
  ).then(checkStatus);

export const update = data => getRequest(
    request => request
      .post(`${endpoint(URL_UPDATE)}`)
      .send(data)
  ).then(checkStatus);

export const signLogo = () => getRequest(
  request => request
    .post(`${endpoint(URL_SIGN)}`)
    .query())
  .then(checkStatus);
