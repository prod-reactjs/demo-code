import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH_ACTIVITIES = '/activity/fetch';

export const getActivity = () => getRequest(request => request.get(`${endpoint(URL_FETCH_ACTIVITIES)}`)).then(checkStatus);

export const fake = 'fake';
