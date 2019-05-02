import React, {Component} from 'react';



class User extends Component {
	constructor(props){
		super(props);

		this.state = {
			user: ''
		}
	}

	componentDidMount(){
		this.props.firebase.auth().onAuthStateChanged( user => {
			this.props.showUser(user);
			this.setState({ user: user });
		})
	}

	signIn(){
		var provider = new this.props.firebase.auth.GoogleAuthProvider();

		this.props.firebase.auth().signInWithPopup(provider);

	   	this.props.firebase.auth().onAuthStateChanged( user => {
			this.props.showUser(user);
			this.setState({ user: user });
		})
	}

	signOut(){
		this.props.firebase.auth().signOut();
		this.setState({ user: '' });
	}

	render(){
		return (
      <div>
        Signed in as: <div>{this.state.user ? <h5>{this.props.user.displayName}</h5> : <h5>Guest</h5>} </div>
			<button  onClick={this.state.user ? () => this.signOut() : () => this.signIn() } >	 
				{this.state.user ? <i>Sign Out</i>: <i>Sign In</i>}
			</button>
      

      </div>
		);
	}
}

export default User;