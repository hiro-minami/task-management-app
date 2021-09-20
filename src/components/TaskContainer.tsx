import React, { useContext } from "react";
import SectionCard from "./SectionCard";
import { Button, Grid } from "@mui/material";
import { AppContext } from "../contexts/AppContexts";

const TaskContainer: React.FC = () => {
    const { state } = useContext(AppContext);
    const addSection = (e: any) => {
        console.log(e);
    };
    console.log(state.taskManager);
    return (
        <Grid container rowSpacing={4} columnSpacing={4}>
            {state.taskManager.getTaskSectionList().map((taskSection, index) => (
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
