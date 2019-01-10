import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';
import superagent from 'superagent-defaults';
import { downloadFile, objectToArray, momentFormats } from 'common/utils';
import {
  URL_AWS_DOCUMENTS,
  URL_AWS_IMPORT,
  fetch,
  fetchInfo,
  createContact,
  deleteContact,
  updateContact,
  fetchTemplates,
  printTemplate,
  fetchNotes,
  getNotesCategory,
  createNote,
  deleteNote,
  fetchSMS,
  createSMS,
  fetchEmails,
  createEmail,
  fetchDocuments,
  downloadDocument,
  createDocuments,
  getDocumentSign,
  deleteDocument,
  fetchLocations,
  fetchContactLocations,
  saveLocations,
  fetchContactAppointments,
  fetchContactActivity,
  importContacts,
  importCreate,
  signImport,
  star,
  unstar,
  mailchimpFetch,
  send2mailchimp,
  createSignableEmail
} from './requests';
import { SET_USERS } from '../../user';
import { fetch as fetchUsers } from '../../user/requests';
import { SET_STATIC_DATA, SET_USER_DATA } from '../../common';
import { peopleAutocomplete } from '../diary/requests';
// import { propertyAutocomplete } from '../diary/requests';


const SET_CONTACT_EVENT = 'juvo/app/contacts/SET_CONTACT_EVENT';
const SET_CONTACTS = 'juvo/app/contacts/SET_CONTACTS';
const SET_CONTACTS_PAGINATION = 'juvo/app/contacts/SET_CONTACTS_PAGINATION';

// const SET_CONTACTS_CATEGORIES = 'juvo/app/contacts/SET_CONTACTS_CATEGORIES';
const SET_CONTACTS_SOURCES = 'juvo/app/contacts/SET_CONTACTS_SOURCES';
const SET_CONTACTS_CODES = 'juvo/app/contacts/SET_CONTACTS_CODES';
const SET_CONTACTS_SEARCH = 'juvo/app/contacts/SET_CONTACTS_SEARCH';
const SET_CONTACT_CREATE = 'juvo/app/contacts/SET_CONTACT_CREATE';
const SET_CONTACT_DETAILED = 'juvo/app/contacts/SET_CONTACT_DETAILED';
const SET_CONTACT_INFO = 'juvo/app/contacts/SET_CONTACT_INFO';
const SET_CONTACT_DELETE = 'juvo/app/contacts/SET_CONTACT_DELETE';
const SET_CONTACT_UPDATE = 'juvo/app/contacts/SET_CONTACT_UPDATE';
const SET_CONTACT_ERROR = 'juvo/app/contacts/SET_CONTACT_ERROR';
const SET_TEMPLATE_TYPES = 'juvo/app/contacts/SET_TEMPLATE_TYPES';
// const SET_PRINT_TEMPLATES = 'juvo/app/contacts/SET_PRINT_TEMPLATES';
const SET_NOTES = 'juvo/app/contacts/SET_NOTES';
const SET_NOTES_CATEGORY = 'juvo/app/contacts/SET_NOTES_CATEGORY';
const SET_NOTE_CREATE = 'juvo/app/contacts/SET_NOTE_CREATE';
const SET_NOTE_DELETE = 'juvo/app/contacts/SET_NOTE_DELETE';
const SET_SMS = 'juvo/app/contacts/SET_SMS';
const SET_SMSS = 'juvo/app/contacts/SET_SMSS';
const SET_SMS_CREATE = 'juvo/app/contacts/SET_SMS_CREATE';
const SET_SMS_DELETE = 'juvo/app/contacts/SET_SMS_DELETE';
const SET_HIDE_MODAL = 'juvo/app/contacts/SET_HIDE_MODAL';
const SET_EMAIL = 'juvo/app/contacts/SET_EMAIL';
const SET_EMAILS = 'juvo/app/contacts/SET_EMAILS';
const SET_EMAIL_CREATE = 'juvo/app/contacts/SET_EMAIL_CREATE';
const SET_DOCUMENTS = 'juvo/app/contacts/SET_DOCUMENTS';
const SET_CREATE_DOCUMENT = 'juvo/app/contacts/SET_CREATE_DOCUMENT';
const SET_DELETE_DOCUMENT = 'juvo/app/contacts/SET_DELETE_DOCUMENT';
const SET_UPLOAD_PROGRESS = 'juvo/app/contacts/SET_UPLOAD_PROGRESS';
const SET_LOCATIONS = 'juvo/app/contacts/SET_LOCATIONS';
const SET_CONTACT_LOCATIONS = 'juvo/app/contacts/SET_CONTACT_LOCATIONS';
const SET_LOCATIONS_UPDATE = 'juvo/app/contacts/SET_LOCATIONS_UPDATE';
const SET_APPOINTMENTS = 'juvo/app/contacts/SET_APPOINTMENTS';
const SET_ACTIVITY = 'juvo/app/contacts/SET_ACTIVITY';
const SET_LOADING = 'juvo/app/contacts/SET_LOADING';
const SET_CLEAR_CONTACT = 'juvo/app/contacts/SET_CLEAR_CONTACT';
// const PROPERTY_AUTOCOMPLETE = 'juvo/app/contacts/PROPERTY_AUTOCOMPLETE';
const SET_IMPORT = 'juvo/app/contacts/SET_IMPORT';
const SET_IMPORT_CREATE = 'juvo/app/contacts/SET_IMPORT_CREATE';
// const SET_CONTACT_PROPERTIES = 'juvo/app/contacts/SET_CONTACT_PROPERTIES';
const SET_ERROR = 'juvo/app/contacts/SET_ERROR';
const SET_CONTACT_SEARCH_PANEL = 'juvo/app/contacts/SET_CONTACT_SEARCH_PANEL';
const SET_CONTACT_ADDRESS = 'juvo/app/contacts/SET_CONTACT_ADDRESS';
const SET_PRINTED_DOCUMENT = 'juvo/app/contacts/SET_PRINTED_DOCUMENT';
const SET_STAR_CONTACT = 'juvo/app/contacts/SET_STAR_CONTACT';
const SET_MAILCHIMP_LIST = 'juvo/app/contacts/SET_MAILCHIMP_LIST';
const SET_MAILCHIMP = 'juvo/app/contacts/SET_MAILCHIMP';
const SET_SIGNABLES = 'juvo/app/contacts/SET_SIGNABLES';
const SET_SIGNABLE_RECIPIENTS = 'juvo/app/contacts/SET_SIGNABLE_RECIPIENTS';
const SET_RECIPIENTS_AUTOCOMPLETE = 'juvo/app/contacts/SET_RECIPIENTS_AUTOCOMPLETE';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';


