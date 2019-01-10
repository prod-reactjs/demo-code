import moment from 'moment';
import { EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { browserHistory } from 'react-router';
import superagent from 'superagent-defaults';
import { toastr } from 'react-redux-toastr';
import { downloadFile, momentFormats } from 'common/utils';
import juvo from 'juvo';
import { createContact, createEmail, createSignableEmail } from '../contacts/requests';
import { propertyQuickCreate } from '../properties/requests';
import { SET_STATIC_DATA, SET_USER_DATA } from '../../common';

import {
  URL_AWS_DOCUMENTS,
  fetch,
  offerInfo,
  offerCreate,
  offerUpdate,
  offerDelete,
  peopleAutocomplete,
  propertyAutocomplete,
  getOfferNotes,
  getNotesCategory,
  createNote,
  deleteNote,
  printTemplate,
  getDocumentSign,
  createDocuments,
  downloadDocument,
  deleteDocument,
  fetchEmails,
} from './requests';

const SET_OFFERS = 'juvo/app/offers/SET_OFFERS';
const SET_OFFER = 'juvo/app/offers/SET_OFFER';
const SET_OFFER_UPDATE = 'juvo/app/offers/SET_OFFER_UPDATE';
const SET_OFFER_DELETE = 'juvo/app/offers/SET_OFFER_DELETE';
const SET_PEOPLE_AUTOCOMPLETE = 'juvo/app/offers/SET_PEOPLE_AUTOCOMPLETE';
const SET_OFFER_PEOPLE = 'juvo/app/offers/SET_OFFER_PEOPLE';
const SET_APPLICANT_AUTOCOMPLETE = 'juvo/app/offers/SET_APPLICANT_AUTOCOMPLETE';
const SET_OFFER_APPLICANT = 'juvo/app/offers/SET_OFFER_APPLICANT';
const SET_VENDOR_AUTOCOMPLETE = 'juvo/app/offers/SET_VENDOR_AUTOCOMPLETE';
const SET_OFFER_VENDOR = 'juvo/app/offers/SET_OFFER_VENDOR';
const SET_PROPERTY_AUTOCOMPLETE = 'juvo/app/offers/SET_PROPERTY_AUTOCOMPLETE';
const SET_OFFER_PROPERTY = 'juvo/app/offers/SET_OFFER_PROPERTY';
const SET_OFFER_COMMENT = 'juvo/app/offers/SET_OFFER_COMMENT';
const SET_ERROR = 'juvo/app/offers/SET_ERROR';
const SET_CLEAR_ERROR = 'juvo/app/offers/SET_CLEAR_ERROR';
const SET_HIDE_MODAL = 'juvo/app/offers/SET_HIDE_MODAL';
const SET_NOTES = 'juvo/app/offers/SET_NOTES';
const SET_NOTES_CATEGORY = 'juvo/app/offers/SET_NOTES_CATEGORY';
const SET_NOTE_CREATE = 'juvo/app/offers/SET_NOTE_CREATE';
const SET_NOTE_DELETE = 'juvo/app/offers/SET_NOTE_DELETE';
const SET_PRINT_TEMPLATES = 'juvo/app/offers/SET_PRINT_TEMPLATES';
const SET_LOADING = 'juvo/app/offers/SET_LOADING';
const SET_DOCUMENT_PROGRESS = 'juvo/app/offers/SET_DOCUMENT_PROGRESS';
const SET_CREATE_DOCUMENT = 'juvo/app/offers/SET_CREATE_DOCUMENT';
const SET_OFFER_CLEAR = 'juvo/app/offers/SET_OFFER_CLEAR';
const SET_OFFER_SEARCH_PANEL = 'juvo/app/offers/SET_OFFER_SEARCH_PANEL';
const SET_QUICK_PROPERTY_MODAL = 'juvo/app/offers/SET_QUICK_PROPERTY_MODAL';
const SET_QUICK_CLIENT_MODAL = 'juvo/app/offers/SET_QUICK_CLIENT_MODAL';
const SET_QUICK_APPLICANT_MODAL = 'juvo/app/offers/SET_QUICK_APPLICANT_MODAL';
const SET_QUICK_VENDOR_MODAL = 'juvo/app/offers/SET_QUICK_VENDOR_MODAL';
const SET_QUICK_MODALS_HIDE = 'juvo/app/offers/SET_QUICK_MODALS_HIDE';
const SET_QUICK_CONTACT = 'juvo/app/offers/SET_QUICK_CONTACT';
const SET_QUICK_PROPERTY = 'juvo/app/offers/SET_QUICK_PROPERTY';
const SET_EMAIL = 'juvo/app/offers/SET_EMAIL';
const SET_EMAIL_CREATE = 'juvo/app/offers/SET_EMAIL_CREATE';
const SET_PRINTED_DOCUMENT = 'juvo/app/offers/SET_PRINTED_DOCUMENT';
const SET_EMAILS = 'juvo/app/offers/SET_EMAILS';
const SET_OFFERS_SEARCH = 'juvo/app/offers/SET_OFFERS_SEARCH';
const SET_SIGNABLES = 'juvo/app/offers/SET_SIGNABLES';
const SET_SIGNABLE_RECIPIENTS = 'juvo/app/offers/SET_SIGNABLE_RECIPIENTS';
const SET_RECIPIENTS_AUTOCOMPLETE = 'juvo/app/offers/SET_RECIPIENTS_AUTOCOMPLETE';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_STATIC_DATA}${SUCCESS}`: {
      const {
        t_offer: printTemplates,
      } = action.res;
      return {
        ...state,
        printTemplates,
      };
    }
    case `${SET_USER_DATA}${SUCCESS}`: {
      const { diary_day_start, date_format, date_display_format, currency_symbol } = action.res.data;
      const currency = String.fromCharCode(currency_symbol.replace('#', '').replace(';', ''));
      const dateFormat = momentFormats[date_format];
      const dateDisplayFormat = momentFormats[date_display_format];
      return {
        ...state,
        user: {
          diaryStart: diary_day_start,
          dateFormat,
          dateDisplayFormat,
          currency,
        }
      };
    }
    case `${SET_OFFERS}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, list: true } : { list: true } };
    }
    case `${SET_OFFERS}${FAILURE}`: {
      return {
        ...state,
        loading: state.loading ? { ...state.loading, list: false } : { list: false },
        error: { ...action.err, callback: () => toastr.error('Error', action.err.message) }
      };
    }
    case `${SET_OFFERS}${SUCCESS}`: {
      const { data: offers, ...pagination } = action.res;
      return { ...state, offers, pagination, loading: state.loading ? { ...state.loading, list: false } : { list: false } };
    }
    case SET_OFFER: {
      return { ...state, offer: action.payload, comment: state.comment || EditorState.createEmpty() };
    }
    case `${SET_OFFER}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, general: true } : { general: true } };
    }
    case `${SET_OFFER}${FAILURE}`: {
      const error = {
        callback: () => toastr.error('Error', action.error.message),
        errors: action.error.errors,
      };
      return { ...state, error, loading: state.loading ? { ...state.loading, general: false } : { general: false } };
    }
    case `${SET_OFFER}${SUCCESS}`: {
      const offer = { ...action.res.data.offer };
      const comment = offer.comment ? EditorState.createWithContent(stateFromHTML(offer.comment)) : EditorState.createEmpty();
      // console.log(offer);
      const documents = [...action.res.data.offer.documents];
      const activity = { ...action.res.data.offer.activity };
      delete offer.documents;
      delete offer.activity;
      return {
        ...state,
        offer,
        documents,
        activity,
        comment,
        loading: state.loading ? { ...state.loading, general: false } : { general: false },
        uploadDocumentProgress: 0
      };
    }
    case `${SET_OFFER_UPDATE}${REQUEST}`: {
      return { ...state, loading: { general: true } };
    }
    case `${SET_OFFER_UPDATE}${SUCCESS}`: {
      const offer = action.res.data.offer;
      const comment = offer.comment ? EditorState.createWithContent(stateFromHTML(offer.comment)) : EditorState.createEmpty();
      return { ...state, offer, comment, error: { callback: () => toastr.success('Offer', 'Updated') }, loading: {} };
    }
    case `${SET_PEOPLE_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, peoples: action.res.data };
    }
    case SET_OFFER_PEOPLE: {
      const offer = { ...state.offer };
      offer.applicant = action.payload[0];
      offer.people_id = action.payload[0] && action.payload[0].id;
      return { ...state, offer, peoples: [] };
    }
    case `${SET_APPLICANT_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, applicants: action.res.data };
    }
    case SET_OFFER_APPLICANT: {
      const offer = { ...state.offer };
      offer.applicant_solicitor = action.payload[0];
      offer.applicant_solicitor_id = action.payload[0] && action.payload[0].id;
      return { ...state, offer, applicants: [] };
    }
    case `${SET_VENDOR_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, vendors: action.res.data };
    }
    case SET_OFFER_VENDOR: {
      const offer = { ...state.offer };
      offer.vendor_solicitor = action.payload[0];
      offer.vendor_solicitor_id = action.payload[0] && action.payload[0].id;
      return { ...state, offer, vendors: [] };
    }
    case `${SET_PROPERTY_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, properties: action.res.data };
    }
    case SET_OFFER_PROPERTY: {
      const offer = { ...state.offer };
      offer.property_id = action.payload[0] && action.payload[0].id;
      return { ...state, offer, properties: [] };
    }
    case SET_OFFER_COMMENT: {
      return { ...state, comment: action.payload };
    }
    case SET_CLEAR_ERROR: {
      const error = state.error ? { ...state.error } : {};
      delete error.callback;
      return { ...state, error };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload || {} };
    }
    case SET_PRINT_TEMPLATES: {
      return { ...state, printValues: action.payload };
    }
    case SET_HIDE_MODAL: {
      return { ...state, modal: '' };
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
      const notes = [...state.notes];
      notes.push(action.res.data);
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
      return { ...state, notes, error: { callback: () => toastr.info('Note', 'Note deleted!') } };
    }
    case SET_LOADING: {
      const loading = action.payload;
      return { ...state, loading };
    }
    case SET_DOCUMENT_PROGRESS: {
      return { ...state, uploadDocumentProgress: action.payload };
    }
    case SET_CREATE_DOCUMENT: {
      return {
        ...state,
        documents: [action.payload].concat([...state.documents].filter(doc => doc.id !== action.payload.id)),
        propertyLoading: {}
      };
    }
    case `${SET_OFFER_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const offers = [...state.offers].filter(offer => offer.id !== id);
      return { ...state, offers, error: { callback: () => toastr.info('Deleted', 'Offer deleted!') } };
    }
    case SET_OFFER_CLEAR: {
      return { ...state, offer: {}, modal: false, loading: {}, error: null, comment: EditorState.createEmpty() };
    }
    case SET_OFFER_SEARCH_PANEL: {
      return { ...state, searchPanel: !state.searchPanel };
    }
    case SET_QUICK_APPLICANT_MODAL: {
      return { ...state, newApplicant: !state.newApplicant };
    }
    case SET_QUICK_PROPERTY_MODAL: {
      return { ...state, newProperty: !state.newProperty };
    }
    case SET_QUICK_CLIENT_MODAL: {
      return { ...state, newClient: !state.newClient };
    }
    case SET_QUICK_VENDOR_MODAL: {
      return { ...state, newVendor: !state.newVendor };
    }
    case SET_QUICK_MODALS_HIDE: {
      return {
        ...state,
        newApplicant: false,
        newClient: false,
        newVendor: false,
        error: {},
        loading: state.loading ? {
          ...state.loading, quickProperty: false, quickContact: false,
        } : { quickProperty: false, quickContact: false }
      };
    }
    case `${SET_QUICK_PROPERTY}${REQUEST}`: {
      return {
        ...state,
        loading: state.loading ? {...state.loading, quickProperty: true} : { quickProperty: true }
      };
    }
    case `${SET_QUICK_PROPERTY}${FAILURE}`: {
      return {
        ...state,
        error: { callback: () => toastr.error('Create Error', action.error.message), errors: action.error.errors },
        loading: state.loading ? {...state.loading, quickProperty: false} : { quickProperty: false }
      };
    }
    case `${SET_QUICK_PROPERTY}${SUCCESS}`: {
      const offer = { ...state.offer };
      const property = action.res.data.property;
      property.address = property.address_1;
      offer.property = property;
      offer.property_id = property.id;
      return {
        ...state,
        offer,
        newProperty: false,
        loading: state.loading ? {...state.loading, quickProperty: false} : { quickProperty: false }
      };
    }
    case `${SET_QUICK_CONTACT}${REQUEST}`: {
      return {
        ...state,
        loading: state.loading ? {...state.loading, quickContact: true} : { quickContact: true }
      };
    }
    case `${SET_QUICK_CONTACT}${FAILURE}`: {
      return {
        ...state,
        error: { callback: () => toastr.error('Create Error', action.error.message), errors: action.error.errors },
        loading: state.loading ? {...state.loading, quickContact: false} : { quickContact: false }
      };
    }
    case `${SET_QUICK_CONTACT}${SUCCESS}`: {
      const offer = { ...state.offer };
      const contact = action.res.data.contact;
      if (state.newClient) {
        offer.contact = contact;
        offer.people_id = contact.id;
      } else if (state.newApplicant) {
        offer.applicant = contact;
        offer.applicant_solicitor_id = contact.id;
      } else if (state.newVendor) {
        offer.vendor = contact;
        offer.vendor_solicitor_id = contact.id;
      }
      return {
        ...state,
        offer,
        newClient: false,
        newApplicant: false,
        newVendor: false,
        loading: state.loading ? {...state.loading, quickContact: false} : { quickContact: false }
      };
    }
    case `${SET_EMAILS}${REQUEST}`: {
      return { ...state, modal: 'emails' };
    }
    case `${SET_EMAILS}${SUCCESS}`: {
      const emails = action.res.data;
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
      const emails = [action.res.data].concat([...state.emails]);
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
    case SET_PRINTED_DOCUMENT: {
      return { ...state, loading: {}, printedDoc: action.payload };
    }
    case SET_OFFERS_SEARCH: {
      return { ...state, searchValues: action.payload };
    }
    default: return state;
  }
};

