import React from "react";
import { Card, CardActions, CardContent, Grid, IconButton, TextareaAutosize, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Task } from "../classes";

interface TaskCardProps {
    task: Task;
    category: string | undefined;
}

const TaskCard: React.FC<TaskCardProps> = (task) => {
    const hello = () => {
        console.log("hello");
    };
    return (
        <Card sx={{ width: 260, margin: 2, padding: 2, alignItems: "center" }}>
            <Grid container>
                <Grid container justifyContent="center" spacing={1}>
                    <CardContent>
                        <TextareaAutosize aria-label="empty textarea" placeholder="Title" style={{ width: 200 }} />
                        <Typography>Section Name: {task.category}</Typography>
                        <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" style={{ width: 200 }} defaultValue={task.task.getTaskDetail()} />
                    </CardContent>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <CardActions>
                        <IconButton aria-label="text" onClick={hello}>
                            <TextSnippetIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={hello}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    );
};

export default TaskCard;
