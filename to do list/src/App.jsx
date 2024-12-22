
import React, { Component } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import Filters from './Filters';
import chance from 'chance';
import styles from './styles.module.css';

const chanceInstance = chance();

class App extends Component {
  state = {
    tasks: [],
    filteredTasks: [],
    filter: { search: '', severity: [], showCompleted: true },
  };

  generateTasks = (count) => {
    const tasks = Array.from({ length: count }).map(() => ({
      id: chanceInstance.guid(),
      title: chanceInstance.word(),
      description: chanceInstance.sentence({ words: 5 }),
      done: chanceInstance.bool(),
      severity: chanceInstance.pickone(['low', 'medium', 'high']),
    }));

    this.setState({ tasks, filteredTasks: tasks });
  };

  filterTasks = () => {
    const { tasks, filter } = this.state;
    let filteredTasks = tasks;

    if (!filter.showCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.done);
    }

    if (filter.search) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    if (filter.severity.length) {
      filteredTasks = filteredTasks.filter(task =>
        filter.severity.includes(task.severity)
      );
    }

    this.setState({ filteredTasks });
  };

  handleFilterChange = (newFilter) => {
    this.setState({ filter: { ...this.state.filter, ...newFilter } }, this.filterTasks);
  };

  addTask = (newTask) => {
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
      filteredTasks: [...prevState.filteredTasks, newTask],
    }));
  };

  toggleTaskDone = (taskId) => {
    this.setState(prevState => {
      const tasks = prevState.tasks.map(task =>
        task.id === taskId ? { ...task, done: !task.done } : task 
      );
      const filteredTasks = tasks.filter(task => prevState.filter.showCompleted || !task.done); 
      return { tasks, filteredTasks };
    });
  };
  
  deleteTask = (taskId) => {
    this.setState(prevState => {
      const tasks = prevState.tasks.filter(task => task.id !== taskId); 
      const filteredTasks = tasks.filter(task => prevState.filter.showCompleted || !task.done); 
      return { tasks, filteredTasks };
    });
  };

  render() {
    const { filteredTasks } = this.state;

    return (
      <div className={styles.container}>
        <h1>Todoist</h1>
        <AddTask onAddTask={this.addTask} generateTasks={this.generateTasks} />
        <Filters filter={this.state.filter} onFilterChange={this.handleFilterChange} />
        <TaskList tasks={filteredTasks} onDoneToggle={this.toggleTaskDone} onDelete={this.deleteTask} /> {}
        {filteredTasks.length === 0 && <p>По вашим критериям ничего не найдено</p>}
      </div>
    );
  }
}

export default App;
