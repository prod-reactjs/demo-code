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

import { SET_STATIC_DATA, SET_USER_DATA } from '../../common';

import {
  URL_AWS_DOCUMENTS,
  fetch,
  tenancyInfo,
  tenancyCreate,
  tenancyUpdate,
  tenancyDelete,
  peopleAutocomplete,
  propertyAutocomplete,
  getTenancyNotes,
  getNotesCategory,
  createNote,
  deleteNote,
  printTemplate,
  getDocumentSign,
  createDocuments,
  downloadDocument,
  deleteDocument,
  fetchTenancyJobs,
  tenancyJobInfo,
  tenancyJobCreate,
  tenancyJobUpdate,
  tenancyJobDelete,
  fetchDisbursments,
  disbursementInfo,
  disbursementCreate,
  disbursementUpdate,
  disbursementDelete,
  fetchTenancyRents,
  fetchTenancyPaymentsNext,
  tenancyRentGenerate,
  tenancyRentInfo,
  tenancyRentCreate,
  tenancyRentUpdate,
  tenancyRentDelete,
  fetchTenancyPayments,
  tenancyPaymentCreate,
  tenancyPaymentUpdate,
  tenancyPaymentInfo,
  tenancyPaymentDelete,
  tenancyRentConfirm,
  tenancyRentUnconfirm,
  fetchTenancyAccounts,
  tenancyAccountOverview,
  tenancyAccountInfo,
  tenancyAccountCreate,
  tenancyAccountUpdate,
  tenancyAccountDelete,
  fetchTenancyStatements,
  tenancyStatementFile,
  tenancyStatementInfo,
  tenancyStatementCreate,
  tenancyStatementTemplate,
  tenancyStatementDelete,
  fetchTenancyLandlord,
  tenancyLandlordInfo,
  tenancyLandlordCreate,
  tenancyLandlordUpdate,
  tenancyLandlordDelete,
  propertyQuickCreate,
  fetchTenancyLandlordDue,
  fetchTenancyClient,
  fetchTenancyAllJobs,
  exportManagementFee,
  exportVat,
  fetchTenancyClientOverview,
  fetchEmails,
} from './requests';

const SET_TENANCIES = 'juvo/app/tenancies/SET_TENANCIES';
const SET_TENANCY = 'juvo/app/tenancies/SET_TENANCY';
const SET_TENANCY_UPDATE = 'juvo/app/tenancies/SET_TENANCY_UPDATE';
const SET_TENANCY_DELETE = 'juvo/app/tenancies/SET_TENANCY_DELETE';
const SET_PEOPLE_AUTOCOMPLETE = 'juvo/app/tenancies/SET_PEOPLE_AUTOCOMPLETE';
const SET_RECIPIENTS_AUTOCOMPLETE = 'juvo/app/tenancies/SET_RECIPIENTS_AUTOCOMPLETE';
const SET_SIGNABLE_RECIPIENTS = 'juvo/app/tenancies/SET_SIGNABLE_RECIPIENTS';
const SET_TENANCY_PEOPLE = 'juvo/app/tenancies/SET_TENANCY_PEOPLE';
const SET_PROPERTY_AUTOCOMPLETE = 'juvo/app/tenancies/SET_PROPERTY_AUTOCOMPLETE';
const SET_TENANCY_PROPERTY = 'juvo/app/tenancies/SET_TENANCY_PROPERTY';
const SET_TENANCY_COMMENT = 'juvo/app/tenancies/SET_TENANCY_COMMENT';
const SET_ERROR = 'juvo/app/tenancies/SET_ERROR';
const SET_CLEAR_ERROR = 'juvo/app/tenancies/SET_CLEAR_ERROR';
const SET_HIDE_MODAL = 'juvo/app/tenancies/SET_HIDE_MODAL';
const SET_NOTES = 'juvo/app/tenancies/SET_NOTES';
const SET_NOTES_CATEGORY = 'juvo/app/tenancies/SET_NOTES_CATEGORY';
const SET_NOTE_CREATE = 'juvo/app/tenancies/SET_NOTE_CREATE';
const SET_NOTE_DELETE = 'juvo/app/tenancies/SET_NOTE_DELETE';
const SET_PRINT_TEMPLATES = 'juvo/app/tenancies/SET_PRINT_TEMPLATES';
const SET_LOADING = 'juvo/app/tenancies/SET_LOADING';
const SET_DOCUMENT_PROGRESS = 'juvo/app/tenancies/SET_DOCUMENT_PROGRESS';
const SET_DELETE_DOCUMENT = 'juvo/app/tenancies/SET_DELETE_DOCUMENT';
const SET_CREATE_DOCUMENT = 'juvo/app/tenancies/SET_CREATE_DOCUMENT';
const SET_TENANCY_CLEAR = 'juvo/app/tenancies/SET_TENANCY_CLEAR';
const SET_TENANCY_JOBS = 'juvo/app/tenancies/SET_TENANCY_JOBS';
const SET_TENANCY_JOB = 'juvo/app/tenancies/SET_TENANCY_JOB';
const SET_NEW_TENANCY_JOB = 'juvo/app/tenancies/SET_NEW_TENANCY_JOB';
const SET_TENANCY_JOB_CREATE = 'juvo/app/tenancies/SET_TENANCY_JOB_CREATE';
const SET_TENANCY_JOB_UPDATE = 'juvo/app/tenancies/SET_TENANCY_JOB_UPDATE';
const SET_TENANCY_JOB_DELETE = 'juvo/app/tenancies/SET_TENANCY_JOB_DELETE';
const SET_TENANCY_JOB_PEOPLE_AUTOCOMPLETE = 'juvo/app/tenancies/SET_TENANCY_JOB_PEOPLE_AUTOCOMPLETE';
const SET_TENANCY_DISBURSMENTS = 'juvo/app/tenancies/SET_TENANCY_DISBURSMENTS';
const SET_TENANCY_DISBURSEMENT = 'juvo/app/tenancies/SET_TENANCY_DISBURSEMENT';
const SET_NEW_TENANCY_DISBURSEMENT = 'juvo/app/tenancies/SET_NEW_TENANCY_DISBURSEMENT';
const SET_TENANCY_DISBURSEMENT_CREATE = 'juvo/app/tenancies/SET_TENANCY_DISBURSEMENT_CREATE';
const SET_TENANCY_DISBURSEMENT_UPDATE = 'juvo/app/tenancies/SET_TENANCY_DISBURSEMENT_UPDATE';
const SET_TENANCY_DISBURSEMENT_DELETE = 'juvo/app/tenancies/SET_TENANCY_DISBURSEMENT_DELETE';
const SET_TENANCY_RENTS = 'juvo/app/tenancies/SET_TENANCY_RENTS';
const SET_TENANCY_RENT = 'juvo/app/tenancies/SET_TENANCY_RENT';
const SET_NEW_TENANCY_RENT = 'juvo/app/tenancies/SET_NEW_TENANCY_RENT';
const SET_TENANCY_GENERATE_RENT = 'juvo/app/tenancies/SET_TENANCY_GENERATE_RENT';
const SET_TENANCY_RENT_CREATE = 'juvo/app/tenancies/SET_TENANCY_RENT_CREATE';
const SET_TENANCY_RENT_UPDATE = 'juvo/app/tenancies/SET_TENANCY_RENT_UPDATE';
const SET_TENANCY_RENT_DELETE = 'juvo/app/tenancies/SET_TENANCY_RENT_DELETE';
const SET_TENANCY_RENT_ID = 'juvo/app/tenancies/SET_TENANCY_RENT_ID';
const SET_TENANCY_PAYMENTS = 'juvo/app/tenancies/SET_TENANCY_PAYMENTS';
const SET_TENANCY_PAYMENT = 'juvo/app/tenancies/SET_TENANCY_PAYMENT';
const SET_TENANCY_PAYMENT_CREATE = 'juvo/app/tenancies/SET_TENANCY_PAYMENT_CREATE';
const SET_TENANCY_PAYMENT_UPDATE = 'juvo/app/tenancies/SET_TENANCY_PAYMENT_UPDATE';
const SET_TENANCY_PAYMENT_DELETE = 'juvo/app/tenancies/SET_TENANCY_PAYMENT_DELETE';
const SET_TENANCY_ACCOUNTS = 'juvo/app/tenancies/SET_TENANCY_ACCOUNTS';
const SET_TENANCY_ACCOUNT_OVERVIEW = 'juvo/app/tenancies/SET_TENANCY_ACCOUNT_OVERVIEW';
const SET_TENANCY_ACCOUNT = 'juvo/app/tenancies/SET_TENANCY_ACCOUNT';
const SET_TENANCY_ACCOUNT_CREATE = 'juvo/app/tenancies/SET_TENANCY_ACCOUNT_CREATE';
const SET_TENANCY_ACCOUNT_UPDATE = 'juvo/app/tenancies/SET_TENANCY_ACCOUNT_UPDATE';
const SET_TENANCY_ACCOUNT_DELETE = 'juvo/app/tenancies/SET_TENANCY_ACCOUNT_DELETE';
const SET_TENANCY_STATEMENTS = 'juvo/app/tenancies/SET_TENANCY_STATEMENTS';
const SET_TENANCY_STATEMENT = 'juvo/app/tenancies/SET_TENANCY_STATEMENT';
const SET_TENANCY_STATEMENT_CREATE = 'juvo/app/tenancies/SET_TENANCY_STATEMENT_CREATE';
const SET_TENANCY_STATEMENT_DELETE = 'juvo/app/tenancies/SET_TENANCY_STATEMENT_DELETE';
const SET_TENANCY_STATEMENT_TEMPLATE = 'juvo/app/tenancies/SET_TENANCY_STATEMENT_TEMPLATE';
const SET_TENANCY_LANDLORDS = 'juvo/app/tenancies/SET_TENANCY_LANDLORDS';
const SET_TENANCY_LANDLORD = 'juvo/app/tenancies/SET_TENANCY_LANDLORD';
const SET_TENANCY_LANDLORD_CREATE = 'juvo/app/tenancies/SET_TENANCY_LANDLORD_CREATE';
const SET_TENANCY_LANDLORD_UPDATE = 'juvo/app/tenancies/SET_TENANCY_LANDLORD_UPDATE';
const SET_TENANCY_LANDLORD_DELETE = 'juvo/app/tenancies/SET_TENANCY_LANDLORD_DELETE';
const SET_SELECTED_RENT = 'juvo/app/tenancies/SET_SELECTED_RENT';
const SET_TENANCY_SEARCH_PANEL = 'juvo/app/tenancies/SET_TENANCY_SEARCH_PANEL';
const SET_NEW_PROPERTY = 'juvo/app/tenancies/SET_NEW_PROPERTY';
const SET_NEW_CONTACT = 'juvo/app/tenancies/SET_NEW_CONTACT';
const SET_QUICK_CONTACT = 'juvo/app/tenancies/SET_QUICK_CONTACT';
const SET_QUICK_PROPERTY = 'juvo/app/tenancies/SET_QUICK_PROPERTY';
const SET_TENANCY_LANDLORDS_DUE = 'juvo/app/tenancies/SET_TENANCY_LANDLORDS_DUE';
const SET_TENANCY_CLIENT_ACCOUNT = 'juvo/app/tenancies/SET_TENANCY_CLIENT_ACCOUNT';
const SET_TENANCY_ALL_JOBS = 'juvo/app/tenancies/SET_TENANCY_ALL_JOBS';
const SET_TENANCY_CLIENT_OVERVIEW = 'juvo/app/tenancies/SET_TENANCY_CLIENT_OVERVIEW';
const SET_EMAIL = 'juvo/app/tenancies/SET_EMAIL';
const SET_EMAIL_CREATE = 'juvo/app/tenancies/SET_EMAIL_CREATE';
const SET_TENANCY_OVERDUE = 'juvo/app/tenancies/SET_TENANCY_OVERDUE';
// const SET_SIGNABLE_CREATE = 'juvo/app/tenancies/SET_SIGNABLE_CREATE';
const SET_PRINTED_DOCUMENT = 'juvo/app/tenancies/SET_PRINTED_DOCUMENT';
const SET_EMAILS = 'juvo/app/tenancies/SET_EMAILS';
const SET_SIGNABLES = 'juvo/app/tenancies/SET_SIGNABLES';
const SET_SIGNABLE = 'juvo/app/tenancies/SET_SIGNABLE';
const SET_TENANCIES_SEARCH = 'juvo/app/tenancies/SET_TENANCIES_SEARCH';
const SET_MODAL = 'juvo/app/tenancies/SET_MODAL';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

