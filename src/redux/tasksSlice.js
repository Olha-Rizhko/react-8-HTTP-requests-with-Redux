import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, fetchTasks } from "./tasksOps";
import { selectTextFilter } from "./filtersSlice";

const slice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addTask.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectTasks = (state) => state.tasks.items;

export const selectLoading = (state) => state.tasks.loading;

export const selectError = (state) => state.tasks.error;

//мемоізація складного селектора
export const selectVisibleTasks = createSelector(
  [selectTasks, selectTextFilter],
  (tasks, textFilter) => {
    return tasks.filter((task) =>
      task.text.toLowerCase().includes(textFilter.toLowerCase())
    );
  }
);

// export const selectVisibleTasks = (state) => {
//   const tasks = selectTasks(state);
//   const textFilter = selectTextFilter(state);

//   return tasks.filter((task) =>
//     task.text.toLowerCase().includes(textFilter.toLowerCase())
//   );
// };

export default slice.reducer;
