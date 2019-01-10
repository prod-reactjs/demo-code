import React from 'react';
import { Panel } from 'react-bootstrap';

export default class CollapsiblePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.default !== undefined ? this.props.default : true,
    };
  }
  toggleOpen = () => {
    if (this.props.callback) {
      this.props.callback(this.props.id);
    } else {
      this.setState({ open: !this.state.open });
    }
  }
  expand = () => {
    this.setState({ open: true });
  }
  collapse = () => {
    this.setState({ open: false });
  }
  render() {
    const hidden = this.props.hidden ? { display: 'none'} : {};
    const open = this.props.open === undefined ? this.state.open : this.props.open;
    return (
      <section className="collapsiblePanel" id={this.props.id} style={hidden}>
        <h3 onClick={this.toggleOpen}>
          {this.props.title}
          <button onClick={this.toggleOpen}>
            <i className={`fa fa-${open ? 'minus' : 'plus'}`} />
          </button>
        </h3>
        <Panel collapsible expanded={open} className={this.props.className} >
          {this.props.children}
        </Panel>
      </section>
    );
  }
}

CollapsiblePanel.propTypes = {
  id: React.PropTypes.string,
  default: React.PropTypes.bool,
  title: React.PropTypes.string,
  className: React.PropTypes.string,
  open: React.PropTypes.bool,
  callback: React.PropTypes.func,
  hidden: React.PropTypes.bool,
};
