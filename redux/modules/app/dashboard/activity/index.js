import { momentFormats } from 'common/utils';
import { getActivity } from './requests';
import { SET_USER_DATA } from '../../../common';

const SET_ACTIVITY = 'juvo/app/dashboard/activity/SET_ACTIVITY';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';


export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_ACTIVITY}${REQUEST}`: {
      return { ...state, loading: true };
    }
    case `${SET_ACTIVITY}${FAILURE}`: {
      return { ...state, loading: false };
    }
    case `${SET_ACTIVITY}${SUCCESS}`: {
      return { ...state, data: action.res.data, loading: false };
    }
    case `${SET_USER_DATA}${SUCCESS}`: {
      const { date_display_format } = action.res.data;
      const dateDisplayFormat = momentFormats[date_display_format];
      return {
        ...state,
        user: {
          dateDisplayFormat,
        }
      };
    }
    default: return state;
  }
};

export const fetchActivity = () => ({ type: SET_ACTIVITY, promise: getActivity() });

