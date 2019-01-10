import { getRequest, endpoint, checkStatus } from 'common/utils';

export const URL_AWS_IMPORT = 'https://import-juvo.s3-eu-west-1.amazonaws.com/';
const URL_FETCH = '/contact/fetch';
const URL_CONTACT_CREATE = '/contact/create';
const URL_CONTACT_DELETE = '/contact/delete';
const URL_CONTACT_INFO = '/contact/info';
const URL_CONTACT_UPDATE = '/contact/update';
const URL_FETCH_CATEGORIES = '/contact/category_array';
const URL_FETCH_SOURCES = '/contact/source_array';
const URL_FETCH_COUNTRYCODES = '/utils/country_codes';
const URL_FETCH_TEMPLATES = '/template/contact';
const URL_PRINT_TEMPLATE = '/print/contact';
const URL_FETCH_NOTES = '/note/fetch';
const URL_FETCH_NOTECATEGORIES = '/note/category_array';
const URL_CREATE_NOTE = '/note/create';
const URL_DELETE_NOTE = '/note/delete';
const URL_FETCH_SMS = '/sms/fetch';
const URL_CREATE_SMS = '/sms/create';
const URL_FETCH_EMAILS = '/email/fetch';
const URL_CREATE_EMAIL = '/email/create';
const URL_CREATE_SIGNABLE_EMAIL = '/plugin_signable/send';
const URL_CREATEDOCUMENT = '/document/create';
const URL_DOCUMENTSIGN = '/document/sign';
const URL_FETCH_DOCUMENTS = '/document/fetch';
const URL_DELETE_DOCUMENT = '/document/delete';
const URL_GET_DOCUMENT = '/document/get_file';
export const URL_AWS_DOCUMENTS = 'https://doc-juvo.s3-eu-west-1.amazonaws.com/';
const URL_FETCHALL_LOCATIONS = '/location/fetch';
const URL_FETCH_LOCATIONS = '/location/contact/fetch';
const URL_SAVE_LOCATIONS = '/location/contact/save';
const URL_FETCH_APPOINTMENTS = '/appointment/contact';
const URL_FETCH_ACTIVITY = '/activity/contact';
const URL_IMPORT_CONTACTS = '/contact/import';
const URL_CREATE_IMPORT = '/contact/import_create';
const URL_SIGN_IMPORT = '/contact/import_sign';
const URL_STAR_CONTACT = '/contact/star';
const URL_UNSTAR_CONTACT = '/contact/unstar';
const URL_FETCH_MAILCHIMP = '/plugin_mailchimp/fetch_lists';
const URL_SEND_TO_MAILCHIMP = 'plugin_mailchimp/send';

export const fetch = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH)}`)
    .send(data)
).then(checkStatus);

export const fetchInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_CONTACT_INFO)}`)
    .query({ id })
).then(checkStatus);

export const createContact = data => getRequest(
  request => request
    .post(`${endpoint(URL_CONTACT_CREATE)}`)
    .send(data)
).then(checkStatus);

export const deleteContact = id => getRequest(
  request => request
    .post(`${endpoint(URL_CONTACT_DELETE)}`)
    .query({ id })
).then(checkStatus);

export const updateContact = data => getRequest(
  request => request
    .post(`${endpoint(URL_CONTACT_UPDATE)}`)
    .send(data)
).then(checkStatus);

export const fetchCategories = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_CATEGORIES)}`)
    .send(data)
).then(checkStatus);

export const fetchSources = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_SOURCES)}`)
    .send(data)
).then(checkStatus);

export const fetchCodes = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_COUNTRYCODES)}`)
    .send(data)
).then(checkStatus);

export const fetchTemplates = () => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_TEMPLATES)}`)
).then(checkStatus);

export const fetchNotes = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_NOTES)}`)
    .send(data))
  .then(checkStatus);

export const getNotesCategory = () => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_NOTECATEGORIES)}`))
  .then(checkStatus);

