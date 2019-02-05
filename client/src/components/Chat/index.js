// import React from 'react'
// import Chatkit from '@pusher/chatkit'
// import MessageList from './MessageList'
// import SendMessageForm from './SendMessageForm'
// import RoomList from './RoomList'
// import NewRoomForm from './NewRoomForm'
// import { tokenUrl, instanceLocator } from './config'
// import './style.css'

// class Chat extends React.Component {

//     constructor() {
//         super()
//         this.state = {
//             roomId: null,
//             messages: [],
//             joinableRooms: [],
//             joinedRooms: []
//         }
//         this.sendMessage = this.sendMessage.bind(this)
//         this.subscribeToRoom = this.subscribeToRoom.bind(this)
//         this.getRooms = this.getRooms.bind(this)
//         this.createRoom = this.createRoom.bind(this)
//     } 

//     componentDidMount() {
//         const chatManager = new Chatkit.ChatManager({
//             instanceLocator,
//             userId: 'perborgen',
//             tokenProvider: new Chatkit.TokenProvider({
//                 url: tokenUrl
//             })
//         })

//         chatManager.connect()
//         .then(currentUser => {
//             this.currentUser = currentUser
//             this.getRooms()
//         })
//         .catch(err => console.log('error on connecting: ', err))
//     }

//     getRooms() {
//         this.currentUser.getJoinableRooms()
//         .then(joinableRooms => {
//             this.setState({
//                 joinableRooms,
//                 joinedRooms: this.currentUser.rooms
//             })
//         })
//         .catch(err => console.log('error on joinableRooms: ', err))
//     }

//     subscribeToRoom(roomId) {
//         this.setState({ messages: [] })
//         this.currentUser.subscribeToRoom({
//             roomId: roomId,
//             hooks: {
//                 onNewMessage: message => {
//                     this.setState({
//                         messages: [...this.state.messages, message]
//                     })
//                 }
//             }
//         })
//         .then(room => {
//             this.setState({
//                 roomId: room.id
//             })
//             this.getRooms()
//         })
//         .catch(err => console.log('error on subscribing to room: ', err))
//     }

//     sendMessage(text) {
//         this.currentUser.sendMessage({
//             text,
//             roomId: this.state.roomId
//         })
//     }

//     createRoom(name) {
//         this.currentUser.createRoom({
//             name
//         })
//         .then(room => this.subscribeToRoom(room.id))
//         .catch(err => console.log('error with createRoom: ', err))
//     }

//     render() {
//         return (
//             <div className="app">
//                 <RoomList
//                     subscribeToRoom={this.subscribeToRoom}
//                     rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
//                     roomId={this.state.roomId} 
//                     />
//                 <MessageList 
//                     roomId={this.state.roomId}
//                     messages={this.state.messages} 
//                     />
//                 <SendMessageForm
//                     disabled={!this.state.roomId}
//                     sendMessage={this.sendMessage} 
//                     />
//                 <NewRoomForm 
//                 createRoom={this.createRoom} 
//                 />
//             </div>
//         );
//     }
// }

// export default Chat



import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
import NewRoomForm from './NewRoomForm'
import { tokenUrl, instanceLocator } from './config'
import './style.css'

class Chat extends React.Component {

    constructor() {
        super()
        this.state = {
            // messages array data coming from Chatkit
            messages: []
        }
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: 'Iris',
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })
        // Connecting to ChatKit and listening for/retrieving new messages 
        chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser
                this.currentUser.subscribeToRoom({
                    roomId: 19386938,
                    hooks: {
                        onNewMessage: message => {
                            console.log('message.text: ', message.text);
                            // setting new messages in state by adding them to the messages array (via spread operator...redefining array into new copy...replacing originl messages [] with new one []
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        }
                    }
                })
            })
    }

    sendMessage() {
        this.currentUser.sendMessage()
    }

    render() {
        console.log('this.state.messages:', this.state.messages);
        return (
            <div className="app">
                <RoomList />
                {/* Sending messages data as props to <MessageList */}
                <MessageList messages={this.state.messages} />
                <SendMessageForm />
                <NewRoomForm />
            </div>
        );
    }
}

export default Chat