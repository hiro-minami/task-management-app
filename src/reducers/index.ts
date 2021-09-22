import { ADD_SECTION, DELETE_SECTION, ADD_TASK, DELETE_TASK, CHANGE_CATEGORY, MOVE_TASK, CHANGE_TASK_NAME, CHANGE_TASK_DETAIL } from "../actions";
import { Task, TaskManager, TaskSection } from "../classes";

const reducer = (state: TaskManager, action: { type: string; id?: number; sectionId?: number; taskId?: string; newCategory?: string; newTaskName?: string; newTaskDetail: string; targetFrom?: string; targetTo?: string }) => {
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
            const newTask = new Task(`${action.sectionId!}-${state.getSection(action.sectionId!).getLength() + 1}`);
            state.getSection(action.sectionId!).addTaskList(newTask);
            return new TaskManager(state.getTaskSectionList());
        case DELETE_TASK:
            const newTaskList = state
                .getSection(action.sectionId!)
                .getTaskList()
                .filter((task) => task.getId() !== action.taskId!);
            state.getSection(action.sectionId!).setTaskList(newTaskList);
            return new TaskManager(state.getTaskSectionList());
        case CHANGE_CATEGORY:
            state.getSection(action.sectionId!).setSectionName(action.newCategory!);
            return new TaskManager(state.getTaskSectionList());
        case CHANGE_TASK_NAME:
            state
                .getSection(action.sectionId!)
                .getTask(+action.taskId!.split("-")[1]!)
                .setTaskName(action.newTaskName!);
            return new TaskManager(state.getTaskSectionList());
        case CHANGE_TASK_DETAIL:
            state
                .getSection(action.sectionId!)
                .getTask(+action.taskId!.split("-")[1]!)
                .setTaskDetail(action.newTaskDetail!);
            return new TaskManager(state.getTaskSectionList());
        case MOVE_TASK:
            const fromList = action.targetFrom!.split("-");
            const toList = action.targetTo!.split("-");
            const targetTask = state
                .getSection(+fromList[0])
                .getTaskList()
                .splice(+fromList[1] - 1, 1);
            targetTask[0].setId(action.targetTo!);
            state.getSection(+toList[0]).addTaskList(targetTask[0]);
            return new TaskManager(state.getTaskSectionList());
        default:
            return state;
    }
};

export default reducer;
