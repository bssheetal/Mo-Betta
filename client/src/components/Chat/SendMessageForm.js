import React from 'react'

class SendMessageForm extends React.Component {

    constructor() {
        super()
        this.state = {
            message: ''
        }
        // Bindig this to to the methods below -> this class
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            // event.target.value grabs the keystrokes from the input box setting it to state.message
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        // Storing message in state using sendMessage method from Chat (data is flowing from child to parent.   ?)
        this.props.sendMessage(this.state.message)
        // Clearing the message field after submit
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <form
                // onSubmit listener firing handleSubmit
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                // Disabling text input when not in a room
                    disabled={this.props.disabled}
                    // Listening for changes to the input field and fire handleChange
                    onChange={this.handleChange}
                    // Setting the value of the input box to the value in state to update in UI...Controlled component
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm