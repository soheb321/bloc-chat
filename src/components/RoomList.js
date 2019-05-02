import React, {Component} from 'react';

class RoomList extends Component {
	constructor(props){
		super(props);

		this.state = {
			rooms: [],
			newRoomName: ''
		}

		this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	componentDidMount(){
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room )});
		})
	}

	createRoom(data){
		data.preventDefault();
		const newRoom = {
			name: this.state.newRoomName,
		};
		this.roomsRef.push(newRoom);
		this.setState({newRoomName: ''});
	}

	handleNewRoomChange(data){
		this.setState({newRoomName: data.target.value})
	}

	

	render(){
		return (
			<div>
        <h3>Pick a room:</h3>
        <div></div>
				{this.state.rooms.map( (room, index) =>
					<button key={index} onClick={() => this.props.setActiveRoom(room)} className={room === this.props.activeRoom ? 'active' : ''} > {room.name}</button>
        )}
        
				<form onSubmit={data => this.createRoom(data)}>
					<input  placeholder='Or create your own!' value={this.state.newRoomName} onChange={data => this.handleNewRoomChange(data)} />
					<input type='submit' value='+'/>
				</form>
			</div>
		);
	}
}

export default RoomList;