export const createNote = data => getRequest(
  request => request
    .post(`${endpoint(URL_CREATE_NOTE)}`)
    .send(data))
  .then(checkStatus);

export const deleteNote = data => getRequest(
  request => request
    .post(`${endpoint(URL_DELETE_NOTE)}`)
    .query(data))
  .then(checkStatus);

export const fetchSMS = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_SMS)}`)
    .send(data))
  .then(checkStatus);

export const createSMS = data => getRequest(
  request => request
    .post(`${endpoint(URL_CREATE_SMS)}`)
    .send(data))
  .then(checkStatus);

  export const fetchEmails = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_EMAILS)}`)
    .send(data))
  .then(checkStatus);
export const createEmail = data => getRequest(
  request => request
    .post(`${endpoint(URL_CREATE_EMAIL)}`)
    .send(data))
  .then(checkStatus);

export const createSignableEmail = data => getRequest(
  request => request
    .post(`${endpoint(URL_CREATE_SIGNABLE_EMAIL)}`)
    .send(data))
  .then(checkStatus);

export const printTemplate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PRINT_TEMPLATE)}`)
    .send(data))
  .then(checkStatus);

export const getDocumentSign = () => getRequest(
  request => request
    .post(`${endpoint(URL_DOCUMENTSIGN)}`)
    .query())
  .then(checkStatus);

export const createDocuments = data => getRequest(
  request => request
    .post(`${endpoint(URL_CREATEDOCUMENT)}`)
    .send(data))
  .then(checkStatus);

export const fetchDocuments = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_DOCUMENTS)}`)
    .send(data))
  .then(checkStatus);

export const deleteDocument = id => getRequest(
  request => request
    .post(`${endpoint(URL_DELETE_DOCUMENT)}`)
    .query({ id }))
  .then(checkStatus);

export const downloadDocument = id => getRequest(
  request => request
    .post(`${endpoint(URL_GET_DOCUMENT)}`)
    .query({ id }))
  .then(checkStatus);

export const fetchContactLocations = id => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_LOCATIONS)}`)
    .query({ id }))
  .then(checkStatus);

export const fetchLocations = () => getRequest(
  request => request
    .post(`${endpoint(URL_FETCHALL_LOCATIONS)}`))
  .then(checkStatus);

export const saveLocations = data => getRequest(
  request => request
    .post(`${endpoint(URL_SAVE_LOCATIONS)}`)
    .send(data))
  .then(checkStatus);

export const fetchContactAppointments = id => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_APPOINTMENTS)}`)
    .query({ id }))
  .then(checkStatus);

export const fetchContactActivity = id => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_ACTIVITY)}`)
    .query({ id }))
  .then(checkStatus);

export const importContacts = data => getRequest(
  request => request
    .post(`${endpoint(URL_IMPORT_CONTACTS)}`)
    .send(data))
  .then(checkStatus);

export const importCreate = data =>
  getRequest(request =>
    request
      .post(`${endpoint(URL_CREATE_IMPORT)}`)
      .send(data)
  ).then(checkStatus);

export const signImport = () => getRequest(
  request => request
    .post(`${endpoint(URL_SIGN_IMPORT)}`)
    .query())
  .then(checkStatus);

export const star = id => getRequest(
  request => request
    .post(`${endpoint(URL_STAR_CONTACT)}`)
    .query({ id }))
  .then(checkStatus);

export const unstar = id => getRequest(
  request => request
    .post(`${endpoint(URL_UNSTAR_CONTACT)}`)
    .query({ id }))
  .then(checkStatus);

export const mailchimpFetch = () => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_MAILCHIMP)}`))
  .then(checkStatus);

export const send2mailchimp = data => getRequest(
  request => request
    .post(`${endpoint(URL_SEND_TO_MAILCHIMP)}`)
    .send(data))
  .then(checkStatus);