const initialState = {
  searchValues: {
    page: 1,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SET_STATIC_DATA}${SUCCESS}`: {
      const {
        a_location: locations,
        c_category: categories,
        c_source: sources,
        c_country_code: countryCodes,
        c_source: enquirySources,
        t_contact: printTemplates,
        p_type: types,
      } = action.res;
      const propertyTypes = {
        value: {},
        index: [],
      };
      types.forEach((type) => {
        propertyTypes.index.push(type.id);
        propertyTypes.value[type.id] = type;
      });
      return {
        ...state,
        locations,
        categories,
        sources,
        countryCodes,
        enquirySources,
        printTemplates,
        types,
        propertyTypes,
      };
    }
    case `${SET_USER_DATA}${SUCCESS}`: {
      const { currency_symbol, date_display_format } = action.res.data;
      const currency = String.fromCharCode(currency_symbol.replace('#', '').replace(';', ''));
      const dateDisplayFormat = momentFormats[date_display_format];
      return {
        ...state,
        user: {
          currency,
          dateDisplayFormat,
        }
      };
    }
    case SET_CONTACT_EVENT: {
      const contact = (action.payload.data && { ...action.payload.data.contact }) || { ...state.contact };
      const { activity, appointments, documents, locations: contactLocations } = action.payload.data.contact;
      delete contact.activity;
      delete contact.appointments;
      delete contact.documents;
      delete contact.locations;

      const list = state.list ? [...state.list] : [contact];
      for (let i = 0, l = list.length; i < l; i++) {
        if (list[i].id === contact.id) {
          list[i] = contact;
        }
      }
      return {
        ...state,
        contact,
        list,
        activity,
        appointments,
        documents,
        contactLocations,
      };
    }
    case SET_CONTACTS: {
      return { ...state, list: objectToArray(action.payload), documents: [], contactLocations: [], appointments: [], };
    }
    case `${SET_CONTACTS}${REQUEST}`: {
      return { ...state, loading: { list: true } };
    }
    case `${SET_CONTACTS}${SUCCESS}`: {
      // const response = action.res;
      // const list = response.data;
      const { data: list, ...pagination } = action.res;
      return {
        ...state,
        list,
        pagination,
        loading: {},
        error: false,
        documents: [],
        contactLocations: [],
        appointments: [],
      };
    }
    case SET_CONTACTS_PAGINATION: {
      return { ...state, pagination: objectToArray(action.payload) };
    }
    case SET_CONTACTS_SEARCH: {
      return { ...state, searchValues: action.payload };
    }
    case `${SET_CONTACT_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_CONTACT_CREATE}${SUCCESS}`: {
      const contact = action.res.data.contact;
      return { ...state, contact, error: { callback: () => browserHistory.push(`/contacts/${contact.id}`) }, documents: [], contactLocations: [], appointments: [], };
    }
    case `${SET_CONTACT_DELETE}${SUCCESS}`: {
      const list = [...state.list].filter(contact => contact.id !== parseInt(action.res.id, 10));
      return { ...state, list, error: { callback: () => toastr.info('Deleted', 'Contact deleted!') } };
    }
    case `${SET_CONTACT_INFO}${SUCCESS}`: {
      const contact = action.res.data.contact;
      const { activity, appointments, documents, locations: contactLocations } = action.res.data.contact;
      delete contact.activity;
      delete contact.appointments;
      delete contact.documents;
      delete contact.locations;

      return { ...state, contact, activity, appointments, documents, contactLocations, error: {} };
    }
    case SET_CONTACT_DETAILED: {
      const contact = { ...action.payload };
      const { activity, appointments, documents, locations: contactLocations } = action.payload.contact;
      delete contact.activity;
      delete contact.appointments;
      delete contact.documents;
      delete contact.locations;

      return { ...state, contact: action.payload, activity, appointments, documents, contactLocations, };
    }
    case SET_CONTACT_UPDATE: {
      const contact = action.payload;
      const contacts = state.contacts ? [...state.contacts].map(item => (item.id !== contact.id ? item : contact)) : [contact];
      return { ...state, contact, contacts };
    }
    case `${SET_CONTACT_UPDATE}${REQUEST}`: {
      return { ...state, loading: { general: true } };
    }
    case `${SET_CONTACT_UPDATE}${SUCCESS}`: {
      const contact = action.res.data.contact;
      const { activity, appointments, documents, locations: contactLocations } = action.res.data.contact;
      delete contact.activity;
      delete contact.appointments;
      delete contact.documents;
      delete contact.locations;
      // const contacts = state.contacts ? [...state.contacts].map(item => (item.id !== contact.id ? item : contact)) : [contact];
      const list = state.list ? [...state.list] : [contact];
      for (let i = 0, l = list.length; i < l; i++) {
        if (list[i].id === contact.id) {
          list[i] = contact;
        }
      }

      return {
        ...state,
        list,
        contact,
        activity,
        appointments,
        documents,
        contactLocations,
        error: { callback: () => toastr.success('Contact', 'Saved') },
        loading: {}
      };
    }
    case `${SET_CONTACT_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_LOCATIONS_UPDATE}${REQUEST}`: {
      console.log('loading');
      return { ...state, loading: state.loading ? { ...state.loading, location: true } : { location: true } };
    }
    case `${SET_LOCATIONS_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, location: false } : { location: false },
      };
    }
    case `${SET_LOCATIONS_UPDATE}${SUCCESS}`: {
      return {
        ...state,
        error: { callback: () => toastr.success('Locations', 'Locations updated') },
        loading: state.loading ? { ...state.loading, location: false } : { location: false },
      };
    }
    case SET_CONTACT_ERROR: {
      const error = state.error ? { ...state.error } : {};
      delete error.callback;
      return { ...state, error };
    }
    case SET_HIDE_MODAL: {
      return { ...state, modal: '' };
    }
    case SET_TEMPLATE_TYPES: {
      return { ...state, printValues: action.payload };
    }
    case `${SET_TEMPLATE_TYPES}${SUCCESS}`: {
      const printTemplates = action.res.data;
      return { ...state, printTemplates };
    }
    case `${SET_NOTES_CATEGORY}${SUCCESS}`: {
      const noteCategories = action.res.data;
      return { ...state, noteCategories };
    }
    case `${SET_NOTES}${REQUEST}`: {
      return { ...state, modal: 'notes' };
    }
    case `${SET_NOTES}${SUCCESS}`: {
      const notes = action.res.data;
      return { ...state, notes };
    }
    case SET_NOTE_CREATE: {
      return { ...state, note: action.payload };
    }
    case `${SET_NOTE_CREATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, note: true } : { note: true } };
    }
    case `${SET_NOTE_CREATE}${SUCCESS}`: {
      const notes = [action.res.data].concat([...state.notes]);
      return {
        ...state,
        notes,
        note: {},
        error: { callback: () => toastr.success('Note', 'Note created!') },
        loading: state.loading ? { ...state.loading, note: false } : { note: false }
      };
    }
    case `${SET_NOTE_CREATE}${FAILURE}`: {
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors },
        loading: state.loading ? { ...state.loading, note: false } : { note: false }
      };
    }
    case `${SET_NOTE_DELETE}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_NOTE_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const notes = [...state.notes].filter(note => note.id !== id);
      return { ...state, notes, note: {}, error: { callback: () => toastr.info('Note', 'Note deleted!') } };
    }
    case SET_SMS: {
      return { ...state, sms: action.payload };
    }
    case `${SET_SMSS}${REQUEST}`: {
      return { ...state, modal: 'sms', sms: { to: state.contact.mobile, mobile_country_code_id: state.contact.mobile_country_code_id } };
    }
    case `${SET_SMSS}${SUCCESS}`: {
      const smss = action.res.data;
      return { ...state, smss };
    }
    case `${SET_SMS_CREATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, sms: true } : { sms: true } };
    }
    case `${SET_SMS_CREATE}${SUCCESS}`: {
      const smss = [action.res.data].concat([...state.smss]);
      const sms = { ...state.sms };
      delete sms.message;
      return {
        ...state,
        smss,
        sms,
        error: { callback: () => toastr.success('Sent', 'Message sent!') },
        loading: state.loading ? { ...state.loading, sms: false } : { sms: false }
      };
    }
    case `${SET_SMS_CREATE}${FAILURE}`: {
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors },
        loading: state.loading ? { ...state.loading, sms: false } : { sms: false }
      };
    }
    case `${SET_SMS_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const smss = [...state.smss].filter(sms => sms.id !== id);
      return { ...state, smss, sms: {} };
    }
    case `${SET_EMAILS}${REQUEST}`: {
      return { ...state };
    }
    case `${SET_EMAILS}${SUCCESS}`: {
      const emails = action.res.data;
      console.log(emails);
      return { ...state, emails };
    }
    case `${SET_SIGNABLES}${REQUEST}`: {
      return { ...state, modal: 'signables' };
    }
    case `${SET_SIGNABLES}${SUCCESS}`: {
      const emails = action.res.data;
      return { ...state, emails };
    }
    case SET_SIGNABLE_RECIPIENTS: {
      let emails = state.emails.length > 0 ? { ...state.emails } : [];
      const recipients = state.recipients;
      console.log(emails);
      if (emails === []) {
        emails = [];
      }
      console.log(emails, 'hiiiiiiiiiii', state.recipients);
      // const recipients = { ...state.recipients };
      const se = { ...state.email };
      recipients.push({ name: se.name, email: action.payload[0].email });
      // emails.push({ name: se.name, email: action.payload[0].email });
      return { ...state, emails, recipients };
    }
    case `${SET_RECIPIENTS_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, recipients: action.res.data };
    }
    case SET_EMAIL: {
      return { ...state, email: action.payload };
    }
    case `${SET_EMAIL_CREATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, email: true } : { email: true } };
    }
    case `${SET_EMAIL_CREATE}${SUCCESS}`: {
      const emails = [action.res.data].concat([...state.contact.emails]);
      const email = { ...state.email };
      delete email.message;
      delete email.subject;
      return {
        ...state,
        emails,
        email,
        printedDoc: null,
        error: { callback: () => toastr.success('Sent', 'Message sent!') },
        loading: state.loading ? { ...state.loading, email: false } : { email: false }
      };
    }
    case `${SET_EMAIL_CREATE}${FAILURE}`: {
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors },
        loading: state.loading ? { ...state.loading, email: false } : { email: false }
      };
    }
    case SET_CREATE_DOCUMENT: {
      const documents = state.documents ? [action.payload].concat([...state.documents].filter(doc => doc.id !== action.payload.id)) : [action.payload];
      return { ...state, documents, printValues: {} };
    }
    case `${SET_DOCUMENTS}${SUCCESS}`: {
      return { ...state, documents: action.res.data };
    }
    case `${SET_DELETE_DOCUMENT}${SUCCESS}`: {
      const documents = [...state.documents].filter(doc => doc.id.toString() !== action.res.id);
      return { ...state, documents };
    }
    case SET_UPLOAD_PROGRESS: {
      return { ...state, uploadDocumentProgress: action.payload };
    }
    case `${SET_LOCATIONS}${SUCCESS}`: {
      return { ...state, locations: action.res.data };
    }
    case SET_CONTACT_LOCATIONS: {
      return { ...state, contactLocations: action.payload };
    }
    case `${SET_CONTACT_LOCATIONS}${SUCCESS}`: {
      return { ...state, contactLocations: action.res.data };
    }
    case `${SET_APPOINTMENTS}${SUCCESS}`: {
      return { ...state, appointments: action.res.data };
    }
    case `${SET_ACTIVITY}${SUCCESS}`: {
      return { ...state, activity: action.res.data.array };
    }
    case SET_LOADING: {
      const loading = action.payload;
      return { ...state, loading };
    }
    case SET_CLEAR_CONTACT: {
      return {
        ...state,
        contact: {},
      };
    }
    // case `${PROPERTY_AUTOCOMPLETE}${SUCCESS}`: {
    //   return { ...state, properties: action.res.data };
    // }
    // case SET_CONTACT_PROPERTIES: {
    //   const contact = { ...state.contact };
    //   contact.properties = action.payload;
    //   return { ...state, contact, properties: [] };
    // }
    case SET_IMPORT: {
      return { ...state, importValues: action.payload };
    }
    case `${SET_IMPORT}${SUCCESS}`: {
      return { ...state, importValues: {}, error: { callback: () => toastr.success('Contact', 'Imported') }, loading: {} };
    }
    case `${SET_IMPORT}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Import', action.error) }, loading: {} };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload, loading: {} };
    }
    case SET_CONTACT_SEARCH_PANEL: {
      return { ...state, searchPanel: !state.searchPanel };
    }
    case SET_CONTACT_ADDRESS: {
      const contact = state.contact ? { ...state.contact } : {};
      const [line1, line2, line3, , , town, county] = action.payload.address.split(',');
      contact.address_1 = line1;
      contact.address_2 = line2;
      contact.address_3 = line3;
      contact.town = town;
      contact.county = county;
      contact.postcode = action.payload.zipCode;
      return { ...state, contact };
    }
    case SET_PRINTED_DOCUMENT: {
      return { ...state, loading: {}, printedDoc: action.payload };
    }
    case `${SET_STAR_CONTACT}${SUCCESS}`: {
      const list = [...state.list].map(contact => (contact.id === action.res.data.contact.id ? action.res.data.contact : contact));
      return { ...state, list };
    }
    case `${SET_USERS}${SUCCESS}`: {
      return { ...state, users: action.res.data };
    }
    case `${SET_MAILCHIMP_LIST}${REQUEST}`: {
      return { ...state, modal: 'mailchimp' };
    }
    case `${SET_MAILCHIMP_LIST}${FAILURE}`: {
      return { ...state, modal: '' };
    }
    case `${SET_MAILCHIMP_LIST}${SUCCESS}`: {
      return { ...state, mailchimp: action.res.data };
    }
    case `${SET_MAILCHIMP}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message) } };
    }
    case `${SET_MAILCHIMP}${SUCCESS}`: {
      return { ...state, error: { callback: () => toastr.success('Success', action.res.message) } };
    }
    default: return state;
  }
};

