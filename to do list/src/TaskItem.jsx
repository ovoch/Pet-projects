
import React from 'react';
import styles from './TaskItem.module.css';

class TaskItem extends React.Component {
  handleCheckboxChange = () => {
    const { task, onDoneToggle } = this.props; 
    onDoneToggle(task.id); 
  };

  handleDelete = () => {
    const { task, onDelete } = this.props; 
    onDelete(task.id); 
  };

  render() {
    const { task } = this.props;

    return (
      <li className={task.done ? styles.done : ''}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={this.handleCheckboxChange} 
        />
        <span onClick={this.handleCheckboxChange}>
          <strong>{task.title}</strong>
        </span>
        <p>{task.description}</p>
        <span>{task.severity}</span>
        <button onClick={this.handleDelete} className={styles.deleteButton}>Удалить</button>
      </li>
    );
  }
}

export default TaskItem;
