
import React, { Component } from 'react';
import chance from 'chance';

const chanceInstance = chance();

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      severity: 'low', 
      errorMessage: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, errorMessage: '' }); 
  }

  handleAddTask = () => {
    const { title, description, severity } = this.state;

    if (!title || title.trim() === '') {
      this.setState({ errorMessage: 'Имя задачи не может быть пустым' });
      return;
    }

    const newTask = {
      id: chanceInstance.guid(),
      title,
      description,
      done: false,
      severity,
    };
   
    this.props.onAddTask(newTask);

    this.setState({ title: '', description: '', severity: 'low', errorMessage: '' });
  }

  render() {
    const { title, description, severity, errorMessage } = this.state;

    return (
      <div>
        <h2>Добавить задачу</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <input
          type="text"
          name="title"
          placeholder="Название задачи"
          value={title}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Описание задачи"
          value={description}
          onChange={this.handleInputChange}
        />
        <select name="severity" value={severity} onChange={this.handleInputChange}>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
        <button onClick={this.handleAddTask}>Добавить задачу</button>
        <button onClick={() => this.props.generateTasks(10)}>Сгенерировать 10 задач</button>
      </div>
    );
  }
}

export default AddTask;
