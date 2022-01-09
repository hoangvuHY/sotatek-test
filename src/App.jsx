import { Input, notification } from 'antd';
import { useEffect, useState } from 'react';

import './App.css';

import { getTaskList, setToLocalStorage } from './helper';
import Task from './components/Task';
import AddEditTask from './components/AddEditTask';

function App() {
  const [tasks, setTasks] = useState(getTaskList);
  const [filterArray, setFilterArray] = useState(tasks);
  const [search, setSearch] = useState('');

  const handleChangeSearch = (event) => setSearch(event.target.value);

  const handleRemoveTaskDone = () => {
    const filterTask = tasks.filter((task) => !task.isDone);

    notification.success({
      message: 'Remove Task Successfully',
    });
    setToLocalStorage(filterTask);
    setTasks(filterTask);
  };

  const sortDate = (task, taskNext) =>
    new Date(taskNext.dueDate).getTime() - new Date(task.dueDate).getTime();

  useEffect(() => {
    if (search) {
      const filterTask = tasks.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilterArray(filterTask);
    } else {
      setTasks(tasks);
    }
  }, [search, tasks]);

  const taskArray = search ? filterArray : tasks;

  return (
    <div className="app">
      <div className="todo-app">
        <AddEditTask tasks={tasks} setTasks={setTasks} />
      </div>

      <div className="todo-list">
        <h2 className="title">To do list</h2>
        <Input
          placeholder="Search..."
          onChange={(val) => handleChangeSearch(val)}
        />

        <div className="list-task">
          {taskArray.length !== 0 ? (
            taskArray.sort(sortDate).map((task, index) => (
              <div key={index}>
                <Task task={task} tasks={tasks} setTasks={setTasks} />
              </div>
            ))
          ) : (
            <p className="task-empty">Task Empty</p>
          )}
        </div>

        {taskArray.filter((task) => task.isDone).length > 0 && (
          <div className="bulk-action">
            <div className="title">Bulk Action</div>

            <div className="button-group">
              <button className="done">Done</button>
              <button className="remove" onClick={handleRemoveTaskDone}>
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
