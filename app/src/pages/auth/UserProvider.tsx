import { auth } from "firebase";
import React, { Component, createContext } from "react";
import { firebaseAuth } from "../../services/firebase";

interface UserContextType {
    user: firebase.User | null;
    loaded: boolean;
}
export const UserContext = createContext<UserContextType>({ user: null, loaded: false });

class UserProvider extends Component {
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
