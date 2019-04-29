import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
      activeRoom: "None"
    };  
  }
  setActiveRoom(data){
    this.setState({activeRoom: data.target.value})
    
  }
  render() {
    return (
      <div>
     <RoomList firebase = {firebase}
     activeRoom={this.state.activeRoom}
        setActiveRoom={(data) => this.setActiveRoom(data)}/>
        <h1>Active Room: {this.state.activeRoom} </h1>
        <MessageList
        firebase={firebase}
        activeRoom={this.state.activeRoom}
      />
    </div>
    );
  }
}

export default App;

