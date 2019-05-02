import React, {Component} from 'react';

class MessageList extends Component {
	constructor(props){
		super(props);

		this.state = {
			messages: [],
			newMessageText: ''
		}

		this.messageRef = this.props.firebase.database().ref('messages');
	}

	componentDidMount(){
		this.messageRef.on('child_added', snapshot => {
			const message = snapshot.val();
			this.setState({ messages: this.state.messages.concat(message) });
		})
	}

	showMessage(message, index){
		if(message.roomId === this.props.activeRoom.key){
			return (
				<div  key={'msg' + index}>
     
					<h5>Sender:{message.username}</h5>
					<p>Message:  {message.content}</p>
          <h6>Sent At:{message.sentAt}</h6>
          __________________________________
				</div>
			)
		}
	}

	messageChange(data){
		this.setState({ newMessageText: data.target.value })
	}

	handleMessageSubmit(data){
		data.preventDefault();
		
		if(this.props.user && this.props.activeRoom){
			const newMessage = {
				username: this.props.user.displayName,
				content: this.state.newMessageText,
				sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
				roomId: this.props.activeRoom.key
			}
			this.messageRef.push(newMessage);
			this.setState({ newMessageText: '' });
		} else if (!this.props.user) {
			alert('Please sign in');
    }
     
	}

	
	render(){
		return(
			<section>
				<h2>Current Room: {this.props.activeRoom.name}</h2>
				{
					this.state.messages.map((message, index) => 
						this.showMessage(message, index)
					) 
				}
				<form id='new-message' onSubmit={data => this.handleMessageSubmit(data)} >
					<input   placeholder='Say something...'  value={this.state.newMessageText} onChange={data => this.messageChange(data)} />
					<button>Send</button>
				</form>
			</section>
		);
	}

}

export default MessageList;