export const setContactEvent = event => ({ type: SET_CONTACT_EVENT, payload: event });
export const fetchContacts = (page = 1) => {
  return (dispatch, getState) => {
    const searchValues = { ...getState().app.contacts.searchValues } || {};
    searchValues.page = page;
    dispatch({ type: SET_CONTACTS, promise: fetch(searchValues) });
  };
};

// export const fetchContacts = (event) => {
//   if (event && event.preventDefault) {
//     event.preventDefault();
//   }
//   return (dispatch, getState) => {
//     const query = {...getState().app.contacts.searchValues};
//     dispatch({ type: SET_CONTACTS, promise: fetch(query) });
//   };
// };
export const setContacts = contacts => ({ type: SET_CONTACTS, payload: contacts });
// export const setCategories = categories => ({ type: SET_CONTACTS_CATEGORIES, payload: categories });
export const setContactsSources = sources => ({ type: SET_CONTACTS_SOURCES, payload: sources });
export const setContactsCodes = codes => ({ type: SET_CONTACTS_CODES, payload: codes });
export const setContactsSearch = search => ({ type: SET_CONTACTS_SEARCH, payload: search });
export const setContactsSearchLocal = (event) => {
  return (dispatch, getState) => {
    const searchValues = { ...getState().app.contacts.searchValues };
    searchValues[event.target.name] = event.target.value;
    dispatch({ type: SET_CONTACTS_SEARCH, payload: searchValues });
  };
};
export const handleSearchSubmit = (event) => {
  event.preventDefault();
  return dispatch => dispatch(fetchContacts());
};
export const setContactsPagination = pagination => ({ type: SET_CONTACTS_PAGINATION, payload: pagination });
export const setContactDetailed = contact => ({ type: SET_CONTACT_DETAILED, payload: contact });
export const getContactInfo = id => ({ type: SET_CONTACT_INFO, promise: fetchInfo(id) });
export const removeContact = id => ({ type: SET_CONTACT_DELETE, promise: deleteContact(id) });
export const handleMainFormChange = (event) => {
  return (dispatch, getState) => {
    const contact = { ...getState().app.contacts.contact };
    if (event.target.type === 'checkbox') {
      const id = parseInt(event.target.name, 10);
      const types = contact.types
        ? (event.target.checked && [...contact.types].concat([id])) || (contact.types.filter(type => type !== id))
        : event.target.checked && [id];
      contact.types = types;
    } else {
      contact[event.target.name] = event.target.value;
    }
    dispatch({ type: SET_CONTACT_UPDATE, payload: contact });
  };
};
export const handleMainFormSubmit = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.contacts };
    const contact = { ...state.contact };
    contact.types = contact.types && contact.types.join(',');
    // const { categories, enquirySources } = state;
    // contact.category_id = contact.category_id || (categories[0] && categories[0].id);
    // contact.source_id = contact.source_id || (enquirySources[0] && enquirySources[0].id);
    contact.properties = contact.properties && contact.properties.map(property => property.id).join(',');

    if (contact.id) {
      dispatch({ type: SET_CONTACT_UPDATE, promise: updateContact(contact) });
    } else {
      dispatch({ type: SET_CONTACT_CREATE, promise: createContact(contact) });
    }
  };
};
export const clearError = () => ({ type: SET_CONTACT_ERROR });
export const setPrintValues = (event) => {
  return (dispatch, getState) => {
    const printValues = { ...getState().app.contacts.printValues };
    if (event.target.type === 'checkbox') {
      printValues[event.target.name] = event.target.checked;
    } else {
      printValues[event.target.name] = event.target.value;
    }
    dispatch({ type: SET_TEMPLATE_TYPES, payload: printValues });
  };
};
export const handlePrintSubmit = (event) => {
  toastr.info('Printing', 'Generating Print Template');
  event.preventDefault();
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: { print: true } });
    const state = getState().app.contacts;
    const contact = { ...state.contact };
    const printValues = { ...state.printValues };
    const printTemplates = [...state.printTemplates];
    printValues.id = contact.id;
    printValues.template_id = printValues.template_id || (printTemplates[0] && printTemplates[0].id);
    printValues.format = printValues.format || 'pdf';
    printTemplate(printValues)
      .then((response) => {
        dispatch({ type: SET_PRINTED_DOCUMENT, payload: response.doc });
        const url = response.url;
        if (printValues.sendEmail) {
          dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc });
          dispatch({ type: SET_EMAILS, promise: fetchEmails({ contact_id: state.contact.id }) });
        } else if (printValues.sendSignable) {
          dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc });
          dispatch({ type: SET_SIGNABLES, promise: fetchEmails({ contact: state.contact.id }) });
        } else {
          dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc });
          downloadFile(url, response.doc.filename);
        }
      })
      .catch((error) => {
        toastr.error('Printing', error.message);
        dispatch({ type: SET_LOADING, payload: {} });
      });
  };
};
export const handleDocumentDownload = (id, filename) => {
  return () => {
    downloadDocument(id).then((response) => {
      const { url } = response.data;
      downloadFile(url, filename);
    }).catch(error => toastr.error('Download', error.message));
  };
};
export const setTemplates = () => ({ type: SET_TEMPLATE_TYPES, promise: fetchTemplates() });
export const hideModal = () => ({ type: SET_HIDE_MODAL });
export const getContactNotes = () => {
  return (dispatch, getState) => {
    const contact = { ...getState().app.contacts.contact };
    dispatch({ type: SET_NOTES_CATEGORY, promise: getNotesCategory() });
    dispatch({ type: SET_NOTES, promise: fetchNotes({ people_id: contact.id }) });
  };
};
export const setNote = (event) => {
  return (dispatch, getState) => {
    const note = { ...getState().app.contacts.note };
    note[event.target.name] = event.target.value;
    dispatch({ type: SET_NOTE_CREATE, payload: note });
  };
};
export const setCreateNote = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.contacts;
    const { contact } = { ...state };
    const note = state.note ? { ...state.note } : {};
    const noteCategories = [...state.noteCategories];
    note.people_id = contact.id;
    note.category_id = note.category_id || (noteCategories[0] && noteCategories[0].id);
    dispatch({ type: SET_NOTE_CREATE, promise: createNote(note) });
  };
};
export const setDeleteNote = id => ({ type: SET_NOTE_DELETE, promise: deleteNote({ id }) });
export const getContactEmails = (id) => {
  return (dispatch) => {
    // const contact = { ...getState().app.contacts.contact };
    dispatch({ type: SET_EMAILS, promise: fetchEmails({ people_id: id }) });
  };
};
export const getContactSMS = () => (dispatch, getState) => {
  const id = getState().app.contacts.contact.id;
  dispatch({ type: SET_SMSS, promise: fetchSMS({ people_id: id }) });
};
export const handleSMSChange = event => (dispatch, getState) => {
  const sms = { ...getState().app.contacts.sms };
  sms[event.target.name] = event.target.value;
  dispatch({ type: SET_SMS, payload: sms });
};
export const handleSMSCreate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.contacts;
    const { contact } = { ...state };
    const sms = state.sms ? { ...state.sms } : {};
    sms.people_id = contact.id;
    dispatch({ type: SET_SMS_CREATE, promise: createSMS(sms) });
  };
};
export const handleEmailChange = event => (dispatch, getState) => {
  const email = { ...getState().app.contacts.email };
  email[event.target.name] = event.target.value;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const handleRecipientChange = data => ({ type: SET_RECIPIENTS_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const handleRecipientSelect = id => ({ type: SET_SIGNABLE_RECIPIENTS, payload: id });
export const handleEmailCreate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.contacts;
    const { contact } = { ...state };
    const email = state.email ? { ...state.email } : {};
    email.document_id = state.printedDoc && state.printedDoc.id;
    email.people_id = contact.id;
    dispatch({ type: SET_EMAIL_CREATE, promise: createEmail(email) });
  };
};
export const handleSignableCreate = (event, recipients) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.contacts;
    const { contact } = { ...state };
    const email = state.email ? { ...state.email } : {};
    email.document_id = state.printedDoc && state.printedDoc.id;
    email.contact_id = contact.id;
    const data = {
      document_id: email.document_id,
      contact_id: email.contact_id,
      signatures: recipients
    };
    dispatch({ type: SET_EMAIL_CREATE, promise: createSignableEmail(data) });
  };
};
// export const handleSMSDelete = id => ({ type: SET_SMS_DELETE, promise: deleteSMS({ id }) });
export const getContactDocuments = data => ({ type: SET_DOCUMENTS, promise: fetchDocuments(data) });
export const setCreateDocument = document => ({ type: SET_CREATE_DOCUMENT, payload: document });
export const setDeleteDocument = data => ({ type: SET_DELETE_DOCUMENT, promise: deleteDocument(data) });
export const uploadDocument = (event) => {
  return (dispatch, getState) => {
    const files = Object.keys(event.target.files).map(file => event.target.files[file]);
    dispatch({ type: SET_UPLOAD_PROGRESS, payload: new Array(files.length) });
    const contact = { ...getState().app.contacts.contact };
    const aws = {};
    // eslint-disable-next-line
    event.target.value = '';
    getDocumentSign()
      .then(({ data }) => {
        aws.accessKey = (data && data.access_key) || null;
        aws.policy = (data && data.policy) || null;
        aws.signature = (data && data.signature) || null;
        if (aws.accessKey && aws.policy && aws.signature) {
          files.forEach((file, index) => {
            const newFile = {
              filename: file.name,
              filesize: file.size,
              people_id: contact.id,
            };

            const uploadAmazon = (fileInfo) => {
              return new Promise((resolve, reject) => {
                const doc = new FormData();
                doc.append('key', fileInfo.filename);
                doc.append('acl', 'private');
                doc.append('Content-Type', 'binary/octet-stream');
                doc.append('AWSAccessKeyId', aws.accessKey);
                doc.append('Policy', aws.policy);
                doc.append('Signature', aws.signature);
                doc.append('file', file);
                doc.append('filesize', file.size);

                const request = superagent();
                try {
                  request
                    .post(URL_AWS_DOCUMENTS)
                    .send(doc)
                    .on('progress', (e) => {
                      const total = [...getState().app.contacts.uploadDocumentProgress] || [];
                      total[fileInfo.index] = e.percent;
                      dispatch({ type: SET_UPLOAD_PROGRESS, payload: total });
                    })
                    .end((err, res) => {
                      const total = [...getState().app.contacts.uploadDocumentProgress] || [];
                      total[fileInfo.index] = 100;
                      dispatch({ type: SET_UPLOAD_PROGRESS, payload: total });
                      if (err) {
                        reject(err);
                      }
                      if (res) {
                        resolve(fileInfo);
                      }
                    });
                } catch (ex) {
                  reject(ex);
                }
              });
            };

            const uploadDocuments = new Promise((resolve, reject) => {
              const currentFile = index;
              createDocuments(newFile)
                .then((response) => {
                  const result = response;
                  result.index = currentFile;
                  resolve(result);
                })
                .catch(error => reject(error));
            });

            uploadDocuments
              .then((response) => {
                uploadAmazon(response)
                  .then((resFile) => {
                    dispatch({ type: SET_CREATE_DOCUMENT, payload: resFile.data });
                  })
                  .catch(err => console.log(err));
              }, error => console.log(error))
              .then(() => { }, error => console.log(error));
          });
        }
      })
      .catch(error => console.log(error));
  };
};
export const setLocations = () => ({ type: SET_LOCATIONS, promise: fetchLocations() });
export const setContactLocations = data => ({ type: SET_CONTACT_LOCATIONS, promise: fetchContactLocations(data) });
export const setContactLocationsLocal = (event) => {
  const id = parseInt(event.target.name, 10);
  return (dispatch, getState) => {
    const state = getState().app.contacts;
    const location = [...state.contactLocations].filter(item => item.id === id)[0];
    const contactLocations = [...state.contactLocations].filter(item => item.id !== id);
    if (!location) {
      contactLocations.push({ id });
    }
    dispatch({ type: SET_CONTACT_LOCATIONS, payload: contactLocations });
  };
};
export const setUpdateLocations = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.contacts;
    const locations = [...state.contactLocations].map(item => item.id).join(',');
    const data = {
      locations,
      id: state.contact.id,
    };
    dispatch({ type: SET_LOCATIONS_UPDATE, promise: saveLocations(data) });
  };
};
export const setAppointments = id => ({ type: SET_APPOINTMENTS, promise: fetchContactAppointments(id) });
export const setActivity = id => ({ type: SET_ACTIVITY, promise: fetchContactActivity(id) });
export const setLoading = loading => ({ type: SET_LOADING, payload: loading });
export const clearContact = () => ({ type: SET_CLEAR_CONTACT });
// export const handlePropertyChange = data => ({ type: PROPERTY_AUTOCOMPLETE, promise: propertyAutocomplete(data) });
// export const handlePropertySelect = properties => ({ type: SET_CONTACT_PROPERTIES, payload: properties });

