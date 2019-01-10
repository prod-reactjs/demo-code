import React from 'react';
import superagent from 'superagent-defaults';
import url from 'url';
import download from 'downloadjs';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';
import { HelpBlock } from 'react-bootstrap';


const api = localStorage.getItem('API_ENDPOINT');

export const API_ENDPOINT = api || process.env.API_ENDPOINT;

export const momentFormats = {
  'd/m/Y': 'DD/MM/YYYY',
  'm/d/Y': 'MM/DD/YYYY',
  'Y/m/d': 'YYYY/MM/DD',
  'd M Y': 'DD MMMM YYYY',
  'M d Y': 'MMMM DD YYYY',
};


export const objectToArray = (obj) => {
  const tmpObj = { ...obj };
  delete tmpObj.isError;
  const array = [];
  Object.keys(tmpObj).forEach((item) => {
    array.push(tmpObj[item]);
  });
  return array;
};


export const request = superagent();
request.withCredentials();

export const checkStatus = (body) => {
  if (Object.prototype.hasOwnProperty.call(body, 'status')) {
    if (body.status !== 'ok') {
      console.log(body);
      if (body.status === 'error' && body.code === '001') {
        console.log(body.code);
        // location.reload();
        // window.location.replace('/sign-in');
        browserHistory.push('/sign-in');
      } else if (body.status === 'error' && body.code === '002') {
        browserHistory.push('/billing/error');
        // location.replace('/billing/error');
      }
      throw body;
    }
  }

  return body;
};

export const parse = (cb, inj = {}) => (err, res) => cb({ success: !err, body: res ? res.body : {}, ...inj });
export const endpoint = uri => url.resolve(API_ENDPOINT, uri);
export const getRequest = fn => new Promise((resolve, reject) => fn(request)
  .query({ ukey: localStorage.getItem('ukey') })
  .end((err, res = {}) => {
    if (err) {
      reject(err);
    } else {
      resolve({ ...res.body || {} });
    }
  }));

export const buildUrl = (template, params) => template.split('/').map((part) => {
  return part.indexOf(':') !== -1 ? (params[part.replace(':', '')] || '') : part;
}).filter(e => !!e).join('/');

export const downloadFile = (fileUrl, filename = fileUrl.match(/.*\/(.+?)\./)[1]) => {
  console.log(fileUrl, filename);
  toastr.info('Downloading', `Start downloading ${filename}`);
  const xhr = new XMLHttpRequest();
  xhr.open('GET', fileUrl, true);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    console.log('file loaded');
    download(xhr.response, filename);
    toastr.clean();
    toastr.success('Download', `${filename} download complete`);
  };
  xhr.send();
};

export const toCurrency = (value, currency) => `${currency}${parseFloat(value).toFixed(2)}`;

export const typeaheadFilterBy = option => option;

export const getValidationStatus = (error, name) => {
  // if (Object.keys(data).length > 0) {
  //   const number = parseFloat(data[name]);
  //   if (data[name]) {
  //     if (isNaN(number) || number) {
  //       return 'success';
  //     }
  //     if (error) {
  //       return 'error';
  //     }
  //     return 'warning';
  //   }
  //   if (error) {
  //     const { errors = {} } = error;
  //     if (Object.prototype.hasOwnProperty.call(errors, name)) {
  //       return 'error';
  //     }
  //   }
  //   return 'warning';
  // }
  if (error) {
    const { errors = {} } = error;
    if (Object.prototype.hasOwnProperty.call(errors, name)) {
      return 'error';
    }
  }
  return null;
};

export const renderHelpBlock = (error, name) => {
  if (error) {
    const { errors = {} } = error;
    if (Object.prototype.hasOwnProperty.call(errors, name)) {
      return <HelpBlock>{errors[name]}</HelpBlock>;
    }
  }
  return null;
};
