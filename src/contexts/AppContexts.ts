import { createContext } from "react";
import { Task, TaskSection, TaskManager } from "../classes";

// // test
const manager = new TaskManager();

const task1 = new Task("0001", "朝食", "朝ご飯を食べる");
const task2 = new Task("0002", "昼食", "昼ご飯を食べる");
const task3 = new Task("0003", "夕食", "晩ご飯を食べる");

const section1 = new TaskSection("0001", "食事", [task1, task2, task3]);
const section2 = new TaskSection("0002", "食事", [task1, task2]);
const section3 = new TaskSection("0003", "食事", [task1, task3]);

manager.setTaskSectionList([section1, section2, section3]);
// // test

const initialState = manager;
export const AppContext = createContext({ state: { taskManager: initialState }, dispatch: () => {} });
