import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class MessageList extends React.Component {

    componentWillUpdate() {
        // Grabbing reference to this component on the dom?
        const node = ReactDOM.findDOMNode(this)
        // Setting scroll settings based on incoming message in relation to where user has set the scroll...so as not to scroll the user away from reading messages above when a new message comies in
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }
// Called directly after a component updates (renders) 
    componentDidUpdate() {
        // Auto scrolling to bottom of messages so user sees LIFO for incoming messages if the user isn't too high up
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight   
        }
    }

    render() {
        if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                         Join a room! &rarr;
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message key={message.id} username={message.senderId} text={message.text} />
                    )
                })}
            </div>
        )
    }
}

export default MessageList