export const getOffers = () => ({ type: SET_OFFERS, promise: fetch() });
export const getOfferInfo = id => ({ type: SET_OFFER, promise: offerInfo(id) });
export const deleteOffer = id => ({ type: SET_OFFER_DELETE, promise: offerDelete(id) });
export const mainFormChange = event => (dispatch, getState) => {
  const offer = { ...getState().app.offers.offer } || {};
  offer[event.target.name] = event.target.value;
  dispatch({ type: SET_OFFER, payload: offer });
};
export const mainFormSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.offers };
  const offer = { ...state.offer };
  const comment = state.comment;
  const raw = comment && comment.getCurrentContent();
  if (raw) {
    offer.comment = stateToHTML(raw);
  }
  if (offer.id) {
    offer.people_id = offer.people_id || (offer.contact && offer.contact.id);
    offer.property_id = offer.property_id || (offer.property && offer.property.id);
    console.log(offer);
    dispatch({ type: SET_OFFER_UPDATE, promise: offerUpdate(offer) });
  } else {
    offerCreate(offer)
      .then(({ id }) => {
        dispatch({ type: SET_ERROR, payload: {} });
        browserHistory.push(juvo.offers.infoLink(id));
      })
      .catch((err) => {
        const { errors } = err;
        dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Error', err.message), errors } });
      });
    // dispatch({ type: SET_OFFER, promise: offerCreate(offer) });
  }
};
export const handleClientChange = data => ({ type: SET_PEOPLE_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const handleClientSelect = id => ({ type: SET_OFFER_PEOPLE, payload: id });
export const handleApplicantChange = data => ({ type: SET_APPLICANT_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const handleApplicantSelect = id => ({ type: SET_OFFER_APPLICANT, payload: id });
export const handleVendorChange = data => ({ type: SET_VENDOR_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const handleVendorSelect = id => ({ type: SET_OFFER_VENDOR, payload: id });
export const handlePropertyChange = data => ({ type: SET_PROPERTY_AUTOCOMPLETE, promise: propertyAutocomplete(data) });
export const handlePropertySelect = id => ({ type: SET_OFFER_PROPERTY, payload: id });
export const mainFormDateChange = (event) => {
  return (dispatch, getState) => {
    const offer = { ...getState().app.offers.offer };
    const date = moment(Date.parse(event));
    offer.chase_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_OFFER, payload: offer });
  };
};
export const changeComment = editorState => ({ type: SET_OFFER_COMMENT, payload: editorState });
export const toggleBlockType = (blockType) => {
  return (dispatch, getState) => {
    const comment = getState().app.offers.comment;
    dispatch(changeComment(RichUtils.toggleBlockType(comment, blockType)));
  };
};
export const toggleInlineStyle = (inlineStyle) => {
  return (dispatch, getState) => {
    const comment = getState().app.offers.comment;
    dispatch(changeComment(RichUtils.toggleInlineStyle(comment, inlineStyle)));
  };
};
export const clearError = () => ({ type: SET_CLEAR_ERROR });
export const loadOfferNotes = (id) => {
  return (dispatch) => {
    dispatch({ type: SET_NOTES, promise: getOfferNotes({ offer_id: id }) });
    dispatch({ type: SET_NOTES_CATEGORY, promise: getNotesCategory() });
  };
};
export const handlePrintChange = (event) => {
  return (dispatch, getState) => {
    const printValues = { ...getState().app.offers.printValues } || {};
    if (event.target.type === 'checkbox') {
      printValues[event.target.name] = event.target.checked;
    } else {
      printValues[event.target.name] = event.target.value;
    }
    dispatch({ type: SET_PRINT_TEMPLATES, payload: printValues });
  };
};
export const handleModalClose = () => ({ type: SET_HIDE_MODAL });
export const handleNoteCreate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.offers };
    const { offer, noteCategories } = state;
    const note = state.note ? { ...state.note } : {};
    note.offer_id = offer.id;
    note.category_id = note.category_id || noteCategories[0].id;
    dispatch({ type: SET_NOTE_CREATE, promise: createNote(note) });
  };
};
export const handleNoteChange = (event) => {
  return (dispatch, getState) => {
    const note = { ...getState().app.offers.note };
    note[event.target.name] = event.target.value;
    dispatch({ type: SET_NOTE_CREATE, payload: note });
  };
};
export const handleNoteDelete = id => ({ type: SET_NOTE_DELETE, promise: deleteNote({ id }) });
export const handlePrintSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  dispatch({ type: SET_LOADING, payload: { print: true } });
  const state = { ...getState().app.offers };
  const printValues = { ...state.printValues } || {};
  printValues.template_id = printValues.template_id || state.printTemplates[0].id;
  printValues.id = state.offer.id;
  dispatch({ type: SET_ERROR, payload: { callback: () => toastr.info('Printing', 'Generating Print Template') } });
  printTemplate(printValues)
    .then((response) => {
      dispatch({ type: SET_PRINTED_DOCUMENT, payload: response.doc });
      const url = response.url;
      if (printValues.sendEmail) {
        dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc });
        dispatch({ type: SET_EMAILS, promise: fetchEmails({ offer_id: state.offer.id }) });
      } else if (printValues.sendSignable) {
        dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc });
        dispatch({ type: SET_SIGNABLES, promise: fetchEmails({ offer_id: state.offer.id }) });
      } else {
        dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc });
        downloadFile(url, response.doc.filename);
      }
    }).catch((error) => {
      const { errors } = error;
      dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Error', error.message), errors } });
      dispatch({ type: SET_LOADING, payload: {} });
    });
};
export const handleDocumentUpload = (event) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_DOCUMENT_PROGRESS, payload: 0 });
    const files = Object.keys(event.target.files).map(file => event.target.files[file]);
    const uploadProggress = [];
    let total = 0;
    const timer = window.setInterval(() => {
      total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
      if (total === 100) {
        window.clearInterval(timer);
      }
      dispatch({ type: SET_DOCUMENT_PROGRESS, payload: total });
    }, 500);
    const aws = {};
    // eslint-disable-next-line
    event.target.value = '';
    const state = { ...getState().app.offers };
    getDocumentSign()
      .then(({ data }) => {
        aws.accessKey = (data && data.access_key) || null;
        aws.policy = (data && data.policy) || null;
        aws.signature = (data && data.signature) || null;
        if (aws.accessKey && aws.policy && aws.signature) {
          files.forEach((file, index) => {
            const fileToUpload = {
              filename: file.name,
              filesize: file.size,
              offer_id: state.offer.id,
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
                      uploadProggress[fileInfo.index] = e.percent;
                      // const total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
                      // dispatch({ type: SET_DOCUMENT_PROGRESS, payload: total });
                    })
                    .end((err, res) => {
                      uploadProggress[fileInfo.index] = 100;
                      // const total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
                      // dispatch({ type: SET_IMAGE_PROGRESS, payload: total });
                      if (err) {
                        reject(err);
                      }
                      if (res) {
                        const result = { ...res };
                        result.data = fileInfo.data;
                        resolve(result);
                      }
                    });
                } catch (ex) {
                  window.clearInterval(timer);
                  reject(ex);
                }
              });
            };

            const uploadDocuments = new Promise((resolve, reject) => {
              const currentFile = index;
              createDocuments(fileToUpload)
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
                  });
              }, error => console.log(error))
              .then(() => { }, error => console.log(error));
          });
        }
      })
      .catch(error => console.log(error));
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
export const handleDocumentDelete = id => ({ type: SET_OFFER_DELETE, promise: deleteDocument(id) });
export const clearOfferInfo = () => ({ type: SET_OFFER_CLEAR });
export const toggleSearch = () => ({ type: SET_OFFER_SEARCH_PANEL });
export const addNewProperty = event => (dispatch) => {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  dispatch({ type: SET_QUICK_PROPERTY_MODAL });
};
export const addNewClient = event => (dispatch) => {
  event.preventDefault();
  dispatch({ type: SET_QUICK_CLIENT_MODAL });
};
export const addNewApplicant = event => (dispatch) => {
  event.preventDefault();
  dispatch({ type: SET_QUICK_APPLICANT_MODAL });
};
export const addNewVendor = event => (dispatch) => {
  event.preventDefault();
  dispatch({ type: SET_QUICK_VENDOR_MODAL });
};
export const hideQuickModal = () => ({ type: SET_QUICK_MODALS_HIDE });
export const quickCreateContact = contact => ({ type: SET_QUICK_CONTACT, promise: createContact(contact) });
export const quickCreateProperty = property => ({ type: SET_QUICK_PROPERTY, promise: propertyQuickCreate(property) });
export const handleEmailChange = event => (dispatch, getState) => {
  const email = { ...getState().app.offers.email };
  email[event.target.name] = event.target.value;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const handleRecipientChange = data => ({ type: SET_RECIPIENTS_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const handleRecipientSelect = id => ({ type: SET_SIGNABLE_RECIPIENTS, payload: id });
export const handleEmailCreate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.offers;
    const { offer } = { ...state };
    const email = state.email ? { ...state.email } : {};
    email.document_id = state.printedDoc && state.printedDoc.id;
    email.offer_id = offer.id;
    dispatch({ type: SET_EMAIL_CREATE, promise: createEmail(email) });
  };
};
export const handleSignableCreate = (event, recipients) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.offers;
    const { offer } = { ...state };
    const email = state.email ? { ...state.email } : {};
    email.document_id = state.printedDoc && state.printedDoc.id;
    email.offer_id = offer.id;
    const data = {
      document_id: email.document_id,
      offer_id: email.offer_id,
      signatures: recipients
    };
    dispatch({ type: SET_EMAIL_CREATE, promise: createSignableEmail(data) });
  };
};
export const handleAttachmentRemove = () => ({ type: SET_PRINTED_DOCUMENT });
export const handleTemplateChange = template => (dispatch, getState) => {
  const state = { ...getState().app.offers };
  const email = state.email ? { ...state.email } : {};
  email.subject = template.subject;
  email.message = template.message;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const handleMessageChange = message => (dispatch, getState) => {
  const state = { ...getState().app.offers };
  const email = state.email ? { ...state.email } : {};
  email.message = message;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const fetchOffers = (page = 1) => {
  return (dispatch, getState) => {
    const searchValues = { ...getState().app.offers.searchValues } || {};
    searchValues.page = page;
    dispatch({ type: SET_OFFERS, promise: fetch(searchValues) });
  };
};
export const handleSearchReset = () => (dispatch) => {
  dispatch({ type: SET_OFFERS_SEARCH });
  dispatch(fetchOffers());
};
export const handleSearchChange = (event) => {
  return (dispatch, getState) => {
    const searchValues = { ...getState().app.offers.searchValues } || {};
    searchValues[event.target.name] = event.target.value;
    dispatch({ type: SET_OFFERS_SEARCH, payload: searchValues });
  };
};
export const handleSearchSubmit = (event) => {
  event.preventDefault();
  return dispatch => dispatch(fetchOffers());
};
export const setDocument = doc => (dispatch, getState) => {
  const state = { ...getState().app.offers };
  dispatch({ type: SET_PRINTED_DOCUMENT, payload: doc });
  dispatch({ type: SET_EMAILS, promise: fetchEmails({ offer_id: state.offer.id }) });
};
