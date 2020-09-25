import { auth } from "firebase";
import React, { Component, createContext } from "react";
import { firebaseAuth } from "../../services/firebase";

export const UserContext = createContext({ user: null, loaded: false });

class UserProvider extends Component<{ user?: firebase.auth.UserCredential }> {
    state = {
        user: null,
        loaded: false,
    };

    componentDidMount = () => {
        firebaseAuth.onAuthStateChanged((userAuth) => {
            this.setState({ user: userAuth, loaded: true });
        });
    };
    render() {
        return <UserContext.Provider value={{ ...this.state }}>{this.props.children}</UserContext.Provider>;
    }
}
export default UserProvider;
