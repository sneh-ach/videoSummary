import { createContext, useContext } from "react";

const MainContext = createContext();

const useMainContext = () => {
    return useContext(MainContext);
}

export { MainContext, useMainContext };
