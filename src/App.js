import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDEYL19DU1nZnv71Xusq5qzFEs83lpO7Wo",
  authDomain: "bloc-chat-50e68.firebaseapp.com",
  databaseURL: "https://bloc-chat-50e68.firebaseio.com",
  projectId: "bloc-chat-50e68",
  storageBucket: "bloc-chat-50e68.appspot.com",
  messagingSenderId: "294343061556"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeRoom: 'None',
      user: 'Guest'
    }
  }

  setActiveRoom(room){
    this.setState({activeRoom: room});
  }

  showUser(user){
    this.setState({user: user});
    
  }

  render() {
    return (
      
        <section >
        <div>
          <h1>Bloc Chat</h1>
          </div>
          <RoomList firebase={firebase} setActiveRoom={(room) => this.setActiveRoom(room)} activeRoom={this.state.activeRoom}/>
          <div></div>
          <MessageList firebase={firebase} user={this.state.user} activeRoom={this.state.activeRoom} />
          <div></div>
          <User firebase={firebase} showUser={(user)=>this.showUser(user)} user={this.state.user} />
        </section>
      
    );
  }
}

export default App;