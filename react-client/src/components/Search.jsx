import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }; 
    
    this.handleChange = this.handleChange.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }
  
  handleChange (event) {
    this.setState({ value: event.target.value });
  }
  
  startSearch () {
    this.props.handleSearch(this.state.value);
    this.setState({
      value: ''
    })
  }
  
  render () {
    return (<div>
      <label>
        <input value={this.state.value} onChange={this.handleChange} />
      </label>
        <button onClick={this.startSearch} >search</button>
    </div>)
  } 
}

export default Search;