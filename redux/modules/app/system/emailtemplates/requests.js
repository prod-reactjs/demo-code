import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_TEMPLATE = '/admin_email_template/fetch';
const URL_CREATE_TEMPLATE = '/admin_email_template/create';
const URL_UPDATE_TEMPLATE = '/admin_email_template/update';
const URL_DELETE_TEMPLATE = '/admin_email_template/delete';
const URL_TEMPLATE_INFO = '/admin_email_template/info';

export const emailTemplatesFetch = () =>
  getRequest(request =>
    request
      .post(`${endpoint(URL_FETCH_TEMPLATE)}`)
  ).then(checkStatus);

export const emailTemplateCreate = data =>
  getRequest(request =>
    request
      .post(`${endpoint(URL_CREATE_TEMPLATE)}`)
      .send(data)
  ).then(checkStatus);

export const emailTemplateUpdate = data =>
  getRequest(request =>
    request
      .post(`${endpoint(URL_UPDATE_TEMPLATE)}`)
      .send(data)
  ).then(checkStatus);

export const emailTemplateDelete = id =>
  getRequest(request =>
    request
      .post(`${endpoint(URL_DELETE_TEMPLATE)}`)
      .query({ id })
  ).then(checkStatus);

export const emailTemplateInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_TEMPLATE_INFO)}`)
    .query({ id }))
  .then(checkStatus);
