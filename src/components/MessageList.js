import React, { Component } from 'react';
class MessageList extends Component{
    constructor(props ){
        super(props);
      
      this.state = { 
          Messages:[]
          
          
        }
        this.MessagesRef = this.props.firebase.database().ref('Messages')
      } 

      componentDidMount(){
        this.MessagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.username = snapshot.username;
            message.content = snapshot.content;
            message.key = snapshot.key;
            message.sentAt = snapshot.sentAt;
            this.setState({ Messages: this.state.Messages.concat( message ) })
            
          });
        }

        
      
    render() {
        return (
           <div>Messages
           
               {this.state.Messages
             .filter(message => message.roomID === this.props.activeRoom)
             .map ((message) => (
                 <ul>
                     <div>{message.Content}</div>
                    <div>Sent by: {message.Username}</div>
                    
                    At: {message.SentAt}
                 </ul>
             ))
            }
           
           </div>

        );
    }
     }

     export default MessageList;
