import { createSelector } from '@reduxjs/toolkit';

export const selectIsLoading = state => state.tasks.isLoading;
export const selectError = state => state.tasks.error;
export const selectStatusFilter = state => state.filters.status;
export const selectTasks = state => state.tasks.items;

export const selectVisibleTasks = createSelector(
  [selectTasks, selectStatusFilter],
  (tasks, statusFilter) => {
    switch (statusFilter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }
);

export const selectTaskCount = createSelector([selectTasks], tasks => {
  console.log('task count');
  return tasks.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completed += 1;
      } else {
        acc.active += 1;
      }
      return acc;
    },
    { active: 0, completed: 0 }
  );
});
