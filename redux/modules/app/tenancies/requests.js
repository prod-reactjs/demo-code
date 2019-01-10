import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH = '/tenancy/fetch';
const URL_TENANCY_INFO = '/tenancy/info';
const URL_TENANCY_CREATE = '/tenancy/create';
const URL_TENANCY_UPDATE = '/tenancy/update';
const URL_TENANCY_DELETE = '/tenancy/delete';
const URL_PEOPLE_AUTOCOMPLETE = '/autocomplete/contact';
const URL_PROPERTY_AUTOCOMPLETE = '/autocomplete/property';
const URL_FETCH_NOTES = '/note/fetch';
const URL_FETCH_NOTECATEGORIES = '/note/category_array';
const URL_CREATE_NOTE = '/note/create';
const URL_DELETE_NOTE = '/note/delete';
const URL_PRINT_TEMPLATE = '/print/tenancy';
const URL_DOCUMENTSIGN = '/document/sign';
export const URL_AWS_DOCUMENTS = 'https://doc-juvo.s3-eu-west-1.amazonaws.com/';
const URL_CREATEDOCUMENT = '/document/create';
const URL_FETCH_ACTIVITY = '/activity/tenancy';
const URL_GET_DOCUMENT = '/document/get_file';
const URL_DELETE_DOCUMENT = '/document/delete';
const URL_TENANCY_JOB_FETCH = '/tenancy_job/fetch';
const URL_TENANCY_JOB_INFO = '/tenancy_job/info';
const URL_TENANCY_JOB_CREATE = '/tenancy_job/create';
const URL_TENANCY_JOB_UPDATE = '/tenancy_job/update';
const URL_TENANCY_JOB_DELETE = '/tenancy_job/delete';
const URL_TENANCY_DISBURSEMENT_FETCH = '/tenancy_disbursement/fetch';
const URL_TENANCY_DISBURSEMENT_INFO = '/tenancy_disbursement/info';
const URL_TENANCY_DISBURSEMENT_CREATE = '/tenancy_disbursement/create';
const URL_TENANCY_DISBURSEMENT_UPDATE = '/tenancy_disbursement/update';
const URL_TENANCY_DISBURSEMENT_DELETE = '/tenancy_disbursement/delete';
const URL_TENANCY_RENT_FETCH = '/tenancy_rent/fetch';
const URL_TENANCY_RENT_GENERATE = '/tenancy_rent/generate';
const URL_TENANCY_RENT_INFO = '/tenancy_rent/info';
const URL_TENANCY_RENT_CREATE = '/tenancy_rent/create';
const URL_TENANCY_RENT_UPDATE = '/tenancy_rent/update';
const URL_TENANCY_RENT_DELETE = '/tenancy_rent/delete';
const URL_TENANCY_PAYMENTS_FETCH = '/tenancy_rent_payment/fetch';
const URL_TENANCY_PAYMENT_CREATE = '/tenancy_rent_payment/create';
const URL_TENANCY_PAYMENT_UPDATE = '/tenancy_rent_payment/update';
const URL_TENANCY_PAYMENT_INFO = '/tenancy_rent_payment/info';
const URL_TENANCY_PAYMENT_DELETE = '/tenancy_rent_payment/delete';
const URL_TENANCY_RENT_CONFIRM = '/tenancy_rent/confirm';
const URL_TENANCY_RENT_UNCONFIRM = '/tenancy_rent/unconfirm';
const URL_TENANCY_ACCOUNT_FETCH = '/tenancy_account/fetch';
const URL_TENANCY_ACCOUNT_OVERVIEW = '/tenancy_account/overview';
const URL_TENANCY_ACCOUNT_INFO = '/tenancy_account/info';
const URL_TENANCY_ACCOUNT_CREATE = '/tenancy_account/create';
const URL_TENANCY_ACCOUNT_UPDATE = '/tenancy_account/update';
const URL_TENANCY_ACCOUNT_DELETE = '/tenancy_account/delete';
const URL_TENANCY_STATEMENT_FETCH = '/tenancy_statement/fetch';
const URL_TENANCY_STATEMENT_FILE = '/tenancy_statement/get_file';
const URL_TENANCY_STATEMENT_INFO = '/tenancy_statement/info';
const URL_TENANCY_STATEMENT_CREATE = '/tenancy_statement/create';
const URL_TENANCY_STATEMENT_TEMPLATE = '/tenancy_statement/template';
const URL_TENANCY_STATEMENT_DELETE = '/tenancy_statement/delete';
const URL_TENANCY_LANDLORD_FETCH = '/tenancy_rent_payment_landlord/fetch';
const URL_TENANCY_LANDLORD_INFO = '/tenancy_rent_payment_landlord/info';
const URL_TENANCY_LANDLORD_CREATE = '/tenancy_rent_payment_landlord/create';
const URL_TENANCY_LANDLORD_UPDATE = '/tenancy_rent_payment_landlord/update';
const URL_TENANCY_LANDLORD_DELETE = '/tenancy_rent_payment_landlord/delete';
const URL_PROPERTY_QUICK = 'property/quick';
const URL_TENANCY_LANDLORD_DUE_FETCH = '/tenancy_rent_landlord/fetch';
const URL_TENANCY_CLIENT_ACCOUNT_FETCH = '/tenancy_account/fetch';
const URL_TENANCY_ALL_JOBS_FETCH = '/tenancy_job/fetch';
const URL_TENANCY_CLIENT_ACCOUNT_OVERVIEW = '/tenancy_account/overview';
const URL_TENANCY_CLIENT_ACCOUNT_MANAGEMENT_EXPORT = '/tenancy_account/export';
const URL_TENANCY_CLIENT_ACCOUNT_VAT_EXPORT = '/tenancy_account/vat_export';
const URL_FETCH_EMAILS = '/email/fetch';

