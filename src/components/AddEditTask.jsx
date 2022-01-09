import React, { useRef } from 'react';
import { Form, Input, Button, DatePicker, Select, notification } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import { setToLocalStorage } from '../helper';
import { FORMAT_DATE } from '../constants';

const { Option } = Select;

const PRIORITY_OPTIONS = ['LOW', 'NORMAL', 'HIGH'];

const AddEditTask = ({ task, tasks, setTasks, setIsActive }) => {
  const [form] = Form.useForm();
  const titleInputRef = useRef();

  const onFinish = (values) => {
    if (task) {
      editTask(values);
    } else {
      addTask(values);
    }

    form.resetFields();
    !task && titleInputRef.current.focus();
  };

  const addTask = (values) => {
    const newTask = [
      ...tasks,
      {
        ...values,
        id: uuidv4(),
        isDone: false,
      },
    ];
    notification.success({
      message: 'Add Task Successfully',
    });
    setToLocalStorage(newTask);
    setTasks(newTask);
  };

  const editTask = (values) => {
    tasks.forEach((item) => {
      if (item.id === task.id) {
        item.title = values.title;
        item.content = values.content;
        item.dueDate = values.dueDate;
        item.priority = values.priority;
      }
    });

    notification.success({
      message: 'Update Task Successfully',
    });

    setToLocalStorage(tasks);
    setTasks([...tasks]);
    setIsActive(false);
  };

  const disabledDate = (current) =>
    current && current < moment().startOf('day');

  return (
    <div className="create-app">
      <h2 className="title">{!task && 'New Task'}</h2>

      <Form
        initialValues={{
          title: task && task.title ? task.title : '',
          content: task && task.content ? task.content : '',
          dueDate:
            task && task.dueDate ? moment(task.dueDate) : moment(new Date()),
          priority: task && task.priority ? task.priority : PRIORITY_OPTIONS[1],
        }}
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={null}
          name="title"
          rules={[{ required: true, message: 'Title task is required' }]}
        >
          <Input ref={titleInputRef} placeholder="Add new task..." />
        </Form.Item>

        <div className="description-add">
          <h3>Description</h3>

          <Form.Item label={null} name="content">
            <Input.TextArea rows={6} />
          </Form.Item>
        </div>

        <div className="box">
          <div className="date-group">
            <h3>Due date</h3>

            <Form.Item
              label={null}
              name="dueDate"
              rules={[{ required: true, message: 'Due date is required' }]}
            >
              <DatePicker format={FORMAT_DATE} disabledDate={disabledDate} />
            </Form.Item>
          </div>

          <div className="priority">
            <h3>Priority</h3>
            <Form.Item label={null} name="priority">
              <Select placeholder="Select">
                {PRIORITY_OPTIONS.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <Button type="primary" className="btn-submit" htmlType="submit">
            {task ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEditTask;
