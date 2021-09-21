import { createContext } from "react";
import { TaskManager } from "../classes";
import { manager } from "../models";

type Context = {
    state: TaskManager;
    dispatch: React.Dispatch<any>;
};

const initialState = manager;
export const AppContext = createContext<Context>({ state: initialState, dispatch: () => {} });