export const fetch = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH)}`)
    .send(data)
).then(checkStatus);
export const tenancyInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_INFO)}`)
    .query({ id })
).then(checkStatus);
export const tenancyCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_CREATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_DELETE)}`)
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
export const getTenancyNotes = data => getRequest(
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
export const deleteDocument = id => getRequest(
    request => request
      .post(`${endpoint(URL_DELETE_DOCUMENT)}`)
      .query({ id }))
      .then(checkStatus);
export const fetchTenancyActivity = id => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_ACTIVITY)}`)
    .query({ id }))
  .then(checkStatus);
export const downloadDocument = id => getRequest(
  request => request
    .post(`${endpoint(URL_GET_DOCUMENT)}`)
    .query({ id })
).then(checkStatus);
export const fetchTenancyJobs = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_JOB_FETCH)}`)
    .send(data)
).then(checkStatus);
export const tenancyJobInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_JOB_INFO)}`)
    .query({ id })
).then(checkStatus);
export const tenancyJobCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_JOB_CREATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyJobUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_JOB_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyJobDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_JOB_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const fetchDisbursments = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_DISBURSEMENT_FETCH)}`)
    .send(data)
).then(checkStatus);
export const disbursementInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_DISBURSEMENT_INFO)}`)
    .query({ id })
).then(checkStatus);
export const disbursementCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_DISBURSEMENT_CREATE)}`)
    .send(data)
).then(checkStatus);
export const disbursementUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_DISBURSEMENT_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const disbursementDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_DISBURSEMENT_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const fetchTenancyRents = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_RENT_FETCH)}`)
    .send(data)
).then(checkStatus);
export const fetchTenancyPaymentsNext = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_PAYMENTS_FETCH)}`)
    .send(data)
).then(checkStatus);
export const tenancyRentGenerate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_RENT_GENERATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyRentInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_RENT_INFO)}`)
    .query({ id })
).then(checkStatus);
export const tenancyRentCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_RENT_CREATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyRentUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_RENT_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyRentDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_RENT_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const fetchTenancyPayments = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_PAYMENTS_FETCH)}`)
    .send(data)
).then(checkStatus);
export const tenancyPaymentCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_PAYMENT_CREATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyPaymentUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_PAYMENT_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyPaymentInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_PAYMENT_INFO)}`)
    .query({ id })
).then(checkStatus);
export const tenancyPaymentDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_PAYMENT_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const tenancyRentConfirm = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_RENT_CONFIRM)}`)
    .query({ id })
).then(checkStatus);
export const tenancyRentUnconfirm = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_RENT_UNCONFIRM)}`)
    .query({ id })
).then(checkStatus);
export const fetchTenancyAccounts = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_ACCOUNT_FETCH)}`)
    .send(data)
).then(checkStatus);
export const tenancyAccountOverview = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_ACCOUNT_OVERVIEW)}`)
    .query({ id })
).then(checkStatus);
export const tenancyAccountInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_ACCOUNT_INFO)}`)
    .query({ id })
).then(checkStatus);
export const tenancyAccountCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_ACCOUNT_CREATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyAccountUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_ACCOUNT_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyAccountDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_ACCOUNT_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const fetchTenancyStatements = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_STATEMENT_FETCH)}`)
    .send(data)
).then(checkStatus);
export const tenancyStatementFile = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_STATEMENT_FILE)}`)
    .query({ id })
).then(checkStatus);
export const tenancyStatementInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_STATEMENT_INFO)}`)
    .query({ id })
).then(checkStatus);
export const tenancyStatementCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_STATEMENT_CREATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyStatementTemplate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_STATEMENT_TEMPLATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyStatementDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_STATEMENT_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const fetchTenancyLandlord = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_LANDLORD_FETCH)}`)
    .send(data)
).then(checkStatus);
export const tenancyLandlordInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_LANDLORD_INFO)}`)
    .query({ id })
).then(checkStatus);
export const tenancyLandlordCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_LANDLORD_CREATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyLandlordUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_LANDLORD_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const tenancyLandlordDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_LANDLORD_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const propertyQuickCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PROPERTY_QUICK)}`)
    .send(data)
  ).then(checkStatus);
export const fetchTenancyLandlordDue = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_LANDLORD_DUE_FETCH)}`)
    .send(data)
).then(checkStatus);
export const fetchTenancyClient = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_CLIENT_ACCOUNT_FETCH)}`)
    .send(data)
).then(checkStatus);
export const fetchTenancyAllJobs = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_ALL_JOBS_FETCH)}`)
    .send(data)
).then(checkStatus);
export const fetchTenancyClientOverview = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_CLIENT_ACCOUNT_OVERVIEW)}`)
    .send(data)
).then(checkStatus);
export const exportManagementFee = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_CLIENT_ACCOUNT_MANAGEMENT_EXPORT)}`)
    .send(data)
).then(checkStatus);
export const exportVat = data => getRequest(
  request => request
    .post(`${endpoint(URL_TENANCY_CLIENT_ACCOUNT_VAT_EXPORT)}`)
    .send(data)
).then(checkStatus);
export const fetchEmails = data => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_EMAILS)}`)
      .send(data))
      .then(checkStatus);
