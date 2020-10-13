import React, { Component, createContext } from "react";
import { refreshApolloAuthentication } from "../../services/api/apolloClient";
import { firebaseAuth } from "../../services/firebase";

interface UserContextType {
    user: firebase.User | null;
    loading: boolean;
}
export const UserContext = createContext<UserContextType>({ user: null, loading: true });

class UserProvider extends Component {
    state = {
        user: null,
        loading: true,
    };

    componentDidMount = () => {
        firebaseAuth.onAuthStateChanged((userAuth) => {
            this.setState({ user: userAuth, loading: false });
            refreshApolloAuthentication();
        });
    };
    render() {
        return <UserContext.Provider value={{ ...this.state }}>{this.props.children}</UserContext.Provider>;
    }
}

export default UserProvider;
