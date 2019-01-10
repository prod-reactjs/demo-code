import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_PLUGINS = '/plugin/fetch';
const URL_PLUGIN_UPDATE = '/plugin_%name%/send';
const URL_PLUGIN_REMOVE = '/plugin_%name%/remove';
const URL_MAILCHIMP_API_KEY = '/%name%/api_key';
const URL_PLUGIN_INFO = '/plugin/info';
const URL_BANK_PLUGIN_INFO = '/plugin_bank/callback';
const URL_FETCH_ACCOUNT_LIST = '/plugin_bank/fetch_accounts_list';
const URL_PLUGIN_UPDATE_BANK = '/plugin_bank/update_bank';


export const fetchPlugins = () => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_PLUGINS)}`)
).then(checkStatus);

export const toggle = api => getRequest(
  request => request
    .get(`${api}`)
).then(checkStatus);

export const updatePlugin = (plugin, id) => getRequest(
  request => request
    .get(`${endpoint(URL_PLUGIN_UPDATE.replace('%name%', plugin))}`)
    .query({ id }))
    .then(checkStatus);

export const removePlugin = (plugin, id) => getRequest(
  request => request
    .get(`${endpoint(URL_PLUGIN_REMOVE.replace('%name%', plugin))}`)
    .query({ id }))
    .then(checkStatus);

export const mailchimpAPIKey = plugin => getRequest(
  request => request
    .post(`${endpoint(URL_MAILCHIMP_API_KEY.replace('%name%', plugin.url.toLowerCase()))}`)
    .send({ api_key: plugin.api_key }))
  .then(checkStatus);

export const getPluginInfo = id => getRequest(
  request => request
    .get(`${endpoint(URL_PLUGIN_INFO)}`)
    .query({ id })
).then(checkStatus);

export const getBankPluginInfo = (code, state) => getRequest(
  request => request
    .get(`${endpoint(URL_BANK_PLUGIN_INFO)}`)
    .query({ code, state })
).then(checkStatus);

export const fetchAccountList = () => getRequest(
  request => request
    .get(`${endpoint(URL_FETCH_ACCOUNT_LIST)}`)
    // .query({ code, state })
).then(checkStatus);

export const updateBank = data => getRequest(
  request => request
    .post(`${endpoint(URL_PLUGIN_UPDATE_BANK)}`)
    .send(data))
    .then(checkStatus);
