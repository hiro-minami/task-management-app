import React from "react";
import { Card, CardActions, Grid, IconButton, TextareaAutosize } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TaskCard from "./TaskCard";
import { TaskSection } from "../classes";

interface TaskSectionProps {
    props: TaskSection;
}

const SectionCard: React.FC<TaskSectionProps> = (props) => {
    const hello = () => {
        console.log("hello");
    };
    return (
        <>
            <Grid item justifyContent="center">
                <Card sx={{ width: 280, flexDirection: "column", padding: 2, margin: 2 }}>
                    <Grid container justifyContent="center">
                        <TextareaAutosize aria-label="empty textarea" placeholder="Section" style={{ width: 260 }} />
                        {props.props.getTaskList().map((task, index) => (
                            <TaskCard key={index} task={task} category={props.props.getSectionName()} />
                        ))}
                        <Grid container justifyContent="flex-start">
                            <CardActions>
                                <IconButton aria-label="addContents" onClick={hello}>
                                    <AddIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={hello}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </>
    );
};

export default SectionCard;
