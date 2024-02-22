import React, { useState, useEffect } from 'react';
import {fetchTasks, createTask, updateTaskStatus, deleteTask} from '../../Api';
import Task from './Task';
import useToaster from '../utils/useToaster';
import TaskFilter from './TaskFilter';

const Dashboard = () => {
  const { showToast, ToastComponent } = useToaster();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilterTask] = useState([]);
  const [filter, setFilter] = useState('All'); 
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      await createTask(newTask);
      showToast('Task successfully added!', 'success');
      setNewTask({ title: '', description: '', status: 'To Do' });
      await loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      showToast(error.response.data.message, 'error');
    }
  };

  const editTaskStatus = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      showToast('Task successfully updated!', 'success');
      await loadTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      showToast(error.response.data.errors, 'error');
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      showToast('Task successfully removed!', 'success');
      await loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      showToast(error.response.data.errors, 'error');
    }
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    console.log('Filter:', selectedFilter);
    let filterTasks = tasks.filter(task => task.status === selectedFilter);
    console.log('Filtered tasks:', filterTasks);
    setFilterTask(filterTasks);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      {ToastComponent}
      <h1 className="text-3xl font-semibold mb-4">Task Dashboard</h1>
      <TaskFilter filter={filter} onFilterChange={handleFilterChange} />
      <form className="mb-8" onSubmit={(e) => { e.preventDefault(); addTask(); }}>
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-200 rounded-md p-2 my-1 mr-2"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="border border-gray-200 rounded-md p-2 my-1 mr-2"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          required
        />
        <select
          className="border border-gray-200 rounded-md p-2 my-1 mr-2"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Add Task</button>
      </form>
      <div>
        {(filter !== 'All' ? filteredTasks : tasks)?.map(task => (
          <Task
            key={task.id}
            task={task}
            onUpdateStatus={editTaskStatus}
            onDelete={removeTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