export const uploadCSV = (file, id) => {
  return (dispatch) => {
    const aws = {};
    signImport()
      .then(({ data }) => {
        aws.accessKey = (data && data.access_key) || null;
        aws.policy = (data && data.policy) || null;
        aws.signature = (data && data.signature) || null;
        if (aws.accessKey && aws.policy && aws.signature) {
          const uploadAmazon = () => {
            return new Promise((resolve, reject) => {
              const doc = new FormData();
              const filename = `${id}.${file.name.split('.').pop()}`;
              // const filename = `${id}_${file.name}`;
              console.log(filename);
              doc.append('key', filename);
              doc.append('acl', 'private');
              doc.append('Content-Type', 'binary/octet-stream');
              doc.append('AWSAccessKeyId', aws.accessKey);
              doc.append('Policy', aws.policy);
              doc.append('Signature', aws.signature);
              doc.append('file', file);
              doc.append('filesize', file.size);

              const request = superagent();
              try {
                request
                  .post(URL_AWS_IMPORT)
                  .send(doc)
                  .end((err, res) => {
                    if (err) {
                      reject(err);
                    }
                    if (res) {
                      resolve(res);
                    }
                  });
              } catch (ex) {
                reject(ex);
              }
            });
          };

          uploadAmazon().then((res) => {
            console.log(res);
            dispatch({ type: SET_IMPORT, promise: importContacts({ id }) });
          }).catch(error => dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Import error', error) } }));
        }
      })
      .catch(error => dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Import error', error) } }));
  };
};
export const handleImportChange = event => (dispatch, getState) => {
  const importValues = { ...getState().app.contacts.importValues };
  console.log(event.target.type);
  if (event.target.type === 'file') {
    importValues.file = event.target.files[0];
  } else {
    importValues[event.target.name] = event.target.value;
  }
  dispatch({ type: SET_IMPORT, payload: importValues });
};
export const handleImportSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const importValues = { ...getState().app.contacts.importValues };
  const file = importValues.file;
  if (file) {
    importValues.filename = file.name;
    // dispatch({ type: SET_IMPORT, promise: importContacts(importValues) });
    dispatch({ type: SET_LOADING, payload: { import: true } });
    importCreate(importValues)
      .then(({ data }) => {
        dispatch({ type: SET_IMPORT_CREATE, payload: data });
        dispatch(uploadCSV(file, data.id));
      })
      .catch((err) => {
        console.log(err);
        const error = {
          message: Object.keys(err.errors).map(key => err.errors[key]).join('\r\n'),
        };
        console.log(error);
        dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Import error', error.message) } });
      });
  } else {
    dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Import', 'Please select file') } });
  }
};
export const toggleSearch = () => ({ type: SET_CONTACT_SEARCH_PANEL });
export const fillAddress = data => ({ type: SET_CONTACT_ADDRESS, payload: data });
export const handleAttachmentRemove = () => ({ type: SET_PRINTED_DOCUMENT });
export const handleTemplateChange = template => (dispatch, getState) => {
  const state = { ...getState().app.contacts };
  const email = state.email ? { ...state.email } : {};
  email.subject = template.subject;
  email.message = template.message;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const handleMessageChange = message => (dispatch, getState) => {
  const state = { ...getState().app.contacts };
  const email = state.email ? { ...state.email } : {};
  email.message = message;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const starContact = id => ({ type: SET_STAR_CONTACT, promise: star(id) });
export const unstarContact = id => ({ type: SET_STAR_CONTACT, promise: unstar(id) });
export const getUsers = () => ({ type: SET_USERS, promise: fetchUsers() });
export const handleSearchReset = () => (dispatch) => {
  dispatch({ type: SET_CONTACTS_SEARCH });
  dispatch(fetchContacts());
};
export const setDocument = doc => (dispatch, getState) => {
  const state = { ...getState().app.contacts };
  dispatch({ type: SET_PRINTED_DOCUMENT, payload: doc });
  dispatch({ type: SET_EMAILS, promise: fetchEmails({ contact_id: state.contact.id }) });
};
export const getMailchimpList = () => ({ type: SET_MAILCHIMP_LIST, promise: mailchimpFetch() });
export const sendToChimp = id => (dispatch, getState) => {
  const searchValues = { ...getState().app.contacts.searchValues };
  dispatch({ type: SET_MAILCHIMP, promise: send2mailchimp({ list_id: id.id, ...searchValues }) });
};
