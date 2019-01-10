import url from 'url';
import { API_ENDPOINT } from 'common/utils';
import { fetchPlugins, toggle, updatePlugin, removePlugin, mailchimpAPIKey, getPluginInfo, getBankPluginInfo, fetchAccountList, updateBank } from './requests';

const SET_PLUGINS = 'juvo/app/plugins/SET_PLUGINS';
const SET_PLUGIN_TOGGLE = 'juvo/app/plugins/SET_PLUGIN_TOGGLE';
const SET_CLEAR_PLUGINS = 'juvo/app/plugins/SET_CLEAR_PLUGINS';
const SET_PLUGIN = 'juvo/app/plugins/SET_PLUGIN';
const SET_BANK_PLUGIN = 'juvo/app/plugins/SET_BANK_PLUGIN';
const SET_ACCOUNT_LIST = 'juvo/app/plugins/SET_ACCOUNT_LIST';
const SET_UPDATE_BANK = 'juvo/app/plugins/SET_UPDATE_BANK';
export const SET_PLUGIN_UPDATE = 'juvo/app/plugins/SET_PLUGIN_UPDATE';
export const SET_PLUGIN_REMOVE = 'juvo/app/plugins/SET_PLUGIN_REMOVE';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

const truelayerUrl = 'https://auth.truelayer.com/?response_type=code&client_id=juvo-0ya9&nonce=3024624487&scope=info%20accounts%20balance%20transactions%20cards%20offline_access&redirect_uri=https://login.juvo.io/plugin_bank&enable_mock=true';

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_BANK_PLUGIN}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_BANK_PLUGIN}${SUCCESS}`: {
      return { ...state, status: action.res.data };
    }
    case `${SET_BANK_PLUGIN}${FAILURE}`: {
      return { ...state, loading: false };
    }
    case `${SET_ACCOUNT_LIST}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_ACCOUNT_LIST}${SUCCESS}`: {
      return { ...state, accounts: action.res.data, loading: false };
    }
    case `${SET_ACCOUNT_LIST}${FAILURE}`: {
      return { ...state, accounts: [], loading: false };
    }
    case `${SET_UPDATE_BANK}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_UPDATE_BANK}${SUCCESS}`: {
      return { ...state, status: action.res.data, loading: false };
    }
    case `${SET_UPDATE_BANK}${FAILURE}`: {
      return { ...state, loading: false };
    }
    case `${SET_PLUGINS}${SUCCESS}`: {
      return { ...state, plugins: action.res.data };
    }
    case `${SET_PLUGIN_TOGGLE}${SUCCESS}`: {
      const plugin = action.res.data;
      if (plugin.name === 'Bank Integration' && plugin.status === 1) {
        window.location = truelayerUrl + '&state=' + plugin.pass_key;
      }
      const plugins = [...state.plugins].map(item => (item.id === plugin.id ? plugin : item));
      return { ...state, plugins };
    }
    case SET_CLEAR_PLUGINS: {
      return { ...state, plugins: [] };
    }
    case `${SET_PLUGIN}${SUCCESS}`: {
      return { ...state, plugin: action.res.data };
    }
    default: return state;
  }
};

export const getPlugins = () => ({ type: SET_PLUGINS, promise: fetchPlugins() });
export const togglePlugin = (plugin) => {
  const api = url.resolve(API_ENDPOINT, `${plugin.url}/${plugin.status === 0 ? 'activate' : 'deactivate'}`);
  return {
    type: SET_PLUGIN_TOGGLE,
    promise: toggle(api),
  };
};
export const pluginUpdate = (plugin, property) => ({ type: SET_PLUGIN_UPDATE, promise: updatePlugin(plugin, property) });
export const pluginRemove = (plugin, property) => ({ type: SET_PLUGIN_REMOVE, promise: removePlugin(plugin, property) });
export const setAPIKey = plugin => (dispatch) => {
  const api = url.resolve(API_ENDPOINT, `${plugin.url}/${plugin.status === 0 ? 'activate' : 'deactivate'}`);
  if (plugin.updateClick) {
    mailchimpAPIKey(plugin);
  } else {
    toggle(api)
    .then((res) => {
      dispatch({ type: `${SET_PLUGIN_TOGGLE}${SUCCESS}`, res });
      if (!plugin.status) {
        mailchimpAPIKey(plugin);
      }
    });
  }
};
export const clearPlugins = () => ({ type: SET_CLEAR_PLUGINS });
export const setPluginInfo = id => ({ type: SET_PLUGIN, promise: getPluginInfo(id) });
export const setBankPlugin = (code, state) => ({ type: SET_BANK_PLUGIN, promise: getBankPluginInfo(code, state) });
export const setAccountList = () => ({ type: SET_ACCOUNT_LIST, promise: fetchAccountList() });
export const pluginUpdateBank = data => ({ type: SET_UPDATE_BANK, promise: updateBank(data) });
