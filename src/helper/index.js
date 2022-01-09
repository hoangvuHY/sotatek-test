import { TASK_LIST } from '../constants';

export const setToLocalStorage = (tasks) => localStorage.setItem(TASK_LIST,
    JSON.stringify(tasks)
);

export const getTaskList = JSON.parse(localStorage.getItem(TASK_LIST)) || [];