let prevPrintCheckbox = null;

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_STATIC_DATA}${SUCCESS}`: {
      const {
        t_tenancy: printTemplates,
      } = action.res;
      return {
        ...state,
        printTemplates,
      };
    }
    case `${SET_USER_DATA}${SUCCESS}`: {
      const { diary_day_start, date_format, date_display_format, currency_symbol } = action.res.data;
      const dateFormat = momentFormats[date_format];
      const dateDisplayFormat = momentFormats[date_display_format];
      const currency = String.fromCharCode(currency_symbol.replace('#', '').replace(';', ''));
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
    case `${SET_TENANCIES}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, list: true } : { list: true } };
    }
    case `${SET_TENANCIES}${FAILURE}`: {
      return {
        ...state,
        loading: state.loading ? { ...state.loading, list: false } : { list: false },
        error: { callback: () => toastr.error('Error', action.err.message) }
      };
    }
    case `${SET_TENANCIES}${SUCCESS}`: {
      const { data: tenancies, ...pagination } = action.res;
      return { ...state, tenancies, pagination, loading: state.loading ? { ...state.loading, list: false } : { list: false } };
    }
    case SET_TENANCY: {
      return { ...state, tenancy: action.payload, comment: state.comment || EditorState.createEmpty() };
    }
    case `${SET_TENANCY}${REQUEST}`: {
      return { ...state, loading: { general: true } };
    }
    case `${SET_TENANCY}${FAILURE}`: {
      const { errors } = action.error;
      const error = {
        callback: () => toastr.error('Error', action.error.message),
        errors,
      };
      return { ...state, error };
    }
    case `${SET_TENANCY}${SUCCESS}`: {
      const tenancy = { ...action.res.data.tenancy };
      const comment = tenancy.comment ? EditorState.createWithContent(stateFromHTML(tenancy.comment)) : EditorState.createEmpty();
      // console.log(offer);
      const documents = [...action.res.data.tenancy.documents];
      const activity = { ...action.res.data.tenancy.activity };
      const disbursments = { ...action.res.data.tenancy.disbursement };
      const tenancyJobs = { ...action.res.data.tenancy.job };
      const tenancyRents = { ...action.res.data.tenancy.rent };
      const tenancyStatements = { ...action.res.data.tenancy.statement };
      const tenancyStatementTemplates = [...action.res.data.tenancy.statement_template];
      const tenancyAccount = { ...action.res.data.tenancy.account.data };
      delete tenancy.documents;
      delete tenancy.activity;
      delete tenancy.disbursement;
      delete tenancy.job;
      delete tenancy.rent;
      delete tenancy.statement;
      delete tenancy.account;
      return {
        ...state,
        tenancy,
        documents,
        activity,
        comment,
        loading: {},
        uploadDocumentProgress: 0,
        disbursments,
        tenancyJobs,
        tenancyRents,
        tenancyStatements,
        tenancyAccountOverview: tenancyAccount,
        tenancyStatementTemplates,
      };
    }
    case `${SET_TENANCY_UPDATE}${REQUEST}`: {
      return { ...state, loading: { general: true } };
    }
    case `${SET_TENANCY_UPDATE}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_TENANCY_UPDATE}${SUCCESS}`: {
      const tenancy = action.res.data.tenancy;
      const comment = tenancy.comment ? EditorState.createWithContent(stateFromHTML(tenancy.comment)) : EditorState.createEmpty();
      return { ...state, tenancy, comment, error: { callback: () => toastr.success('Tenancy', 'Updated') }, loading: {} };
    }
    case `${SET_PEOPLE_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, peoples: action.res.data };
    }
    case `${SET_RECIPIENTS_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, recipients: action.res.data };
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
    case SET_TENANCY_PEOPLE: {
      const tenancy = { ...state.tenancy };
      tenancy.tenant = action.payload;
      return { ...state, tenancy, peoples: [] };
    }
    case `${SET_PROPERTY_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, properties: action.res.data };
    }
    case SET_TENANCY_PROPERTY: {
      const tenancy = { ...state.tenancy };
      tenancy.property_id = action.payload[0] && action.payload[0].id;
      return { ...state, tenancy, properties: [] };
    }
    case SET_TENANCY_COMMENT: {
      return { ...state, comment: action.payload };
    }
    case SET_CLEAR_ERROR: {
      const error = state.error ? { ...state.error } : {};
      delete error.callback;
      return { ...state, error, loading: { general: false } };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload || {} };
    }
    case SET_PRINT_TEMPLATES: {
      return { ...state, printValues: action.payload };
    }
    case SET_HIDE_MODAL: {
      return { ...state, modal: '', error: {} };
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
    case `${SET_TENANCY_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const tenancies = [...state.tenancies].filter(tenancy => tenancy.id !== id);
      return { ...state, tenancies, error: { callback: () => toastr.info('Deleted', 'Tenancy deleted!') } };
    }
    case SET_TENANCY_CLEAR: {
      return { ...state, tenancy: {}, modal: '', loading: {}, error: null, comment: EditorState.createEmpty() };
    }
    case `${SET_TENANCY_JOBS}${SUCCESS}`: {
      return { ...state, tenancyJobs: action.res, loading: false };
    }
    case SET_NEW_TENANCY_JOB: {
      return { ...state, tenancyJob: {}, peoples: [], modal: 'job' };
    }
    case SET_TENANCY_JOB: {
      return { ...state, tenancyJob: action.payload };
    }
    case `${SET_TENANCY_JOB}${REQUEST}`: {
      return { ...state, modal: 'job' };
    }
    case `${SET_TENANCY_JOB}${SUCCESS}`: {
      return { ...state, tenancyJob: action.res.data };
    }
    case `${SET_TENANCY_JOB_PEOPLE_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, peoples: action.res.data };
    }
    case `${SET_TENANCY_JOB_UPDATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, job: true } : { job: true } };
    }
    case `${SET_TENANCY_JOB_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, job: false } : { job: false }
      };
    }
    case `${SET_TENANCY_JOB_UPDATE}${SUCCESS}`: {
      const tenancyJob = { ...action.res.data };
      const tenancyJobs = state.tenancyJobs ? { ...state.tenancyJobs } : {};
      tenancyJobs.data = tenancyJobs.data ? [...tenancyJobs.data].map(job => (job.id === tenancyJob.id ? tenancyJob : job)) : [tenancyJob];
      return {
        ...state,
        tenancyJobs,
        tenancyJob: {},
        modal: '',
        peoples: [],
        loading: state.loading ? { ...state.loading, job: false } : { job: false }
      };
    }
    case `${SET_TENANCY_JOB_CREATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, job: true } : { job: true } };
    }
    case `${SET_TENANCY_JOB_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, job: false } : { job: false }
      };
    }
    case `${SET_TENANCY_JOB_CREATE}${SUCCESS}`: {
      const tenancyJob = { ...action.res.data };
      const tenancyJobs = state.tenancyJobs ? { ...state.tenancyJobs } : {};
      tenancyJobs.data = tenancyJobs.data ? [tenancyJob].concat([...tenancyJobs.data]) : [tenancyJob];
      return {
        ...state,
        tenancyJobs,
        tenancyJob: {},
        modal: '',
        peoples: [],
        loading: state.loading ? { ...state.loading, job: false } : { job: false }
      };
    }
    case `${SET_TENANCY_JOB_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const tenancyJobs = state.tenancyJobs ? { ...state.tenancyJobs } : {};
      tenancyJobs.date = [...tenancyJobs.data].filter(job => job.id !== id);
      return { ...state, tenancyJobs };
    }
    case `${SET_TENANCY_DISBURSMENTS}${SUCCESS}`: {
      return { ...state, disbursments: action.res };
    }
    case SET_NEW_TENANCY_DISBURSEMENT: {
      return { ...state, disbursement: {}, modal: 'disbursement' };
    }
    case SET_TENANCY_DISBURSEMENT: {
      return { ...state, disbursement: action.payload };
    }
    case `${SET_TENANCY_DISBURSEMENT}${REQUEST}`: {
      return { ...state, modal: 'disbursement' };
    }
    case `${SET_TENANCY_DISBURSEMENT}${SUCCESS}`: {
      return { ...state, disbursement: action.res.data };
    }
    case `${SET_TENANCY_DISBURSEMENT_UPDATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, disbursement: true } : { disbursement: true } };
    }
    case `${SET_TENANCY_DISBURSEMENT_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, disbursement: false } : { disbursement: false }
      };
    }
    case `${SET_TENANCY_DISBURSEMENT_UPDATE}${SUCCESS}`: {
      const disbursement = { ...action.res.data };
      const disbursments = state.disbursments ? { ...state.disbursments } : {};
      disbursments.data = disbursments.data ? [...disbursments.data].map(item => (item.id === disbursement.id ? disbursement : item)) : [disbursement];
      return {
        ...state,
        disbursments,
        disbursement: {},
        modal: '',
        loading: state.loading ? { ...state.loading, disbursement: false } : { disbursement: false }
      };
    }
    case `${SET_TENANCY_DISBURSEMENT_CREATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, disbursement: true } : { disbursement: true } };
    }
    case `${SET_TENANCY_DISBURSEMENT_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, disbursement: false } : { disbursement: false }
      };
    }
    case `${SET_TENANCY_DISBURSEMENT_CREATE}${SUCCESS}`: {
      const disbursement = { ...action.res.data };
      const disbursments = state.disbursments ? { ...state.disbursments } : {};
      disbursments.data = disbursments.data ? [disbursement].concat([...disbursments.data]) : [disbursement];
      return {
        ...state,
        disbursments,
        disbursement: {},
        modal: '',
        loading: state.loading ? { ...state.loading, disbursement: false } : { disbursement: false }
      };
    }
    case `${SET_TENANCY_DISBURSEMENT_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const disbursments = state.disbursments ? { ...state.disbursments } : {};
      disbursments.data = [...disbursments.data].filter(item => item.id !== id);
      return { ...state, disbursments };
    }
    case `${SET_TENANCY_RENTS}${REQUEST}`: {
      return { ...state, modal: '', loading: state.loading ? { ...state.loading, generate: true } : { generate: true } };
    }
    case `${SET_TENANCY_RENTS}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, generate: false } : { generate: false }
      };
    }
    case `${SET_TENANCY_RENTS}${SUCCESS}`: {
      const tenancyRents = action.res;
      return {
        ...state,
        tenancyRents,
        tenancyAccountOverview: action.res.overview,
        loading: state.loading ? { ...state.loading, generate: false } : { generate: false }
      };
    }
    case SET_TENANCY_OVERDUE: {
      return { ...state, overdue: action.payload };
    }
    case SET_NEW_TENANCY_RENT: {
      return { ...state, tenancyRent: {}, modal: 'rent' };
    }
    case SET_TENANCY_RENT: {
      return { ...state, tenancyRent: action.payload };
    }
    case `${SET_TENANCY_RENT}${REQUEST}`: {
      return { ...state, modal: 'rent' };
    }
    case `${SET_TENANCY_RENT}${SUCCESS}`: {
      return { ...state, tenancyRent: action.res.data };
    }
    case SET_TENANCY_GENERATE_RENT: {
      return { ...state, tenancyGenerateRent: action.payload };
    }
    case `${SET_TENANCY_RENT_UPDATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, rent: true } : { rent: true } };
    }
    case `${SET_TENANCY_RENT_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, rent: false } : { rent: false }
      };
    }
    case `${SET_TENANCY_RENT_UPDATE}${SUCCESS}`: {
      const tenancyRent = { ...action.res.data };
      const tenancyRents = state.tenancyRents ? { ...state.tenancyRents } : {};
      tenancyRents.data = tenancyRents.data ? [...tenancyRents.data].map(item => (item.id === tenancyRent.id ? tenancyRent : item)) : [tenancyRent];
      return {
        ...state,
        tenancyRents,
        tenancyRent: {},
        modal: '',
        tenancyGenerateRent: {},
        tenancyAccountOverview: action.res.overview,
        error: {},
        loading: state.loading ? { ...state.loading, rent: false } : { rent: false }
      };
    }
    case `${SET_TENANCY_RENT_CREATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, rent: true } : { rent: true } };
    }
    case `${SET_TENANCY_RENT_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, rent: false } : { rent: false }
      };
    }
    case `${SET_TENANCY_RENT_CREATE}${SUCCESS}`: {
      const tenancyRent = { ...action.res.data };
      const tenancyRents = state.tenancyRents ? { ...state.tenancyRents } : {};
      tenancyRents.data = tenancyRents.data ? [tenancyRent].concat([...tenancyRents.data]) : [tenancyRent];
      return {
        ...state,
        tenancyRents,
        tenancyRent: {},
        modal: '',
        tenancyGenerateRent: {},
        tenancyAccountOverview: action.res.overview,
        loading: state.loading ? { ...state.loading, rent: false } : { rent: false },
        error: {},
      };
    }
    case `${SET_TENANCY_RENT_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const tenancyRents = { ...state.tenancyRents };
      tenancyRents.data = [...tenancyRents.data].filter(item => item.id !== id);
      return { ...state, tenancyRents, tenancyGenerateRent: {}, tenancyAccountOverview: action.res.overview };
    }
    case SET_TENANCY_RENT_ID: {
      // const tenancyRent = [...state.tenancyRents.data].find(item => item.id === action.payload);
      // console.log(state.tenancyRents.data);
      // console.log(tenancyRent);
      // const tenants = tenancyRent.tenant;
      return { ...state, tenancyRentDueId: action.payload };
    }
    case SET_SELECTED_RENT: {
      return { ...state, tenancyRent: action.payload, tenants: action.payload.tenant };
    }
    case `${SET_TENANCY_PAYMENTS}${REQUEST}`: {
      return { ...state, modal: 'payment' };
    }
    case `${SET_TENANCY_PAYMENTS}${SUCCESS}`: {
      return { ...state, tenancyPayments: action.res, tenancyAccountOverview: action.res.overview };
    }
    case SET_TENANCY_PAYMENT: {
      return { ...state, tenancyPayment: action.payload };
    }
    case `${SET_TENANCY_PAYMENT}${SUCCESS}`: {
      return { ...state, tenancyPayment: action.res.data, tenancyAccountOverview: action.res.overview, error: {} };
    }
    case `${SET_TENANCY_PAYMENT_UPDATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, payment: true } : { payment: true } };
    }
    case `${SET_TENANCY_PAYMENT_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, payment: false } : { payment: false },
      };
    }
    case `${SET_TENANCY_PAYMENT_UPDATE}${SUCCESS}`: {
      const tenancyPayment = { ...action.res.data };
      const tenancyPayments = state.tenancyPayments ? { ...state.tenancyPayments } : {};
      tenancyPayments.data = tenancyPayments.data ? [...tenancyPayments.data].map(item => (item.id === tenancyPayment.id ? tenancyPayment : item)) : [tenancyPayment];
      return {
        ...state,
        tenancyPayments,
        tenancyPayment: {},
        error: {},
        tenancyAccountOverview: action.res.overview,
        loading: state.loading ? { ...state.loading, payment: true } : { payment: true },
      };
    }
    case `${SET_TENANCY_PAYMENT_CREATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, payment: true } : { payment: true } };
    }
    case `${SET_TENANCY_PAYMENT_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, payment: false } : { payment: false },
      };
    }
    case `${SET_TENANCY_PAYMENT_CREATE}${SUCCESS}`: {
      const tenancyPayment = { ...action.res.data };
      const tenancyPayments = state.tenancyPayments ? { ...state.tenancyPayments } : {};
      tenancyPayments.data = tenancyPayments.data ? [tenancyPayment].concat([...tenancyPayments.data]) : [tenancyPayment];
      return {
        ...state,
        tenancyPayments,
        tenancyPayment: {},
        error: {},
        tenancyAccountOverview: action.res.overview,
        loading: state.loading ? { ...state.loading, payment: false } : { payment: false },
      };
    }
    case `${SET_TENANCY_PAYMENT_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const tenancyPayments = { ...state.tenancyPayments };
      tenancyPayments.data = [...tenancyPayments.data].filter(item => item.id !== id);
      return { ...state, tenancyPayments, tenancyAccountOverview: action.res.overview, error: {} };
    }
    case `${SET_TENANCY_ACCOUNTS}${SUCCESS}`: {
      return { ...state, tenancyAccounts: action.res };
    }
    case `${SET_TENANCY_ACCOUNT_OVERVIEW}${SUCCESS}`: {
      return { ...state, tenancyAccountOverview: action.res.data };
    }
    case SET_TENANCY_ACCOUNT: {
      return { ...state, tenancyAccount: action.payload };
    }
    case `${SET_TENANCY_ACCOUNT}${REQUEST}`: {
      return { ...state, modal: 'account' };
    }
    case `${SET_TENANCY_ACCOUNT}${SUCCESS}`: {
      return { ...state, tenancyAccount: action.res.data };
    }
    case `${SET_TENANCY_ACCOUNT_UPDATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, account: true } : { account: true } };
    }
    case `${SET_TENANCY_ACCOUNT_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, account: false } : { account: false }
      };
    }
    case `${SET_TENANCY_ACCOUNT_UPDATE}${SUCCESS}`: {
      const tenancyAccount = { ...action.res.data };
      const tenancyAccounts = state.tenancyAccounts ? { ...state.tenancyAccounts } : {};
      tenancyAccounts.data = tenancyAccounts.data ? [...tenancyAccounts.data].map(item => (item.id === tenancyAccount.id ? tenancyAccount : item)) : [tenancyAccount];
      return {
        ...state,
        tenancyAccounts,
        tenancyAccount: {},
        error: { callback: () => toastr.success('Account', 'Account created!') },
        loading: state.loading ? { ...state.loading, account: false } : { account: false },
        modal: '',
      };
    }
    case `${SET_TENANCY_ACCOUNT_CREATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, account: true } : { account: true } };
    }
    case `${SET_TENANCY_ACCOUNT_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, account: false } : { account: false }
      };
    }
    case `${SET_TENANCY_ACCOUNT_CREATE}${SUCCESS}`: {
      const tenancyAccount = { ...action.res.data };
      const tenancyAccounts = state.tenancyAccounts ? { ...state.tenancyAccounts } : {};
      tenancyAccounts.data = tenancyAccounts.data ? [tenancyAccount].concat([...tenancyAccounts.data]) : [tenancyAccount];
      return {
        ...state,
        tenancyAccounts,
        tenancyAccount: {},
        error: { callback: () => toastr.success('Account', 'Account created!') },
        loading: state.loading ? { ...state.loading, account: false } : { account: false }
      };
    }
    case `${SET_TENANCY_ACCOUNT_DELETE}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_TENANCY_ACCOUNT_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const tenancyAccounts = { ...state.tenancyAccounts };
      tenancyAccounts.data = [...tenancyAccounts.data].filter(item => item.id !== id);
      return { ...state, tenancyAccounts, error: { callback: () => toastr.info('Account', 'Account deleted!') } };
    }
    case `${SET_TENANCY_STATEMENTS}${REQUEST}`: {
      return { ...state, modal: 'statement' };
    }
    case `${SET_TENANCY_STATEMENTS}${SUCCESS}`: {
      return { ...state, tenancyStatements: action.res };
    }
    case SET_TENANCY_STATEMENT: {
      return { ...state, tenancyStatement: action.payload };
    }
    case `${SET_TENANCY_STATEMENT}${SUCCESS}`: {
      // const tenancyRent = [...state.tenancyRents.data].find(item => item.id === action.payload);
      // console.log(state.tenancyRents.data);
      // console.log(tenancyRent);
      // const tenants = tenancyRent.tenant;
      return { ...state, tenancyStatement: action.res.data };
    }
    case `${SET_TENANCY_STATEMENT_CREATE}${REQUEST}`: {
      return { ...state, statementLoading: true };
    }
    case `${SET_TENANCY_STATEMENT_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        statementLoading: false
      };
    }
    case `${SET_TENANCY_STATEMENT_CREATE}${SUCCESS}`: {
      const tenancyStatement = { ...action.res.data };
      const tenancyStatements = state.tenancyStatements ? { ...state.tenancyStatements } : {};
      tenancyStatements.data = tenancyStatements.data ? [{ ...tenancyStatement, new: true }].concat([...tenancyStatements.data]) : [tenancyStatement];
      return {
        ...state,
        tenancyStatements,
        tenancyStatement: {},
        statementLoading: false,
        error: { callback: () => toastr.success('Success', 'Statement created!') }
      };
    }
    case `${SET_TENANCY_STATEMENT_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const tenancyStatements = { ...state.tenancyStatements };
      tenancyStatements.data = [...tenancyStatements.data].filter(item => item.id !== id);
      return { ...state, tenancyStatements };
    }
    case `${SET_TENANCY_STATEMENT_TEMPLATE}${SUCCESS}`: {
      return { ...state, tenancyStatementTemplates: action.res };
    }
    case `${SET_TENANCY_LANDLORDS}${REQUEST}`: {
      return { ...state, modal: 'landlord' };
    }
    case `${SET_TENANCY_LANDLORDS}${SUCCESS}`: {
      return { ...state, tenancyLandlords: action.res, tenancyAccountOverview: action.res.overview };
    }
    case SET_TENANCY_LANDLORD: {
      return { ...state, tenancyLandlord: action.payload };
    }
    case `${SET_TENANCY_LANDLORD}${SUCCESS}`: {
      return { ...state, tenancyLandlord: action.res.data, error: {} };
    }
    case `${SET_TENANCY_LANDLORD_UPDATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, landlord: true } : { landlord: true } };
    }
    case `${SET_TENANCY_LANDLORD_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, landlord: false } : { landlord: false }
      };
    }
    case `${SET_TENANCY_LANDLORD_UPDATE}${SUCCESS}`: {
      const tenancyLandlord = { ...action.res.data };
      const tenancyLandlords = state.tenancyLandlords ? { ...state.tenancyLandlords } : {};
      tenancyLandlords.data = tenancyLandlords.data ? [...tenancyLandlords.data].map(item => (item.id === tenancyLandlord.id ? tenancyLandlord : item)) : [tenancyLandlord];
      return {
        ...state,
        tenancyLandlords,
        tenancyLandlord: {},
        tenancyAccountOverview: action.res.overview,
        loading: state.loading ? { ...state.loading, landlord: false } : { landlord: false },
        error: {},
      };
    }
    case `${SET_TENANCY_LANDLORD_CREATE}${REQUEST}`: {
      return { ...state, loading: state.loading ? { ...state.loading, landlord: true } : { landlord: true } };
    }
    case `${SET_TENANCY_LANDLORD_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return {
        ...state,
        error: { callback: () => toastr.error('Error', action.error.message), errors },
        loading: state.loading ? { ...state.loading, landlord: false } : { landlord: false }
      };
    }
    case `${SET_TENANCY_LANDLORD_CREATE}${SUCCESS}`: {
      // const tenancyAccountOverview = { ...state.tenancyAccountOverview };
      const tenancyLandlord = { ...action.res.data };
      const tenancyLandlords = state.tenancyLandlords ? { ...state.tenancyLandlords } : {};
      // tenancyAccountOverview.landlord_due = `${parseInt(tenancyAccountOverview.landlord_due, 10) + }`
      tenancyLandlords.data = tenancyLandlords.data ? [tenancyLandlord].concat([...tenancyLandlords.data]) : [tenancyLandlord];
      return {
        ...state,
        tenancyLandlords,
        tenancyLandlord: { tenancy_id: state.tenancyLandlord.tenancy_id },
        tenancyAccountOverview: action.res.overview,
        loading: state.loading ? { ...state.loading, landlord: false } : { landlord: false },
        error: {},
      };
    }
    case `${SET_TENANCY_LANDLORD_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const tenancyLandlords = { ...state.tenancyLandlords };
      tenancyLandlords.data = [...tenancyLandlords.data].filter(item => item.id !== id);
      return { ...state, tenancyLandlords, tenancyAccountOverview: action.res.overview };
    }
    case SET_TENANCY_SEARCH_PANEL: {
      return { ...state, searchPanel: !state.searchPanel };
    }
    case SET_NEW_PROPERTY: {
      return { ...state, newProperty: !state.newProperty, error: {} };
    }
    case SET_NEW_CONTACT: {
      return { ...state, newContact: !state.newContact, error: {} };
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
      const property = action.res.data.property;
      property.address = property.address_1;
      const tenancy = { ...state.tenancy };
      tenancy.property = property;
      return {
        ...state,
        tenancy,
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
      const contact = action.res.data.contact;
      contact.name = contact.full_name;
      const tenancy = { ...state.tenancy };
      tenancy.tenant = tenancy.tenant ? [...tenancy.tenant].concat([contact]) : [contact];
      return {
        ...state,
        tenancy,
        newContact: false,
        loading: state.loading ? {...state.loading, quickContact: false} : { quickContact: false }
      };
    }
    case `${SET_TENANCY_LANDLORDS_DUE}${SUCCESS}`: {
      return { ...state, landlordsDue: action.res, modal: '' };
    }
    case `${SET_TENANCY_CLIENT_ACCOUNT}${REQUEST}`: {
      return { ...state, clientAccountsLoading: true };
    }
    case `${SET_TENANCY_CLIENT_ACCOUNT}${FAILURE}`: {
      return { ...state, clientAccountsLoading: false };
    }
    case `${SET_TENANCY_CLIENT_ACCOUNT}${SUCCESS}`: {
      return { ...state, clientAccounts: action.res, clientAccountsLoading: false };
    }
    case `${SET_TENANCY_ALL_JOBS}${REQUEST}`: {
      return { ...state, jobsLoading: true };
    }
    case `${SET_TENANCY_ALL_JOBS}${FAILURE}`: {
      return { ...state, jobsLoading: false };
    }
    case `${SET_TENANCY_ALL_JOBS}${SUCCESS}`: {
      return { ...state, jobs: action.res, jobsLoading: false };
    }
    case `${SET_TENANCY_CLIENT_OVERVIEW}${SUCCESS}`: {
      return { ...state, clientAccountsOverview: action.res.data };
    }
    case `${SET_EMAILS}${REQUEST}`: {
      return { ...state, modal: 'emails' };
    }
    case `${SET_EMAILS}${SUCCESS}`: {
      const emails = action.res.data;
      return { ...state, emails };
    }
    case SET_EMAIL: {
      return { ...state, email: action.payload };
    }
    case `${SET_SIGNABLES}${REQUEST}`: {
      return { ...state, modal: 'signables' };
    }
    case `${SET_SIGNABLES}${SUCCESS}`: {
      const emails = action.res.data;
      return { ...state, emails };
    }
    case SET_SIGNABLE: {
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
    case SET_TENANCIES_SEARCH: {
      return { ...state, searchValues: action.payload };
    }
    case SET_MODAL: {
      return { ...state, modal: action.payload };
    }
    case `${SET_DELETE_DOCUMENT}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const documents = [...state.documents].filter(doc => doc.id !== id);
      return { ...state, documents };
    }
    default: return state;
  }
};

