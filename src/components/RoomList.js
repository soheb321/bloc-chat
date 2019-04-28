import React, { Component } from 'react';

class RoomList extends Component{
constructor(props){
  super(props);

this.state = {
    rooms: [],
    newRooms: ""
    
  }
  this.roomsRef = this.props.firebase.database().ref('rooms')
} 

componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(newRoomName) {
    this.roomsRef.push({
       name: newRoomName 
    });
    this.setState({ newRoomName: '' });
 }

 addRoom(data) {
    this.setState({ newRoomName: data.target.value });
 }

render(){
    return(
        <section className="room-list">
        {
          this.state.rooms.map((room) =>
            <ul className="room-list-key" key={room.key}>
              <h2 className="room-name">
                {room.name}
              </h2>
            </ul>
          )
        }
        <form  onSubmit={ (data) => this.createRoom(this.state.newRoomName) }>
               <input  value={ this.state.newRoomName } onChange={ (data) => this.addRoom(data) }/>
               <input type="submit" />
            </form>
      </section>
      

    );
}
}
  export default RoomList;