
import React from 'react';
import TaskItem from './TaskItem';

class TaskList extends React.Component {
  render() {
    const { tasks, onDoneToggle, onDelete } = this.props; 

    return (
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onDoneToggle={onDoneToggle} onDelete={onDelete} /> 
        ))}
      </ul>
    );
  }
}

export default TaskList;
