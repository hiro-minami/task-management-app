import React, { useContext } from "react";
import { Card, CardActions, CardContent, Grid, IconButton, TextareaAutosize, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../classes";
import { DELETE_TASK } from "../actions";
import { AppContext } from "../contexts/AppContexts";

interface TaskCardProps {
    task: Task;
    category: string | undefined;
    sectionId: number;
}

const TaskCard: React.FC<TaskCardProps> = (task) => {
    console.log(task.task.getId());
    const { dispatch } = useContext(AppContext);
    const deleteTask = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const sectionId = task.sectionId;
        const taskId = task.task.getId();
        dispatch({ type: DELETE_TASK, sectionId, taskId });
    };
    return (
        <Card sx={{ width: 260, margin: 1, padding: 2, alignItems: "center" }}>
            <Grid container>
                <Grid container justifyContent="center" spacing={1}>
                    <CardContent>
                        <TextareaAutosize aria-label="empty textarea" placeholder="Title" style={{ width: 200 }} defaultValue={task.task.getTaskName()} />
                        <Typography>Section Name: {task.category}</Typography>
                        <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Detail" style={{ width: 200 }} defaultValue={task.task.getTaskDetail()} />
                    </CardContent>
                </Grid>
                <Grid container justifyContent="flex-end">
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
