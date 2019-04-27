import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
     <RoomList firebase = {firebase}/>
    );
  }
}

export default App;

