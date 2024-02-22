import React from 'react';

const TaskFilter = ({ filter, onFilterChange }) => {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <select value={filter} onChange={handleFilterChange} className="border border-gray-200 rounded-md p-2 mr-2">
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default TaskFilter;
