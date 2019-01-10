import React from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { Editor, EditorState, RichUtils } from 'draft-js';
import BlockStyleControls from 'components/Common/Draft/BlockStyleControls';
import InlineStyleControls from 'components/Common/Draft/InlineStyleControls';
import { getValidationStatus } from 'common/utils';
import { fetchEmailAutoComplete } from 'redux/modules/common/requests';
import Email from './Email';
import NoDataFound from '../NoDataFound';

class Emails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template: null,
      message: EditorState.createEmpty(),
    };
    fetchEmailAutoComplete()
      .then(({ data }) => this.setState({ emailTemplates: data }));
  }

  componentWillReceiveProps(props) {
    if (this.props.email && this.props.email.message && props.email && props.email.message === undefined) {
      this.setState({ message: EditorState.createEmpty() });
    }
  }

  handleTemplateChange = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.value, 10);
    this.setState({ template: id });
    const emailTemplate = [...this.state.emailTemplates].find(item => item.id === id);
    const message = emailTemplate && emailTemplate.message ? EditorState.createWithContent(stateFromHTML(emailTemplate.message)) : EditorState.createEmpty();
    this.setState({ message });
    this.props.handleTemplateChange(emailTemplate);
  }
  messageChange = (e) => {
    const mesg = e;
    const raw = mesg.getCurrentContent();
    const message = stateToHTML(raw);
    this.setState({ message: e });
    this.props.handleMessageChange(message);
  }

  toggleInlineStyle = inlineStyle => this.setState({ message: RichUtils.toggleInlineStyle(this.state.message, inlineStyle) })

  toggleBlockType = blockType => this.setState({ message: RichUtils.toggleBlockType(this.state.message, blockType) })

  handleSubmit = (e) => {
    const email = this.props.email ? { ...this.props.email } : {};
    const message = this.state.message;
    const raw = message.getCurrentContent();
    email.message = stateToHTML(raw);
    this.props.handleEmailCreate(e);
    console.log(email);
    console.log('in email handlesubmit', email, message, raw);
  }

  render() {
    const {
      user,
      emails,
      email = {},
      handleEmailCreate,
      handleEmailChange,
      error,
      printedDoc = {},
      handleAttachmentRemove,
      loading,
    } = this.props;
    const { emailTemplates, template, message } = this.state;
    const modalBorder = {
      border: 0,
    };
    const tableHeaderStyle = {
      borderBottom: '1px solid',
    };
    return (
      <div className="properties-page create">
        <div className="panel-body" style={modalBorder}>
          {handleEmailCreate && (
          <Row>
            <form onSubmit={this.handleSubmit}>
              {emailTemplates ? (
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={2}>
                        Template
                      </Col>
                  <Col sm={10}>
                    <FormControl
                          componentClass="select"
                          name="template_id"
                          value={template || ''}
                          onChange={this.handleTemplateChange}
                        >
                      <option value="" disabled>Select template</option>
                      {emailTemplates && emailTemplates.map(item => (
                        <option key={item.id} value={item.id}>{item.subject}</option>
                          ))}
                    </FormControl>
                  </Col>
                </FormGroup>
                  ) : null}
              <FormGroup validationState={getValidationStatus(error, 'to', email)}>
                <Col componentClass={ControlLabel} sm={2}>
                      To
                </Col>
                <Col sm={10}>
                  <FormControl
                        value={email.to || ''}
                        name="to"
                        type="email"
                        onChange={handleEmailChange}
                      />
                </Col>
              </FormGroup>
              <FormGroup validationState={getValidationStatus(error, 'subject', email)}>
                <Col componentClass={ControlLabel} sm={2}>
                      Subject
                  </Col>
                <Col sm={10}>
                  <FormControl
                        value={email.subject || ''}
                        componentClass="input"
                        name="subject"
                        onChange={handleEmailChange}
                      />
                </Col>
              </FormGroup>
              <FormGroup validationState={getValidationStatus(error, 'message', email)}>
                <Col componentClass={ControlLabel} sm={2}>
                      Message
                    </Col>
                <Col sm={10}>
                  <div className="RichEditor-root" onFocus={this.userFocus}>
                    <BlockStyleControls className="upper-control" editorState={message} onToggle={this.toggleBlockType} />
                    <InlineStyleControls editorState={message} onToggle={this.toggleInlineStyle} />
                    <Editor
                          editorState={message}
                          onChange={this.messageChange}
                          ref={(e) => { this.editor = e; }}
                        />
                  </div>
                </Col>
              </FormGroup>
              {printedDoc && printedDoc.id ? (
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={2}>
                        Attachment
                      </Col>
                  <Col sm={9}><span>{printedDoc.filename}</span></Col>
                  <Col sm={1}>
                    <Glyphicon glyph="remove-circle" onClick={handleAttachmentRemove} />
                  </Col>
                </FormGroup>
                  ) : null}
              <Col sm={12}>
                <Button
                      bsStyle="primary"
                      type="submit"
                      disabled={loading && loading.email}
                      className="pull-right"
                    >
                  {loading && loading.email && <i className="fa fa-circle-o-notch fa-spin" />} Send
                    </Button>
              </Col>
            </form>
          </Row>
            )}
          <Row className="table-header" style={tableHeaderStyle}>
            <Col sm={4} className="column">
                Created
          </Col>
            <Col sm={8} className="column">
                Subject (click for details)
          </Col>
          </Row>
          {!emails || emails.length === 0 ? <NoDataFound /> :
              emails.map(emailItem => (
                <Email key={emailItem.id} user={user} email={emailItem} />
              )
              )}
        </div>
      </div>

    );
  }
}

Emails.propTypes = {
  user: React.PropTypes.object,
  emails: React.PropTypes.array,
  email: React.PropTypes.object,
  handleEmailCreate: React.PropTypes.func,
  handleEmailChange: React.PropTypes.func,
  handleTemplateChange: React.PropTypes.func,
  handleMessageChange: React.PropTypes.func
};

export default Emails;
