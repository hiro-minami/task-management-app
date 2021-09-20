import React, { useContext } from "react";
import NavBar from "./components/NavBar";
import TaskContainer from "./components/TaskContainer";
import { AppContext } from "./contexts/AppContexts";

export default function App() {
    const { state, dispatch } = useContext(AppContext);
    console.log(state);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <NavBar />
            <TaskContainer />
        </AppContext.Provider>
    );
}
