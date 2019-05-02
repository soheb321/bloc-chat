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

  createRoom(data) {
    data.preventDefault();
   
    this.roomsRef.push({
       name: this.state.newRoomName ,
       
    });
    this.setState({ newRoomName: '' });
 }

 addRoom(data) {
   
    this.setState({ newRoomName: data.target.value });
 }

render(){
    return(
        
        <section className="room-list">
        <h1>Select a room</h1>
        {
          this.state.rooms.map((room) =>
            
              <h2  key={room.key} className="room-name">
              
                <button value = {room.name} onClick = {(data) => this.props.setActiveRoom(data) }>{room.name}</button>
                
              </h2>
            
          )
        }
        <form  onSubmit={ (data) => this.createRoom(data) }>
               <input  value={ this.state.newRoomName } onChange={ (data) => this.addRoom(data) }/>
               <input type="submit" />
            </form>
      </section>
      

    );
}
}
  export default RoomList;