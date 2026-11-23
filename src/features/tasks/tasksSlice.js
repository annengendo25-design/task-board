
import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask(state, action) {
      state.push(action.payload);
    },

    updateTask(state, action) {
      const { id, changes } = action.payload;
      const task = state.find((task) => task.id === id);

      if (task) {
        Object.assign(task, changes);
      }
    },

    deleteTask(state, action) {
      return state.filter((task) => task.id !== action.payload);
    },

    restoreTask(state, action) {
      const { task, index } = action.payload;
      const safeIndex = Math.min(Math.max(index, 0), state.length);
      state.splice(safeIndex, 0, task);
    },
  },
});

export const { addTask, updateTask, deleteTask, restoreTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
