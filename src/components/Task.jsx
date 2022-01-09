import React, { useEffect, useState } from 'react';
import { Checkbox, notification } from 'antd';

import AddEditTask from './AddEditTask';
import { setToLocalStorage } from '../helper';

const Task = ({ task, tasks, setTasks }) => {
  const [isActive, setIsActive] = useState(false);
  const [taskItem, setTaskItem] = useState(task);

  const handleRemoveTask = () => {
    const filterTask = tasks.filter((item) => item.id !== taskItem.id);

    notification.success({
      message: 'Remove Task Successfully',
    });

    setToLocalStorage(filterTask);
    setTasks(filterTask);
    setIsActive(false);
  };

  const handleChangeDoneTask = (event) => {
    tasks.forEach((item) => {
      if (item.id === taskItem.id) {
        item.isDone = event.target.checked;
        setTaskItem(item);
      }
    });

    setToLocalStorage(tasks);
    setTasks([...tasks]);
  };

  useEffect(() => {
    setTaskItem(task);
  }, [task]);

  return (
    <>
      <div className="task-detail">
        <div className="content">
          <Checkbox checked={taskItem.isDone} onChange={handleChangeDoneTask} />
          <div className="des">{taskItem.title}</div>
        </div>

        <div className="group-button">
          <button className="detail" onClick={() => setIsActive(!isActive)}>
            Detail
          </button>
          <button className="remove" onClick={() => handleRemoveTask()}>
            Remove
          </button>
        </div>
      </div>

      {isActive && (
        <div className="edit-task">
          <AddEditTask
            task={taskItem}
            tasks={tasks}
            setTasks={setTasks}
            setIsActive={setIsActive}
          />
        </div>
      )}
    </>
  );
};

export default Task;