export const getTenancies = page => ({ type: SET_TENANCIES, promise: fetch({ page }) });
export const getTenancyInfo = id => ({ type: SET_TENANCY, promise: tenancyInfo(id) });
export const deleteTenancy = id => ({ type: SET_TENANCY_DELETE, promise: tenancyDelete(id) });
export const mainFormChange = event => (dispatch, getState) => {
  const tenancy = { ...getState().app.tenancies.tenancy } || {};
  tenancy[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
  dispatch({ type: SET_TENANCY, payload: tenancy });
};
export const mainFormSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.tenancies };
  const tenancy = { ...state.tenancy };
  const comment = state.comment;
  const raw = comment && comment.getCurrentContent();
  if (raw) {
    tenancy.comment = stateToHTML(raw);
  }
  tenancy.tenant = tenancy.tenant && tenancy.tenant.map(tenant => tenant.id).join(',');
  if (tenancy.id) {
    tenancy.property_id = tenancy.property_id || (tenancy.property && tenancy.property.id);
    console.log(tenancy);
    dispatch({ type: SET_TENANCY_UPDATE, promise: tenancyUpdate(tenancy) });
  } else {
    tenancyCreate(tenancy)
      .then(({ id }) => browserHistory.push(juvo.tenancies.infoLink(id)))
      .catch((err) => {
        const { errors } = err;
        dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Error', err.message), errors } });
      });
  }
};
export const handleClientChange = data => ({ type: SET_PEOPLE_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const handleClientSelect = id => ({ type: SET_TENANCY_PEOPLE, payload: id });
export const handleRecipientChange = data => ({ type: SET_RECIPIENTS_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const handleRecipientSelect = id => ({ type: SET_SIGNABLE_RECIPIENTS, payload: id });
export const handlePropertyChange = data => ({ type: SET_PROPERTY_AUTOCOMPLETE, promise: propertyAutocomplete(data) });
export const handlePropertySelect = id => ({ type: SET_TENANCY_PROPERTY, payload: id });
export const mainFormAgreedDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancy = { ...getState().app.tenancies.tenancy };
    const date = moment(Date.parse(event));
    tenancy.let_date_agreed = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY, payload: tenancy });
  };
};
export const mainFormStartDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancy = { ...getState().app.tenancies.tenancy };
    const date = moment(Date.parse(event));
    tenancy.start_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY, payload: tenancy });
  };
};
export const mainFormEndDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancy = { ...getState().app.tenancies.tenancy };
    const date = moment(Date.parse(event));
    tenancy.end_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY, payload: tenancy });
  };
};
export const changeComment = editorState => ({ type: SET_TENANCY_COMMENT, payload: editorState });
export const toggleBlockType = (blockType) => {
  return (dispatch, getState) => {
    const comment = getState().app.tenancies.comment;
    dispatch(changeComment(RichUtils.toggleBlockType(comment, blockType)));
  };
};
export const toggleInlineStyle = (inlineStyle) => {
  return (dispatch, getState) => {
    const comment = getState().app.tenancies.comment;
    dispatch(changeComment(RichUtils.toggleInlineStyle(comment, inlineStyle)));
  };
};
export const clearError = error => ({ type: SET_CLEAR_ERROR, payload: error });
export const handleNotesClick = (id) => {
  return (dispatch) => {
    dispatch({ type: SET_NOTES, promise: getTenancyNotes({ tenancy_id: id }) });
    dispatch({ type: SET_NOTES_CATEGORY, promise: getNotesCategory() });
  };
};
export const handlePrintChange = (event) => {
  return (dispatch, getState) => {
    const printValues = { ...getState().app.tenancies.printValues } || {};
    if (event.target.type === 'checkbox') {
      console.log(event);
      if (prevPrintCheckbox && (prevPrintCheckbox !== event.target)) {
        printValues[prevPrintCheckbox.name] = false;
      }
      printValues[event.target.name] = event.target.checked;
      prevPrintCheckbox = event.target;
    } else {
      printValues[event.target.name] = event.target.value;
    }
    dispatch({ type: SET_PRINT_TEMPLATES, payload: printValues });
  };
};
export const handleNoteCreate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.tenancies };
    const { tenancy, noteCategories } = state;
    const note = state.note ? { ...state.note } : {};
    note.tenancy_id = tenancy.id;
    note.category_id = note.category_id || noteCategories[0].id;
    dispatch({ type: SET_NOTE_CREATE, promise: createNote(note) });
  };
};
export const handleNoteChange = (event) => {
  return (dispatch, getState) => {
    const note = { ...getState().app.tenancies.note };
    note[event.target.name] = event.target.value;
    dispatch({ type: SET_NOTE_CREATE, payload: note });
  };
};
export const handleNoteDelete = id => ({ type: SET_NOTE_DELETE, promise: deleteNote({ id }) });
export const handlePrintSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  dispatch({ type: SET_LOADING, payload: { print: true } });
  const state = { ...getState().app.tenancies };
  const printValues = { ...state.printValues } || {};
  printValues.template_id = printValues.template_id || state.printTemplates[0].id;
  printValues.id = state.tenancy.id;
  dispatch({ type: SET_ERROR, payload: { callback: () => toastr.info('Printing', 'Generating Print Template') } });
  printTemplate(printValues)
    .then((response) => {
      dispatch({ type: SET_PRINTED_DOCUMENT, payload: response.doc });
      const url = response.url;
      if (printValues.sendEmail) {
        dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc });
        dispatch({ type: SET_EMAILS, promise: fetchEmails({ tenancy_id: state.tenancy.id }) });
      } else if (printValues.sendSignable) {
        dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc });
        dispatch({ type: SET_SIGNABLES, promise: fetchEmails({ tenancy_id: state.tenancy.id }) });
      } else {
        dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc });
        downloadFile(url, response.doc.filename);
      }
      // .then(() => dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc }))
      // .catch(() => {
      //   dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Error', 'Download failed') } });
      //   dispatch({ type: SET_LOADING, payload: {} });
      // });
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
    const state = { ...getState().app.tenancies };
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
              tenancy_id: state.tenancy.id,
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
export const handleDocumentDelete = id => ({ type: SET_DELETE_DOCUMENT, promise: deleteDocument(id) });
export const clearTenancyInfo = () => ({ type: SET_TENANCY_CLEAR });
// TENANCY JOB
export const getTenancyJobs = data => ({ type: SET_TENANCY_JOBS, promise: fetchTenancyJobs(data) });
export const getTenancyJobInfo = id => ({ type: SET_TENANCY_JOB, promise: tenancyJobInfo(id) });
export const addTenancyJob = () => ({ type: SET_NEW_TENANCY_JOB });
export const handleTenancyJobChange = event => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyJob = state.tenancyJob ? { ...state.tenancyJob } : {};
  if (event.target.type === 'checkbox') {
    tenancyJob[event.target.name] = event.target.checked;
  } else {
    tenancyJob[event.target.name] = event.target.value;
  }
  dispatch({ type: SET_TENANCY_JOB, payload: tenancyJob });
};
export const handleTenancyJobSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.tenancies };
  console.log(state);
  const tenancyJob = state.tenancyJob ? { ...state.tenancyJob } : {};
  if (state.tenancyJob.tenancy_id) {
    tenancyJob.tenancy_id = state.tenancyJob.tenancy_id;
  } else {
    tenancyJob.tenancy_id = state.tenancy.id;
  }
  tenancyJob.people_id = (tenancyJob.contact && tenancyJob.contact.id);
  if (tenancyJob.id) {
    dispatch({ type: SET_TENANCY_JOB_UPDATE, promise: tenancyJobUpdate(tenancyJob) });
  } else {
    dispatch({ type: SET_TENANCY_JOB_CREATE, promise: tenancyJobCreate(tenancyJob) });
  }
};
export const deleteTenancyJob = data => ({ type: SET_TENANCY_JOB_DELETE, promise: tenancyJobDelete(data) });
export const handleJobClientChange = data => ({ type: SET_TENANCY_JOB_PEOPLE_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const handleJobClientSelect = data => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyJob = state.tenancyJob ? { ...state.tenancyJob } : {};
  tenancyJob.contact = data[0];
  dispatch({ type: SET_TENANCY_JOB, payload: tenancyJob });
};
export const jobScheludeDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancyJob = { ...getState().app.tenancies.tenancyJob };
    const date = moment(Date.parse(event));
    tenancyJob.scheduled_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY_JOB, payload: tenancyJob });
  };
};
export const jobCompletionDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancyJob = { ...getState().app.tenancies.tenancyJob };
    const date = moment(Date.parse(event));
    tenancyJob.completion_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY_JOB, payload: tenancyJob });
  };
};
export const getNextJobs = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyRents = state.tenancyRents ? { ...state.tenancyRents } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyRents.current_page + 1,
  };
  dispatch(getTenancyJobs(data));
};
export const getPreviousJobs = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyRents = state.tenancyRents ? { ...state.tenancyRents } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyRents.current_page - 1,
  };
  dispatch(getTenancyJobs(data));
};
// TENANCY DISBUSEMENT
export const getDisbursments = data => ({ type: SET_TENANCY_DISBURSMENTS, promise: fetchDisbursments(data) });
export const getDisbursementInfo = id => ({ type: SET_TENANCY_DISBURSEMENT, promise: disbursementInfo(id) });
export const addDisbursement = () => ({ type: SET_NEW_TENANCY_DISBURSEMENT });
export const handleDisbursementChange = event => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const disbursement = state.disbursement ? { ...state.disbursement } : {};
  if (event.target.type === 'checkbox') {
    disbursement[event.target.name] = event.target.checked;
  } else {
    disbursement[event.target.name] = event.target.value;
  }
  dispatch({ type: SET_TENANCY_DISBURSEMENT, payload: disbursement });
};
export const disbursementDateChange = (event) => {
  return (dispatch, getState) => {
    const disbursement = { ...getState().app.tenancies.disbursement };
    const date = moment(Date.parse(event));
    disbursement.date_raised = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY_DISBURSEMENT, payload: disbursement });
  };
};
export const handleDisbursementSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.tenancies };
  const disbursement = state.disbursement ? { ...state.disbursement } : {};
  disbursement.tenancy_id = state.tenancy.id;
  if (disbursement.id) {
    dispatch({ type: SET_TENANCY_DISBURSEMENT_UPDATE, promise: disbursementUpdate(disbursement) });
  } else {
    dispatch({ type: SET_TENANCY_DISBURSEMENT_CREATE, promise: disbursementCreate(disbursement) });
  }
};
export const deleteDisbursement = data => ({ type: SET_TENANCY_DISBURSEMENT_DELETE, promise: disbursementDelete(data) });
export const getNextDisbursments = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyRents = state.tenancyRents ? { ...state.tenancyRents } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyRents.current_page + 1,
  };
  dispatch(getDisbursments(data));
};
export const getPreviousDisbursments = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyRents = state.tenancyRents ? { ...state.tenancyRents } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyRents.current_page - 1,
  };
  dispatch(getDisbursments(data));
};
// TENANCY RENT
// export const getTenancyRents = data => ({ type: SET_TENANCY_RENTS, promise: fetchTenancyRents(data) });
export const getTenancyRents = data => (dispatch) => {
  const overdue = data.overdue;
  dispatch({ type: SET_TENANCY_OVERDUE, payload: overdue });
  dispatch({ type: SET_TENANCY_RENTS, promise: fetchTenancyRents(data) });
};
export const getTenancyPaymentsNext = data => ({ type: SET_TENANCY_PAYMENTS, promise: fetchTenancyPaymentsNext(data) });
export const getTenancyLandlordsNext = data => ({ type: SET_TENANCY_LANDLORDS, promise: fetchTenancyLandlord(data) });
export const getTenancyRentInfo = id => ({ type: SET_TENANCY_RENT, promise: tenancyRentInfo(id) });
export const addTenancyRent = () => ({ type: SET_NEW_TENANCY_RENT });
export const handleTenancyRentChange = event => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyRent = state.tenancyRent ? { ...state.tenancyRent } : {};
  if (event.target.type === 'checkbox') {
    tenancyRent[event.target.name] = event.target.checked;
  } else {
    tenancyRent[event.target.name] = event.target.value;
  }
  dispatch({ type: SET_TENANCY_RENT, payload: tenancyRent });
};
export const handleTenancyRentDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancyRent = { ...getState().app.tenancies.tenancyRent };
    const date = moment(Date.parse(event));
    tenancyRent.due_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY_RENT, payload: tenancyRent });
  };
};
export const handleTenancyRentStartDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancyGenerateRent = { ...getState().app.tenancies.tenancyGenerateRent };
    const date = moment(Date.parse(event));
    tenancyGenerateRent.start_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY_GENERATE_RENT, payload: tenancyGenerateRent });
  };
};
export const handleTenancyRentEndDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancyGenerateRent = { ...getState().app.tenancies.tenancyGenerateRent };
    const date = moment(Date.parse(event));
    tenancyGenerateRent.end_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY_GENERATE_RENT, payload: tenancyGenerateRent });
  };
};
export const handleGenerateRentSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.tenancies };
  const tenancyGenerateRent = state.tenancyGenerateRent ? { ...state.tenancyGenerateRent } : {};
  tenancyGenerateRent.tenancy_id = state.tenancy.id;
  dispatch({ type: SET_TENANCY_RENTS, promise: tenancyRentGenerate(tenancyGenerateRent) });
};
export const handleTenancyRentSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.tenancies };
  const tenancyRent = state.tenancyRent ? { ...state.tenancyRent } : {};
  if (tenancyRent.id) {
    dispatch({ type: SET_TENANCY_RENT_UPDATE, promise: tenancyRentUpdate(tenancyRent) });
  } else {
    tenancyRent.tenancy_id = state.tenancy.id;
    dispatch({ type: SET_TENANCY_RENT_CREATE, promise: tenancyRentCreate(tenancyRent) });
  }
};
export const deleteTenancyRent = data => ({ type: SET_TENANCY_RENT_DELETE, promise: tenancyRentDelete(data) });
export const getNextRents = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyRents = state.tenancyRents ? { ...state.tenancyRents } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyRents.current_page + 1,
  };
  dispatch(getTenancyRents(data));
};
export const getPreviousRents = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyRents = state.tenancyRents ? { ...state.tenancyRents } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyRents.current_page - 1,
  };
  dispatch(getTenancyRents(data));
};
// TENANCY RENT PAYMENT
export const getTenancyPayments = id => (dispatch, getState) => {
  const tenancyId = typeof (id) === 'object' ? getState().app.tenancies.tenancy.id : (id || getState().app.tenancies.tenancy.id);
  dispatch({ type: SET_TENANCY_PAYMENT, payload: { tenancy_id: tenancyId } });
  dispatch({ type: SET_TENANCY_PAYMENTS, promise: fetchTenancyPayments({ tenancy_id: tenancyId, page: 1 }) });
};
export const handleTenancyPaymentChange = event => (dispatch, getState) => {
  const tenancyPayment = { ...getState().app.tenancies.tenancyPayment };
  tenancyPayment[event.target.name] = event.target.value;
  dispatch({ type: SET_TENANCY_PAYMENT, payload: tenancyPayment });
};
export const handleTenancyPaymentDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancyPayment = { ...getState().app.tenancies.tenancyPayment };
    const date = moment(Date.parse(event));
    tenancyPayment.date_received = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY_PAYMENT, payload: tenancyPayment });
  };
};
export const handleTenancyPatmentSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.tenancies };
  const tenancyPayment = { ...state.tenancyPayment };
  tenancyPayment.tenancy_id = tenancyPayment.tenancy_id || (state.tenancy && state.tenancy.id);
  tenancyPayment.tenancy_rent_due_id = state.tenancyRentDueId;
  tenancyPayment.people_id = tenancyPayment.people_id || (tenancyPayment.tenant && tenancyPayment.tenant[0] && tenancyPayment.tenant[0].id);
  if (tenancyPayment.id) {
    dispatch({ type: SET_TENANCY_PAYMENT_UPDATE, promise: tenancyPaymentUpdate(tenancyPayment) });
  } else {
    dispatch({ type: SET_TENANCY_PAYMENT_CREATE, promise: tenancyPaymentCreate(tenancyPayment) });
  }
};
export const handleTenancyPaymentNext = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  // console.log(state);
  const tenancyPayments = state.tenancyPayments ? { ...state.tenancyPayments } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyPayments.current_page + 1,
  };
  dispatch(getTenancyPaymentsNext(data));
};
export const handleTenancyPaymentPrevious = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyPayments = state.tenancyPayments ? { ...state.tenancyPayments } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyPayments.current_page - 1,
  };
  dispatch(getTenancyPaymentsNext(data));
};
export const clearTenancyPayment = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyPayment = {
    tenancy_id: state.tenancyPayment && state.tenancyPayment.tenancy_id,
  };
  dispatch({ type: SET_TENANCY_PAYMENT, payload: tenancyPayment });
};
export const getTenancyPaymentInfo = id => ({ type: SET_TENANCY_PAYMENT, promise: tenancyPaymentInfo(id) });
export const deleteTenancyPayment = id => ({ type: SET_TENANCY_PAYMENT_DELETE, promise: tenancyPaymentDelete(id) });
export const confirmTenancyRent = (rent) => {
  if (rent.confirm) {
    return { type: SET_TENANCY_RENT_UPDATE, promise: tenancyRentUnconfirm(rent.id) };
  }
  return { type: SET_TENANCY_RENT_UPDATE, promise: tenancyRentConfirm(rent.id) };
};
// TENANCY ACCOUNT
export const setAccountModal = () => ({ type: SET_MODAL, payload: 'account' });
export const getTenancyAccounts = data => ({ type: SET_TENANCY_ACCOUNTS, promise: fetchTenancyAccounts(data) });
export const handleAccountClick = () => (dispatch, getState) => {
  const id = getState().app.tenancies.tenancy.id;
  dispatch(getTenancyAccounts({ tenancy_id: id }));
};
export const getTenancyAccountOverview = id => ({ type: SET_TENANCY_ACCOUNT_OVERVIEW, promise: tenancyAccountOverview(id) });
export const handleTenancyAccountNext = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyAccounts = state.tenancyAccounts ? { ...state.tenancyAccounts } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyAccounts.current_page + 1,
  };
  dispatch(getTenancyAccounts(data));
};
export const handleTenancyAccountPrevious = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyAccounts = state.tenancyAccounts ? { ...state.tenancyAccounts } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyAccounts.current_page - 1,
  };
  dispatch(getTenancyAccounts(data));
};
export const getTenancyAccountInfo = id => ({ type: SET_TENANCY_ACCOUNT, promise: tenancyAccountInfo(id) });
export const handleTenancyAccountChange = event => (dispatch, getState) => {
  const tenancyAccount = { ...getState().app.tenancies.tenancyAccount };
  tenancyAccount[event.target.name] = event.target.value;
  dispatch({ type: SET_TENANCY_ACCOUNT, payload: tenancyAccount });
};
export const handleTenancyAccountDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancyAccount = { ...getState().app.tenancies.tenancyAccount };
    const date = moment(Date.parse(event));
    tenancyAccount.date_received = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY_ACCOUNT, payload: tenancyAccount });
  };
};
export const handleTenancyAccountSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.tenancies };
  const tenancyAccount = { ...state.tenancyAccount };
  tenancyAccount.tenancy_id = state.tenancy.id;
  if (tenancyAccount.id) {
    dispatch({ type: SET_TENANCY_ACCOUNT_UPDATE, promise: tenancyAccountUpdate(tenancyAccount) });
  } else {
    dispatch({ type: SET_TENANCY_ACCOUNT_CREATE, promise: tenancyAccountCreate(tenancyAccount) });
  }
};
export const clearTenancyAccount = () => ({ type: SET_TENANCY_ACCOUNT, payload: {} });
export const deleteTenancyAccount = id => ({ type: SET_TENANCY_ACCOUNT_DELETE, promise: tenancyAccountDelete(id) });
// TENANCY STATEMENT
export const setSelectedRent = data => ({ type: SET_SELECTED_RENT, payload: data });
export const getTenancyStatements = data => (dispatch, getState) => {
  const tenancy = getState().app.tenancies.tenancy ? { ...getState().app.tenancies.tenancy } : {};
  tenancy.id = (tenancy.id && tenancy.id === data.tenancy_id) ? tenancy.id : data.tenancy_id;
  dispatch({ type: SET_TENANCY, payload: tenancy });
  dispatch({ type: SET_TENANCY_STATEMENTS, promise: fetchTenancyStatements(data) });
};
export const handleTenancyStatementNext = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyStatements = state.tenancyStatements ? { ...state.tenancyStatements } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyStatements.current_page + 1,
  };
  dispatch(getTenancyStatements(data));
};
export const handleTenancyStatementPrevious = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyStatements = state.tenancyStatements ? { ...state.tenancyStatements } : {};
  const data = {
    tenancy_id: state.tenancy.id,
    page: tenancyStatements.current_page - 1,
  };
  dispatch(getTenancyStatements(data));
};
export const getTenancyStatementInfo = id => ({ type: SET_TENANCY_STATEMENT, promise: tenancyStatementInfo(id) });
export const handleTenancyStatementChange = event => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyStatement = { ...state.tenancyStatement };
  tenancyStatement[event.target.name] = event.target.value;
  dispatch({ type: SET_TENANCY_STATEMENT, payload: tenancyStatement });
  if (event.target.name === 'type_id') {
    const tenancyStatements = { ...state.tenancyStatement };
    const data = {
      tenancy_id: state.tenancy.id,
      page: tenancyStatements.current_page,
    };
    dispatch(getTenancyStatements(data));
  }
};
export const handleTenancyStatementStartDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancyStatement = { ...getState().app.tenancies.tenancyStatement };
    const date = moment(Date.parse(event));
    tenancyStatement.start_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY_STATEMENT, payload: tenancyStatement });
  };
};
export const handleTenancyStatementEndtDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancyStatement = { ...getState().app.tenancies.tenancyStatement };
    const date = moment(Date.parse(event));
    tenancyStatement.end_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY_STATEMENT, payload: tenancyStatement });
  };
};
export const handleTenancyStatementSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.tenancies };
  const tenancyStatement = { ...state.tenancyStatement };
  tenancyStatement.tenancy_id = state.tenancy.id;
  dispatch({ type: SET_TENANCY_STATEMENT_CREATE, promise: tenancyStatementCreate(tenancyStatement) });
};
export const deleteTenancyStatement = id => ({ type: SET_TENANCY_STATEMENT_DELETE, promise: tenancyStatementDelete(id) });
export const getTenancyStatementTemplate = () => ({ type: SET_TENANCY_STATEMENT_TEMPLATE, promise: tenancyStatementTemplate() });
export const handleTemplateDownload = (id, filename) => {
  return () => {
    tenancyStatementFile(id).then((response) => {
      console.log(response);
      const { url } = response.data;
      downloadFile(url, filename);
    }).catch(error => toastr.error('Download', error.message));
  };
};
export const handleClose = () => ({ type: SET_HIDE_MODAL });
// TENANCY LANDLORD
export const getTenancyLandlords = () => (dispatch, getState) => {
  const id = getState().app.tenancies.tenancy.id;
  dispatch({ type: SET_TENANCY_LANDLORDS, promise: fetchTenancyLandlord({ tenancy_id: id, page: 1 }) });
};
export const getTenancyLandlordsStandalone = data => (dispatch) => {
  dispatch({ type: SET_TENANCY_LANDLORD, payload: { tenancy_id: data.tenancy_id } });
  dispatch({ type: SET_TENANCY_LANDLORDS, promise: fetchTenancyLandlord(data) });
};

