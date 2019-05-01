
import React, { Component } from 'react';


        

class User extends Component {
    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
          this.props.showUser(user);
        });
      }
    
      signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
      }
    
      signOut() {
        this.props.firebase.auth().signOut();
        this.props.showUser({displayName: "Guest"});
      }
    
      render() {
        return (
          <div>
                <button onClick={ () => this.signIn() }>Sign In</button>
                <button onClick={ () => this.signOut() }>Sign Out</button>
                <p>Current User: {this.props.activeUser}</p>
          </div>
        );
              }

}
export default User;