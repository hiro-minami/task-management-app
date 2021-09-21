import React, { useContext } from "react";
import { Card, CardActions, Grid, IconButton, TextareaAutosize } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TaskCard from "./TaskCard";
import { TaskSection } from "../classes";
import { AppContext } from "../contexts/AppContexts";
import { ADD_TASK, DELETE_SECTION, CHANGE_CATEGORY } from "../actions";

interface TaskSectionProps {
    props: TaskSection;
}

const SectionCard: React.FC<TaskSectionProps> = (props) => {
    const sectionId = props.props.getId();
    const category = props.props.getSectionName();

    const { dispatch } = useContext(AppContext);

    const addSection = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const sectionId = props.props.getId();
        dispatch({ type: ADD_TASK, sectionId });
    };

    const deleteSection = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch({ type: DELETE_SECTION, sectionId });
    };

    const changeCategory = (e: any) => {
        e.preventDefault();
        const newCategory = e.target.value;
        dispatch({ type: CHANGE_CATEGORY, sectionId, newCategory });
    };

    return (
        <>
            <Grid item justifyContent="center">
                <Card sx={{ width: 280, flexDirection: "column", padding: 2, margin: 2 }}>
                    <Grid container justifyContent="center">
                        <TextareaAutosize aria-label="empty textarea" placeholder="Section" defaultValue={category} style={{ width: 260 }} onChange={changeCategory} />
                        {props.props.getTaskList().map((task, index) => (
                            <TaskCard key={index} task={task} category={category} sectionId={sectionId} />
                        ))}
                        <Grid container justifyContent="flex-start">
                            <CardActions>
                                <IconButton aria-label="addContents" onClick={addSection}>
                                    <AddIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={deleteSection}>
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
