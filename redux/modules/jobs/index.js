export const JOB_STATUS_IN_PROGRESS = 'juvo/jobs/JOB_STATUS_IN_PROGRESS';
export const JOB_STATUS_DONE = 'juvo/jobs/JOB_STATUS_DONE';
export const JOB_STATUS_REJECTED = 'juvo/jobs/JOB_STATUS_REJECTED';
const ACTION_JOB_START = 'juvo/jobs/ACTION_JOB_START';
const ACTION_JOB_SET_STATUS = 'juvo/jobs/ACTION_JOB_SET_STATUS';
const ACTION_JOB_MODIFY = 'juvo/jobs/ACTION_JOB_MODIFY';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_JOB_MODIFY: {
      return { ...state, data: action.payload };
    }
    case ACTION_JOB_SET_STATUS: {
      return { ...state, data: action.payload };
    }
    case ACTION_JOB_START: {
      return { ...state, data: action.payload };
    }
    default: return state;
  }
};
