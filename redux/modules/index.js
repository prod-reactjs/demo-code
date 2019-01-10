import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

import auth from './auth';
import activity from './app/dashboard/activity';
import appointments from './app/dashboard/appointments';
import managements from './app/dashboard/managements';
import notes from './app/dashboard/notes';
import rss from './app/dashboard/rss';
import todos from './app/dashboard/todos';
import contacts from './app/contacts';
import diary from './app/diary';
import documents from './app/documents';
import offers from './app/offers';
import plugins from './app/plugins';
import properties from './app/properties';
import support from './support';
import tenancies from './app/tenancies';
import billing from './billing';
import common from './common';
import user from './user';
import settings from './app/system/settings';
import emailtemplates from './app/system/emailtemplates';
import templates from './app/system/templates';
import appointmentTypes from './app/system/options/appointments';
import noteTypes from './app/system/options/notes';
import propertyTypes from './app/system/options/properties';
import clientSource from './app/system/options/sources';
import mobileCountries from './app/system/options/countries';
import locations from './app/system/options/locations';
import emailsms from './emailsms';

const rootReducer = combineReducers({
  auth,
  app: combineReducers({
    contacts,
    dashboard: combineReducers({
      activity,
      appointments,
      managements,
      notes,
      rss,
      todos,
    }),
    diary,
    documents,
    offers,
    plugins,
    properties,
    system: combineReducers({
      settings,
      emailtemplates,
      templates,
      options: combineReducers({
        appointments: appointmentTypes,
        notes: noteTypes,
        properties: propertyTypes,
        sources: clientSource,
        countries: mobileCountries,
        locations,
      }),
    }),
    tenancies,
  }),
  billing,
  common,
  emailsms,
  support,
  user,
  routing,
  toastr: toastrReducer,
});

export default rootReducer;
