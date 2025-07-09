import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ProjectState from '@/types/project';
interface ProjectSliceState {
    projects: ProjectState[];
}

const initialState: ProjectSliceState = {
    projects: [],
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<ProjectState[]>) {
            state.projects = action.payload;
        },
        addProject(state, action: PayloadAction<ProjectState>) {
            state.projects.push(action.payload);
        },
        removeProject(state, action: PayloadAction<string>) {
            state.projects = state.projects.filter((p) => p.id !== action.payload);
        },
        clearProjects() {
            return { projects: [] };
        },
    },
});

export const { setProjects, addProject, removeProject, clearProjects } = projectSlice.actions;
export default projectSlice.reducer;
