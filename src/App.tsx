import { useReducer } from "react";
import NavBar from "./components/NavBar";
import TaskContainer from "./components/TaskContainer";
import { AppContext } from "./contexts/AppContexts";
import reducer from "./reducers";
import { manager } from "./models";
import "./app.css";

export default function App() {
    const [state, dispatch] = useReducer(reducer, manager);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <NavBar />
            <TaskContainer />
        </AppContext.Provider>
    );
}
