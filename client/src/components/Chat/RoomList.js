// import React from 'react'

// class RoomList extends React.Component {
//     render () {
//         const orderedRooms = [...this.props.rooms].sort((a, b) => a.id > b.id)
//         return (
//             <div className="rooms-list">
//                 <ul>
//                 <h3>Your rooms:</h3>
//                     {orderedRooms.map(room => {
//                         const active = room.id === this.props.roomId ? 'active' : '';
//                         return (
//                             <li key={room.id} className={"room " + active}>
//                                 <a
//                                     onClick={() => this.props.subscribeToRoom(room.id)}
//                                     href="#">
//                                     # {room.name}
//                                 </a>
//                             </li>
//                         )
//                     })}
//                 </ul>
//             </div>
//         )
//     }
// }

// export default RoomList

// ./src/components/Chat/RoomList.js
// [1]   Line 14:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid
// [1]


import React from 'react'

class RoomList extends React.Component {
    render () {
        return (
            <div className="rooms-list">
                <div className="help-text">RoomList</div>
            </div>
        )
    }
}

export default RoomList