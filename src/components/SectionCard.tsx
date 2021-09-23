import React, { useContext, useState } from "react";
import { Box, Button, Card, CardActions, Grid, IconButton, Modal, TextareaAutosize, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskCard from "./TaskCard";
import { TaskSection } from "../classes";
import { AppContext } from "../contexts/AppContexts";
import { ADD_TASK, DELETE_SECTION, CHANGE_CATEGORY, MOVE_TASK } from "../actions";
import { style, formStyle } from "../styles";

interface TaskSectionProps {
    props: TaskSection;
}

const SectionCard: React.FC<TaskSectionProps> = (props) => {
    const sectionId = props.props.getId();
    const category = props.props.getSectionName();

    const [section, setSection] = useState("");
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");

    const { dispatch } = useContext(AppContext);

    const isInputSectionBlank = section === "";
    const isSectionBlank = !category;
    const isInputFormBlank = title === "" || detail === "";

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addTask = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch({ type: ADD_TASK, sectionId, newTaskName: title, newTaskDetail: detail });
        setTitle("");
        setDetail("");
        handleClose();
    };

    const deleteSection = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch({ type: DELETE_SECTION, sectionId });
    };

    const addSection = (e: any) => {
        e.preventDefault();
        dispatch({ type: CHANGE_CATEGORY, sectionId, newCategory: section });
        let input = document.querySelector(`#input-${sectionId.toString()}`) as HTMLElement;
        input.style.cssText = "display: none";
    };

    const overDrag = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const drop = (e: React.DragEvent) => {
        const target = e.target as HTMLElement;
        const targetFrom = e.dataTransfer.getData("text/plain");
        const targetTo = target.getAttribute("data-to");
        if (targetTo) dispatch({ type: MOVE_TASK, targetFrom, targetTo });
    };

    return (
        <>
            <Grid item justifyContent="center" className="tasks">
                <Card sx={{ width: 230, flexDirection: "column", padding: 2, marginTop: 2, marginLeft: 1 }} id={sectionId.toString()} onDragOver={overDrag} onDrop={drop} data-to={sectionId}>
                    <Grid container justifyContent="center" data-to={sectionId}>
                        <div id={`input-${sectionId.toString()}`}>
                            <TextareaAutosize aria-label="empty textarea" placeholder="Section" style={{ width: 220 }} onChange={(e) => setSection(e.target.value)} data-to={sectionId} />
                            <Button style={formStyle} variant="contained" onClick={addSection} disabled={isInputSectionBlank}>
                                Add Section
                            </Button>
                        </div>
                        <Typography variant="h5" data-to={sectionId}>
                            {category}
                        </Typography>
                        {props.props.getTaskList().map((task, index) => (
                            <TaskCard key={index} task={task} category={category} sectionId={sectionId} index={`${sectionId}-${index + 1}`} />
                        ))}
                        <Grid container justifyContent="flex-start" data-to={sectionId}>
                            <CardActions>
                                <IconButton aria-label="addContents" onClick={handleOpen} disabled={isSectionBlank} data-to={sectionId}>
                                    <AddTaskIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={deleteSection} data-to={sectionId}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Grid container direction="column" alignItems="flex-start">
                        <TextField style={formStyle} id="standard-basic" label="Title" variant="standard" onChange={(e) => setTitle(e.target.value)} />
                        <TextField style={formStyle} id="standard-basic" label="Detail" variant="standard" onChange={(e) => setDetail(e.target.value)} />
                        <Button style={formStyle} variant="contained" onClick={addTask} disabled={isInputFormBlank}>
                            Add Task
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default SectionCard;
