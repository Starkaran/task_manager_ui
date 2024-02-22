import React from 'react';

const Task = ({ task, onUpdateStatus, onDelete }) => {

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'bg-yellow-200 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-200 text-blue-800';
      case 'Done':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="border border-gray-200 p-4 rounded-md mb-4">
      <h3 className="font-semibold mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-md text-sm ${getStatusColor(task.status)}`}>{task.status}</span>
        <div>
          {task.status === 'To Do' && <button className="mr-2 text-sm text-blue-600" onClick={() => onUpdateStatus(task.id, 'In Progress')}>Start</button>}
          <button className="mr-2 text-sm text-red-600" onClick={() => onDelete(task.id)}>Delete</button>
          {task.status !== 'Done' && <button className="text-sm text-green-600" onClick={() => onUpdateStatus(task.id, 'Done')}>Done</button>}
        </div>
      </div>
    </div>
  );
};

export default Task;
