import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
import NewRoomForm from './NewRoomForm'
import { tokenUrl, instanceLocator } from './config'
import './style.css'
import withAuth from '../withAuth'

class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user.username,
            // email: "",
            // active room state
            roomId: null,
            // messages array data coming from Chatkit
            messages: [],
            // room states from Chatkit
            joinableRooms: [],
            joinedRooms: []
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
        this.createRoom = this.createRoom.bind(this)
        // this.loadChat = this.loadChat.bind(this)
    }

    componentDidMount() {

      console.log("==========username============")
    //   console.log(this.props.user.username)
      console.log(this.state.username)

      // May have async issue with Auth below
      // Chatkit setting in config.js
      const chatManager = new Chatkit.ChatManager({
          instanceLocator,
          userId: this.state.username,
          tokenProvider: new Chatkit.TokenProvider({
              url: tokenUrl
          })
      })
      // Connecting to ChatKit and listening for/retrieving new messages 
      chatManager.connect()
          .then(currentUser => {
              // Hooking component to current user object
              this.currentUser = currentUser

              //*************************************************************************** */
              // Logging current useres in room[3] of array for auth-active user connection.  Need all users in current room or all rooms?  Create component in Chat to display...or put below active room in room list.  And/or avatars via ui-avatars.com. Also someone is currently typing via a room subscription hook in Chatkit via Pusher.com (Chatkit)
            //   console.log(this.currentUser.rooms[3].userId)
              // Getting joined/joinable rooms
              this.getRooms()
          })
          // .catch for promise failure case
          .catch(err => console.log('error on connecting: ', err))

    }

    // loadChat() {

    //     // state not set yet
    //     console.log('===========state=========: ' + this.state)
    //     // May have async issue with Auth below
    //     // Chatkit setting in config.js
    //     const chatManager = new Chatkit.ChatManager({
    //         instanceLocator,
    //         userId: "Taylor",
    //         tokenProvider: new Chatkit.TokenProvider({
    //             url: tokenUrl
    //         })
    //     })
    //     // Connecting to ChatKit and listening for/retrieving new messages 
    //     chatManager.connect()
    //         .then(currentUser => {
    //             // Hooking component to current user object
    //             this.currentUser = currentUser

    //             //*************************************************************************** */
    //             // Logging current useres in room[3] of array for auth-active user connection.  Need all users in current room or all rooms?  Create component in Chat to display...or put below active room in room list.  And/or avatars via ui-avatars.com. Also someone is currently typing via a room subscription hook in Chatkit via Pusher.com (Chatkit)
    //             console.log(this.currentUser.rooms[3].userId)
    //             // Getting joined/joinable rooms
    //             this.getRooms()
    //         })
    //         // .catch for promise failure case
    //         .catch(err => console.log('error on connecting: ', err))
    // }


    // Method to get joined and joinable rooms data from Chatkit return a promise
    getRooms() {
        this.currentUser.getJoinableRooms()
            // Handling promise
            .then(joinableRooms => {
                // Setting room data to state
                this.setState({
                    joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
            })
            // .catch for promise failure case
            .catch(err => console.log('error on joinableRooms: ', err))
    }
    // Method to subscribe to rooms passing roomid
    subscribeToRoom(roomId) {
        // Clearing state when room changes to clear old room's messages
        this.setState({ messages: [] })
        this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onNewMessage: message => {
                    // setting new messages in state by adding them to the messages array (via spread operator...redefining array into new copy...replacing originl messages [] with new one []
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                },
                // Usertyping hook...new component for UI
                // onUserStartedTyping: user => {
                /** render out the users */
                // }
            }
        })
            // Handling returned promise of rooms and setting to state the room user is currently in
            .then(room => {
                this.setState({
                    roomId: room.id
                })
                // Calling .getRoom() to update state of joined/joinable room after subscribe
                this.getRooms()
            })
            // promise error catch
            .catch(err => console.log('error on subscribing to room: ', err))
    }

    sendMessage(text) {
        // Calling sendMessage on current user and sending messages to Chatkit with the current roomId
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        })
    }


    createRoom(name) {
        // Calling createRoom hooked to current user during onSubmit
        this.currentUser.createRoom({
            name
        })
            // Calling subscribeToRoom on promise...passing it room.id
            .then(room => this.subscribeToRoom(room.id))
            // Promis errer handler
            .catch(err => console.log('error with createRoom: ', err))
    }

    // New message changes state and triggeres re-render
    // Which re-renders MessageList rendering messages to UI
    render() {
        return (
            <div className="chat chat-fluid">
                <RoomList
                    // Sending room data to <RoomList component...passing subsribe to room method
                    subscribeToRoom={this.subscribeToRoom}
                    // combining two arrays with spread operator
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    roomId={this.state.roomId}
                />
                {/* Sending messages data as props to <MessageList */}
                <MessageList
                    // Setting roomId & messges state
                    roomId={this.state.roomId}
                    messages={this.state.messages}
                />
                {/* Reverse data flow: sending data up to the parent Chat component via sendMessage method  */}
                {/* Giving the SendMessageForm component access to the method */}
                <SendMessageForm
                    // disabled prop send to Chat of roomID or blank...currently in a room or not.  And if in a room, the messages contained therein...set to !(opposite so as to send null if in room...ie. not disabled cause in a room)
                    disabled={!this.state.roomId}
                    sendMessage={this.sendMessage}
                />
                <NewRoomForm
                    // For onSubmit handler on the form
                    createRoom={this.createRoom}
                />
            </div>
        );
    }
}

export default withAuth(Chat)