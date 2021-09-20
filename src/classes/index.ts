export class Task {
    private id: string | undefined;
    private taskName: string | undefined;
    private taskDetail: string | undefined;
    constructor(id?: string | undefined, taskName?: string | undefined, taskDetail?: string | undefined) {
        this.id = id;
        this.taskName = taskName;
        this.taskDetail = taskDetail;
    }
    public getId(): string | undefined {
        if (this.id) return this.id;
        else return undefined;
    }
    public getTaskName(): string | undefined {
        if (this.taskName) return this.taskName;
        else return undefined;
    }
    public getTaskDetail(): string | undefined {
        if (this.taskDetail) return this.taskDetail;
        else return undefined;
    }
    public setId(newId: string): void {
        this.id = newId;
    }
    public setTaskName(newName: string): void {
        this.taskName = newName;
    }
    public setTaskDetail(newDetail: string): void {
        this.taskDetail = newDetail;
    }
}

export class TaskSection {
    private id: string;
    private sectionName: string | undefined;
    private taskList: Task[];
    constructor(id: string, sectionName?: string | undefined, taskList?: Task[]) {
        this.id = id;
        this.sectionName = sectionName;
        if (taskList) this.taskList = taskList;
        else this.taskList = [];
    }
    public getId(): string {
        return this.id;
    }
    public getSectionName(): string | undefined {
        if (this.sectionName) return this.sectionName;
        else return undefined;
    }
    public getTaskList(): Task[] {
        return this.taskList;
    }
    public setId(newId: string): void {
        this.id = newId;
    }
    public setTaskList(newList: Task[]): void {
        this.taskList = newList;
    }
    public setSectionName(newName: string): void {
        this.sectionName = newName;
    }
    public getLength(): number {
        return this.taskList.length;
    }
    public addTaskList(newTask: Task): void {
        this.taskList.push(newTask);
    }
    public deleteTask(deleteId: string): void {
        this.taskList = this.taskList.filter((task) => task.getId() !== deleteId);
    }
}

export class TaskManager {
    private taskSectionList: TaskSection[];
    constructor(taskSectionList?: TaskSection[]) {
        if (taskSectionList) this.taskSectionList = taskSectionList;
        else this.taskSectionList = [];
    }
    public getTaskSectionList(): TaskSection[] {
        return this.taskSectionList;
    }
    public setTaskSectionList(newList: TaskSection[]): void {
        this.taskSectionList = newList;
    }
    public getLength(): number {
        return this.taskSectionList.length;
    }
    public addTaskSection(newCard: TaskSection) {
        this.taskSectionList.push(newCard);
    }
    public deleteTaskSection(deleteId: string): void {
        this.taskSectionList = this.taskSectionList.filter((taskSection) => taskSection.getId() !== deleteId);
    }
}
