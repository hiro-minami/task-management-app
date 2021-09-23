import React, { useContext } from "react";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../classes";
import { DELETE_TASK } from "../actions";
import { AppContext } from "../contexts/AppContexts";
import { MOVE_TASK } from "../actions";
interface TaskCardProps {
    task: Task;
    category: string | undefined;
    sectionId: number;
    index: string;
}

const TaskCard: React.FC<TaskCardProps> = (task) => {
    const taskId = task.task.getId()!;
    const sectionId = task.sectionId;

    const { dispatch } = useContext(AppContext);
    const deleteTask = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch({ type: DELETE_TASK, sectionId, taskId });
    };

    const startDrag = (e: React.DragEvent) => {
        const target = e.target as HTMLElement;
        const data = target.getAttribute("data-id");
        console.log(data);
        e.dataTransfer.setData("text/plain", data!);
        e.dataTransfer.effectAllowed = "move";
    };

    return (
        <Card draggable="true" onDragStart={startDrag} sx={{ width: 260, marginTop: 1, marginBottom: 1, alignItems: "center" }} data-id={task.index}>
            <Grid container data-id={task.index}>
                <Grid container justifyContent="flex-start" spacing={1} data-id={task.index}>
                    <CardContent data-id={task.index}>
                        <Typography>Title:{task.task.getTaskName()}</Typography>
                        <Typography>Detail:{task.task.getTaskDetail()}</Typography>
                        <IconButton aria-label="delete" onClick={deleteTask}>
                            <DeleteIcon />
                        </IconButton>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default TaskCard;
