import { useContext } from "react";
import { UserContext } from "../pages/auth/UserProvider";

export const useUserContext = () => {
    return useContext(UserContext);
};
