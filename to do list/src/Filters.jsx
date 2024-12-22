
import React from 'react';

class Filters extends React.Component {
  handleSearchChange = (event) => {
    this.props.onFilterChange({ search: event.target.value });
  }

  handleSeverityChange = (event) => {
    const { value, checked } = event.target;
    const currentSeverity = this.props.filter.severity;

    const severity = checked
      ? [...currentSeverity, value]
      : currentSeverity.filter(sev => sev !== value);

    this.props.onFilterChange({ severity });
  }
  

  render() {
    const { filter } = this.props;

    return (
      <div>
        <input
          type="text"
          placeholder="Поиск..."
          value={filter.search}
          onChange={this.handleSearchChange}
        />
        <label>
          <input
            type="checkbox"
            checked={filter.showCompleted}
            onChange={() => this.props.onFilterChange({ showCompleted: !filter.showCompleted })}
          />
          Скрыть выполненные
        </label>
        <div>
          {['low', 'medium', 'high'].map(sev => (
            <label key={sev}>
              <input
                type="checkbox"
                value={sev}
                checked={filter.severity.includes(sev)}
                onChange={this.handleSeverityChange}
              />
              {sev.charAt(0).toUpperCase() + sev.slice(1)}
            </label>
          ))}
        </div>
      </div>
    );
  }
}

export default Filters;
