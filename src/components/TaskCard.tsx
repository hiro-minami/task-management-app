import React, { useContext, useState } from "react";
import { Card, CardActions, CardContent, Grid, IconButton, TextareaAutosize, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../classes";
import { DELETE_TASK } from "../actions";
import { AppContext } from "../contexts/AppContexts";
import { CHANGE_TASK_NAME, CHANGE_TASK_DETAIL, MOVE_TASK } from "../actions";
import CheckIcon from "@mui/icons-material/Check";
import { TextRotationAngleupTwoTone } from "@material-ui/icons";
interface TaskCardProps {
    task: Task;
    category: string | undefined;
    sectionId: number;
    index: string;
}

const TaskCard: React.FC<TaskCardProps> = (task) => {
    const taskId = task.task.getId()!;
    const sectionId = task.sectionId;

    const [title, setTitle] = useState("");

    const { dispatch } = useContext(AppContext);
    const deleteTask = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch({ type: DELETE_TASK, sectionId, taskId });
    };

    const changeTaskDetail = (e: any) => {
        e.preventDefault();
        const newTaskDetail = e.target.value;
        dispatch({ type: CHANGE_TASK_DETAIL, sectionId, taskId, newTaskDetail });
    };

    const editTask = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const data = target.getAttribute("data-id");
        console.log(target);
        const inputTitle = document.querySelector(`#input-title_${data}`);
        console.log(inputTitle!);
        const hello = inputTitle!.querySelector("textarea");
        hello!.style.cssText = `display: none`;
        dispatch({ type: CHANGE_TASK_NAME, sectionId, taskId, newTaskName: title });
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
        const target = e.target as HTMLElement;
        const targetFrom = e.dataTransfer.getData("text/plain");
        const targetTo = target.getAttribute("data-id");
        if (targetTo) dispatch({ type: MOVE_TASK, targetFrom, targetTo });
    };

    return (
        <Card draggable="true" onDragStart={startDrag} onDragOver={overDrag} onDrop={drop} sx={{ width: 260, margin: 1, padding: 2, alignItems: "center" }} data-id={task.index}>
            <Grid container data-id={task.index}>
                <Grid container justifyContent="center" spacing={1} data-id={task.index}>
                    <CardContent data-id={task.index}>
                        <TextareaAutosize aria-label="empty textarea" placeholder="Title" style={{ width: 200 }} onChange={(e) => setTitle(e.target.value)} id={`input-title_${task.index}`} />
                        <Typography id={`title_${task.index}`}>Title:{task.task.getTaskName()}</Typography>
                        <Typography>Section Name: {task.category}</Typography>
                        <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Detail" style={{ width: 200 }} value={task.task.getTaskDetail()} onChange={changeTaskDetail} data-id={task.index} />
                        <Typography>
                            Detail:
                            <br /> {task.category}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid container justifyContent="flex-end" data-id={task.index}>
                    <CardActions>
                        <IconButton aria-label="edit" onClick={editTask}>
                            <CheckIcon data-id={task.index} />
                        </IconButton>
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
