import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    };

    this.searchForData = this.searchForData.bind(this);
  }
  
  searchForData (searchTerm) {
    console.log(searchTerm, 'searched!');
    // handle user input
    // call post function
    $.ajax({
      url: '/items',
      method: 'POST',
      data: JSON.stringify({query: searchTerm}),
      contentType: 'application/json',
      success: (data) => {
        console.log('posted', data);
      },
      error: (error) => {
        console.log('post error', error);
      }
    });
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      method: 'GET',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Art and Quote List</h1>
      <List items={this.state.items}/>
      <Search handleSearch={this.searchForData}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));