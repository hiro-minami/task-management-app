import React, { useContext } from "react";
import { Card, CardActions, CardContent, Grid, IconButton, TextareaAutosize, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../classes";
import { DELETE_TASK } from "../actions";
import { AppContext } from "../contexts/AppContexts";
import { CHANGE_TASK_NAME, CHANGE_TASK_DETAIL, MOVE_TASK } from "../actions";

interface TaskCardProps {
    task: Task;
    category: string | undefined;
    sectionId: number;
}

const TaskCard: React.FC<TaskCardProps> = (task) => {
    const taskId = task.task.getId()!;
    const sectionId = task.sectionId;

    const { dispatch } = useContext(AppContext);
    const deleteTask = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch({ type: DELETE_TASK, sectionId, taskId });
    };

    const changeTaskName = (e: any) => {
        e.preventDefault();
        const newTaskName = e.target.value;
        dispatch({ type: CHANGE_TASK_NAME, sectionId, taskId, newTaskName });
    };

    const changeTaskDetail = (e: any) => {
        e.preventDefault();
        const newTaskDetail = e.target.value;
        dispatch({ type: CHANGE_TASK_DETAIL, sectionId, taskId, newTaskDetail });
    };

    const startDrag = (e: React.DragEvent) => {
        const target = e.target as HTMLElement;
        const data = target.getAttribute("data-id");
        e.dataTransfer.setData("text/plain", data!);
        e.dataTransfer.effectAllowed = "move";
    };

    const overDrag = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const drop = (e: React.DragEvent) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const targetFrom = e.dataTransfer.getData("text/plain");
        const targetTo = target.getAttribute("data-id");
        console.log(targetFrom);
        console.log(targetTo);
        console.log(taskId);
        dispatch({ type: MOVE_TASK, targetFrom, targetTo });
    };

    return (
        <Card draggable="true" onDragStart={startDrag} onDragOver={overDrag} onDrop={drop} sx={{ width: 260, margin: 1, padding: 2, alignItems: "center" }} data-id={taskId}>
            <Grid container data-id={taskId}>
                <Grid container justifyContent="center" spacing={1} data-id={taskId}>
                    <CardContent data-id={taskId}>
                        <TextareaAutosize aria-label="empty textarea" placeholder="Title" style={{ width: 200 }} value={task.task.getTaskName()} onChange={changeTaskName} data-id={taskId} />
                        <Typography data-id={taskId}>Section Name: {task.category}</Typography>
                        <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Detail" style={{ width: 200 }} value={task.task.getTaskDetail()} onChange={changeTaskDetail} data-id={taskId} />
                    </CardContent>
                </Grid>
                <Grid container justifyContent="flex-end" data-id={taskId}>
                    <CardActions>
                        <IconButton aria-label="delete" onClick={deleteTask}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    );
};

export default TaskCard;
