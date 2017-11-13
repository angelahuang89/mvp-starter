import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: ''
    };
    
    this.handleFilter = this.handleFilter.bind(this);
    this.startFilter = this.startFilter.bind(this);
  }

  handleFilter (event) {
    this.setState({ filterValue: event.target.value });  
  }

  startFilter () {
    this.props.onFilter(this.state.filterValue);
    this.setState({
      filterValue: ''
    })
  }
  
  render() {
    return (<div>
      <label>
        <input value={this.state.filterValue} onChange={this.handleFilter} />
      </label>
        <button onClick={this.startFilter} >filter</button>
    </div>)
  }
}

export default Filter;