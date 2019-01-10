import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH = '/offer/fetch';
const URL_OFFER_INFO = '/offer/info';
const URL_OFFER_CREATE = '/offer/create';
const URL_OFFER_UPDATE = '/offer/update';
const URL_OFFER_DELETE = '/offer/delete';
const URL_PEOPLE_AUTOCOMPLETE = '/autocomplete/contact';
const URL_PROPERTY_AUTOCOMPLETE = '/autocomplete/property';
const URL_FETCH_NOTES = '/note/fetch';
const URL_FETCH_NOTECATEGORIES = '/note/category_array';
const URL_CREATE_NOTE = '/note/create';
const URL_DELETE_NOTE = '/note/delete';
const URL_PRINT_TEMPLATE = '/print/offer';
const URL_DOCUMENTSIGN = '/document/sign';
export const URL_AWS_DOCUMENTS = 'https://doc-juvo.s3-eu-west-1.amazonaws.com/';
const URL_CREATEDOCUMENT = '/document/create';
const URL_FETCH_ACTIVITY = '/activity/offer';
const URL_GET_DOCUMENT = '/document/get_file';
const URL_DELETE_DOCUMENT = '/document/delete';
const URL_FETCH_EMAILS = '/email/fetch';

export const fetch = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH)}`)
    .send(data)
).then(checkStatus);
export const offerInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_OFFER_INFO)}`)
    .query({ id })
).then(checkStatus);
export const offerCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_OFFER_CREATE)}`)
    .send(data)
).then(checkStatus);
export const offerUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_OFFER_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const offerDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_OFFER_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const peopleAutocomplete = data => getRequest(
  request => request
    .post(`${endpoint(URL_PEOPLE_AUTOCOMPLETE)}`)
    .send({ s: data })
).then(checkStatus);
export const propertyAutocomplete = data => getRequest(
  request => request
    .post(`${endpoint(URL_PROPERTY_AUTOCOMPLETE)}`)
    .send({ s: data })
).then(checkStatus);
export const getOfferNotes = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_NOTES)}`)
    .send(data)
).then(checkStatus);
export const getNotesCategory = () => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_NOTECATEGORIES)}`)
).then(checkStatus);
export const createNote = data => getRequest(
  request => request
    .post(`${endpoint(URL_CREATE_NOTE)}`)
    .send(data)
).then(checkStatus);
export const deleteNote = data => getRequest(
  request => request
    .post(`${endpoint(URL_DELETE_NOTE)}`)
    .query(data)
).then(checkStatus);
export const printTemplate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PRINT_TEMPLATE)}`)
    .send(data)
).then(checkStatus);
export const getDocumentSign = () => getRequest(
  request => request
    .post(`${endpoint(URL_DOCUMENTSIGN)}`)
    .query()
).then(checkStatus);
export const createDocuments = data => getRequest(
  request => request
    .post(`${endpoint(URL_CREATEDOCUMENT)}`)
    .send(data)
).then(checkStatus);
export const fetchOfferActivity = id => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_ACTIVITY)}`)
    .query({ id }))
  .then(checkStatus);
export const downloadDocument = id => getRequest(
  request => request
    .post(`${endpoint(URL_GET_DOCUMENT)}`)
    .query({ id })
).then(checkStatus);
export const deleteDocument = id => getRequest(
  request => request
    .post(`${endpoint(URL_DELETE_DOCUMENT)}`)
    .query({ id })
).then(checkStatus);
export const fetchEmails = data => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_EMAILS)}`)
      .send(data))
      .then(checkStatus);
