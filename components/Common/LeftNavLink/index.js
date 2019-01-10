import React from 'react';

export default class LeftNavLink extends React.Component {
  handleClick = () => {
    console.log(this.props.element);
    console.log(this.props);
    this.props.scrollTo(this.props.element, this.props.title);
  }
  render() {
    return (
      <li onClick={this.handleClick} className={this.props.active ? 'activeNavLink' : ''}>{this.props.title}</li>
    );
  }
}

LeftNavLink.propTypes = {
  scrollTo: React.PropTypes.func.isRequired,
  element: React.PropTypes.object,
  title: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
};
