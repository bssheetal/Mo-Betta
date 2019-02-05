import React from 'react'
// import ReactDOM from 'react-dom'
import Message from './Message'

// class MessageList extends React.Component {

//     componentWillUpdate() {
//         const node = ReactDOM.findDOMNode(this)
//         this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
//     }

//     componentDidUpdate() {
//         if (this.shouldScrollToBottom) {
//             const node = ReactDOM.findDOMNode(this)
//             node.scrollTop = node.scrollHeight   
//         }
//     }

//     render() {
//         if (!this.props.roomId) {
//             return (
//                 <div className="message-list">
//                     <div className="join-room">
//                         &larr; Join a room!
//                     </div>
//                 </div>
//             )
//         }
//         return (
//             <div className="message-list">
//                 {this.props.messages.map((message, index) => {
//                     return (
//                         <Message key={message.id} username={message.senderId} text={message.text} />
//                     )
//                 })}
//             </div>
//         )
//     }
// }

// export default MessageList



class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {/* Mapping through message data passed via props from <Chat */}
                {this.props.messages.map((message, index) => {
                    return (
                        <div key={index} className="message">
                            <Message key={message.id} username={message.senderId} text={message.text} />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList