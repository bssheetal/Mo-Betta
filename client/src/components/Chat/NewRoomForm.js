import React from 'react'

class NewRoomForm extends React.Component {
    
    constructor() {
        super()
        this.state = {
            // Setting the roomName in state from the users current room
            roomName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e) {
        this.setState({
            roomName: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        // Passing the roomName via props and createRoom method in Chat
        this.props.createRoom(this.state.roomName)
        this.setState({roomName: ''})
    }
    
    render () {
        return (
            <div className="new-room-form">
            {/* onSubmit handler which calls createRoom and sets state */}
                <form onSubmit={this.handleSubmit}>
                    <input
                    // Setting value to roomName in state to have a controlled form
                        value={this.state.roomName}
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="Create a room" 
                        required />
                    <button id="create-room-btn" type="submit">+</button>
            </form>
        </div>
        )
    }
}

export default NewRoomForm