export const handleTenancyLandlordChange = event => (dispatch, getState) => {
  const tenancyLandlord = { ...getState().app.tenancies.tenancyLandlord };
  tenancyLandlord[event.target.name] = event.target.value;
  dispatch({ type: SET_TENANCY_LANDLORD, payload: tenancyLandlord });
};
export const handleTenancyLandlordDateChange = (event) => {
  return (dispatch, getState) => {
    const tenancyLandlord = { ...getState().app.tenancies.tenancyLandlord };
    const date = moment(Date.parse(event));
    tenancyLandlord.date_received = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_TENANCY_LANDLORD, payload: tenancyLandlord });
  };
};
export const handleTenancyLandlordSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.tenancies };
  const tenancyLandlord = { ...state.tenancyLandlord };
  tenancyLandlord.tenancy_id = tenancyLandlord.tenancy_id || (state.tenancy && state.tenancy.id);
  tenancyLandlord.tenancy_rent_due_id = state.tenancyRentDueId;
  if (tenancyLandlord.id) {
    dispatch({ type: SET_TENANCY_LANDLORD_UPDATE, promise: tenancyLandlordUpdate(tenancyLandlord) });
  } else {
    dispatch({ type: SET_TENANCY_LANDLORD_CREATE, promise: tenancyLandlordCreate(tenancyLandlord) });
  }
};
export const handleTenancyLandlordNext = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyId = state.tenancy.id;
  const tenancyLandlords = state.tenancyLandlords ? { ...state.tenancyLandlords } : {};
  const data = {
    tenancy_id: tenancyId,
    tenancy_rent_due_id: state.tenancyRentDueId,
    page: tenancyLandlords.current_page + 1,
  };
  dispatch(getTenancyLandlordsNext(data));
};
export const handleTenancyLandlordPrevious = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyId = state.tenancy.id;
  const tenancyLandlords = state.tenancyLandlords ? { ...state.tenancyLandlords } : {};
  const data = {
    tenancy_id: tenancyId,
    tenancy_rent_due_id: state.tenancyRentDueId,
    page: tenancyLandlords.current_page - 1,
  };
  dispatch(getTenancyLandlordsNext(data));
};
export const clearTenancyLandlord = () => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const tenancyLandlord = {
    tenancy_id: state.tenancyLandlord && state.tenancyLandlord.tenancy_id,
  };
  dispatch({ type: SET_TENANCY_LANDLORD, payload: tenancyLandlord });
};
export const getTenancyLandlordInfo = id => ({ type: SET_TENANCY_LANDLORD, promise: tenancyLandlordInfo(id) });
export const deleteTenancyLandlord = id => ({ type: SET_TENANCY_LANDLORD_DELETE, promise: tenancyLandlordDelete(id) });
export const toggleSearch = () => ({ type: SET_TENANCY_SEARCH_PANEL });
export const addNewContact = event => (dispatch) => {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  dispatch({ type: SET_NEW_CONTACT });
};
export const addNewProperty = event => (dispatch) => {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  dispatch({ type: SET_NEW_PROPERTY });
};
export const quickCreateContact = contact => ({ type: SET_QUICK_CONTACT, promise: createContact(contact) });
export const quickCreateProperty = contact => ({ type: SET_QUICK_PROPERTY, promise: propertyQuickCreate(contact) });
export const getLandlordsDue = data => (dispatch) => {
  const overdue = data.overdue;
  dispatch({ type: SET_TENANCY_OVERDUE, payload: overdue });
  dispatch({ type: SET_TENANCY_LANDLORDS_DUE, promise: fetchTenancyLandlordDue(data) });
};
export const getTenancyClient = data => ({ type: SET_TENANCY_CLIENT_ACCOUNT, promise: fetchTenancyClient(data) });
export const getTenancyAllJobs = data => ({ type: SET_TENANCY_ALL_JOBS, promise: fetchTenancyAllJobs(data) });
export const getFilteredClient = data => ({ type: SET_TENANCY_CLIENT_ACCOUNT, promise: fetchTenancyClient(data) });
export const getTenancyClientOverview = data => ({ type: SET_TENANCY_CLIENT_OVERVIEW, promise: fetchTenancyClientOverview(data) });
export const exportManagementFees = data => () => {
  exportManagementFee(data)
    .then(res => downloadFile(res.url, res.filename));
};
export const exportVats = data => ({ type: 'qq', promise: exportVat(data) });
export const handleEmailChange = event => (dispatch, getState) => {
  const email = { ...getState().app.tenancies.email };
  email[event.target.name] = event.target.value;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const handleEmailCreate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.tenancies;
    const { tenancy } = { ...state };
    const email = state.email ? { ...state.email } : {};
    email.document_id = state.printedDoc && state.printedDoc.id;
    email.tenancy_id = tenancy.id;
    dispatch({ type: SET_EMAIL_CREATE, promise: createEmail(email) });
  };
};
export const handleSignableCreate = (event, recipients) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.tenancies;
    console.log(state);
    const { tenancy } = { ...state };
    const email = state.email ? { ...state.email } : {};
    email.document_id = state.printedDoc && state.printedDoc.id;
    email.tenancy_id = tenancy.id;
    const data = {
      document_id: email.document_id,
      tenancy_id: email.tenancy_id,
      signatures: recipients
    };
    dispatch({ type: SET_EMAIL_CREATE, promise: createSignableEmail(data) });
  };
};
export const handleAttachmentRemove = () => ({ type: SET_PRINTED_DOCUMENT });
export const handleTemplateChange = template => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const email = state.email ? { ...state.email } : {};
  email.subject = template.subject;
  email.message = template.message;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const handleMessageChange = message => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  const email = state.email ? { ...state.email } : {};
  email.message = message;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const fetchTenancies = (page = 1) => {
  return (dispatch, getState) => {
    const searchValues = { ...getState().app.tenancies.searchValues } || {};
    searchValues.page = page;
    dispatch({ type: SET_TENANCIES, promise: fetch(searchValues) });
  };
};
export const handleSearchReset = () => (dispatch) => {
  dispatch({ type: SET_TENANCIES_SEARCH });
  dispatch(fetchTenancies());
};
export const handleSearchChange = (event) => {
  return (dispatch, getState) => {
    const searchValues = { ...getState().app.tenancies.searchValues } || {};
    searchValues[event.target.name] = event.target.value;
    dispatch({ type: SET_TENANCIES_SEARCH, payload: searchValues });
  };
};
export const handleSearchSubmit = (event) => {
  event.preventDefault();
  return dispatch => dispatch(fetchTenancies());
};
export const setDocument = doc => (dispatch, getState) => {
  const state = { ...getState().app.tenancies };
  dispatch({ type: SET_PRINTED_DOCUMENT, payload: doc });
  dispatch({ type: SET_EMAILS, promise: fetchEmails({ tenancy_id: state.tenancy.id }) });
};
export const handleModalClose = () => ({ type: SET_HIDE_MODAL });

export const handleTenancyPaymentsModalClose = () => (dispatch, getState) => {
  const state = getState().app.tenancies;
  dispatch(getTenancyRents({ tenancy_id: (state.tenancy && state.tenancy.id) || 0 }));
  dispatch({ type: SET_HIDE_MODAL });
};

export const handleRentPaymentsModalClose = () => dispatch => dispatch(getTenancyRents({ page: 1, overdue: 1 }));

export const handleTenancyLandlordPaymentModalClose = () => dispatch => dispatch(getLandlordsDue({ page: 1 }));
