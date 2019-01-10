import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Scrollbars } from 'react-custom-scrollbars';

import { setAppointmentEvent } from 'redux/modules/app/diary';
import { setContactEvent } from 'redux/modules/app/contacts';
import { setPropertyEvent } from 'redux/modules/app/properties';
import { setCommonData, setUserData } from 'redux/modules/common';
import 'css/main.scss';
import Header from './Header';

// let src;

class App extends React.Component {
  componentDidMount() {
    if (this.props.location.pathname !== '/billing/error') {
      this.props.dispatch(setCommonData());
      this.props.dispatch(setUserData());
      // const ukey = cookie.load('ukey');
      // const sseUrl = `http://api.juvo.io/activity/listen?ukey=${ukey}`;
      // src = new EventSource(sseUrl);
      // src.onopen = () => {
      //   console.log('Listener attached');
      // };
      // src.onerror = (err) => {
      //   console.log('error', err);
      // };
      // src.addEventListener('property', this.handlePropertyCahnge);
      // src.addEventListener('contact', this.handleContactCahnge);
      // src.addEventListener('appointment', this.handleAppointmentCahnge);
    }
  }

  componentWillUnmount() {
    // src.removeEventListener('property', this.handlePropertyCahnge);
    // src.removeEventListener('contact', this.handleContactCahnge);
    // src.removeEventListener('appointment', this.handleAppointmentCahnge);
  }

  handlePropertyCahnge = (e) => {
    const data = JSON.parse(e.data);
    if (data.status && data.status === 'error' && data.code === '001') {
      localStorage.removeItem('ukey');
      localStorage.removeItem('uid');
      location.replace('/sign-in');
    } else {
      this.props.dispatch(setPropertyEvent(data));
    }
  }

  handleContactCahnge = (e) => {
    const data = JSON.parse(e.data);
    if (data.status && data.status === 'error' && data.code === '001') {
      localStorage.removeItem('ukey');
      localStorage.removeItem('uid');
      location.replace('/sign-in');
    } else {
      this.props.dispatch(setContactEvent(data));
    }
  }

  handleAppointmentCahnge = (e) => {
    const data = JSON.parse(e.data);
    if (data.status && data.status === 'error' && data.code === '001') {
      localStorage.removeItem('ukey');
      localStorage.removeItem('uid');
      location.replace('/sign-in');
    } else {
      this.props.dispatch(setAppointmentEvent(data));
    }
  }

  smoothScrollTo = (to, duration) => {
    if (duration <= 0) {
      this.scrollbars.scrollTop(to);
      return;
    }
    const difference = to - this.scrollbars.getScrollTop();
    const perTick = (difference / duration) * 10;

    setTimeout(() => {
      this.scrollbars.scrollTop(perTick);
      if (this.scrollbars.getScrollTop() === to) return;
      this.smoothScrollTo(to, duration - 10);
    });
  }
  handleScrollTo = (top) => {
    this.smoothScrollTo(top, 500);
  }
  wrapScrollTo = () => React.Children.map(this.props.children, child => React.cloneElement(child, { scrollTo: this.handleScrollTo }));

  /* global VERSION, COMMITHASH */
  render() {
    const { children } = this.props;
    return (
      <div>
        {/*
      <Scrollbars ref={(s) => { this.scrollbars = s; }} autoHide universal style={{ height: '100vh' }}>
      */}
        <Header path={this.props.location.pathname} />
        {this.wrapScrollTo(children)}
        <footer className="version">
          <div>
            {/*
            <div>
              <span>Create by: </span>
              <a href="mailto:aydnep@aydnep.com.ua">Andrii Pindiura</a>
            </div>
            */}
            <p>
              Current release: <a href={`https://github.com/blu-towers/Juvo-Login/commit/${COMMITHASH}`}>#{VERSION}</a>
            </p>
          </div>
        </footer>
        {/*
      </Scrollbars>
      */}
      </div>
    );
  }
}


App.propTypes = {
  children: PropTypes.object
};

export default connect()(App);
