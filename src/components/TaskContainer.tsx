import React, { useContext } from "react";
import SectionCard from "./SectionCard";
import { Button, Grid } from "@mui/material";
import { AppContext } from "../contexts/AppContexts";
import { ADD_SECTION } from "../actions";

const TaskContainer: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const addSection = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch({ type: ADD_SECTION });
    };
    return (
        <Grid container rowSpacing={4} columnSpacing={4}>
            {state.getTaskSectionList().map((taskSection, index) => (
                <SectionCard key={index} props={taskSection} />
            ))}
            <Grid item margin={2}>
                <Button size="small" onClick={addSection}>
                    Add Section
                </Button>
            </Grid>
        </Grid>
    );
};

export default TaskContainer;
