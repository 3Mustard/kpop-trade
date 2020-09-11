// form for sending a message from trades component

import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class QuickReplyModal extends Component {
  state = {
    content: ''
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form>
        <Form.TextArea onChange={this.handleChange} name='content' value={this.state.content} label='Reply' placeholder='Reply to poster...' />
        <Form.Button onClick={handleSubmit}>Send</Form.Button>
      </Form>
    )
  }
}

export default QuickReplyModal;
