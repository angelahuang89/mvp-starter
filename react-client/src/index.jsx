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
    this.showImagesAndQuotes = this.showImagesAndQuotes.bind(this);
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }
  
  addLike (key) {
    console.log('+1', key);
    $.ajax({
      url: '/items',
      method: 'GET',
      data: JSON.stringify({itemId: key, actionToTake: 'addLike'}),
      contentType: 'application/json',
      success: (data) => {
        console.log('added like', data);
      }
      error: (error) => {
        console.log('add error', error);
      }
    })
  }
  
  removeLike (key) {
    console.log('-1', key);
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
        this.showImagesAndQuotes();
      },
      error: (error) => {
        console.log('post error', error);
      }
    });
  }
  
  showImagesAndQuotes() {
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

  componentDidMount() {
    this.showImagesAndQuotes();
  }

  render () {
    return (<div>
      <h1>Art and Quote List</h1>
      <List items={this.state.items} addLike={this.addLike} removeLike={this.removeLike} />
      <Search handleSearch={this.searchForData}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));