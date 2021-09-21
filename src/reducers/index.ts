import { ADD_SECTION, DELETE_SECTION, ADD_TASK, DELETE_TASK, CHANGE_CATEGORY } from "../actions";
import { Task, TaskManager, TaskSection } from "../classes";

const reducer = (state: TaskManager, action: { type: string; id?: number; sectionId?: number; taskId?: number; newCategory?: string }) => {
    switch (action.type) {
        case ADD_SECTION:
            const newSection = new TaskSection(state.getLength() + 1, "", []);
            state.addTaskSection(newSection);
            return new TaskManager(state.getTaskSectionList());
        case DELETE_SECTION:
            const newSectionList = state.getTaskSectionList().filter((section) => section.getId() !== action.sectionId!);
            state.setTaskSectionList(newSectionList);
            return new TaskManager(state.getTaskSectionList());
        case ADD_TASK:
            const newTask = new Task(state.getSection(action.sectionId!).getLength() + 1);
            state.getSection(action.sectionId!).addTaskList(newTask);
            return new TaskManager(state.getTaskSectionList());
        case DELETE_TASK:
            const newTaskList = state
                .getSection(action.sectionId!)
                .getTaskList()
                .filter((task) => task.getId() !== action.taskId!);
            console.log(newTaskList);
            state.getSection(action.sectionId!).setTaskList(newTaskList);
            return new TaskManager(state.getTaskSectionList());
        case CHANGE_CATEGORY:
            state.getSection(action.sectionId!).setSectionName(action.newCategory!);
            return new TaskManager(state.getTaskSectionList());
        default:
            return state;
    }
};

export default reducer;
