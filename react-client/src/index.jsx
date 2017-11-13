import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import Filter from './components/Filter.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    };

    this.searchForData = this.searchForData.bind(this);
    this.showImagesAndQuotes = this.showImagesAndQuotes.bind(this);
    this.changeLike = this.changeLike.bind(this);
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
    this.onFilter = this.onFilter.bind(this);
    // this.showRandom = this.showRandom.bind(this);
  }
  
  changeLike (key, likes, action) {
    $.ajax({
      url: '/changeLike',
      method: 'POST',
      data: JSON.stringify({ itemId: key, likes: likes, actionToTake: action }),
      contentType: 'application/json',
      success: (data) => {
        console.log('added like', data);
        this.showImagesAndQuotes();
      },
      error: (error) => {
        console.log('add error', error);
      }
    });
  }
  
  addLike (key, likes) {
    console.log('+1', key, likes);
    this.changeLike(key, likes, 'addLike');
  }
  
  removeLike (key, likes) {
    console.log('-1', key, likes);
    this.changeLike(key, likes, 'removeLike');
  }
  
  searchForData (searchTerm) {
    console.log(searchTerm);
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
        console.log(searchTerm);
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
      error: (error) => {
        console.log('err', error);
      }
    });  
  }
  
  onFilter (searchTerm) {
    console.log(searchTerm, 'filtered!');
    $.ajax({
      url: '/filter',
      method: 'POST',
      data: JSON.stringify({query: searchTerm}),
      contentType: 'application/json',
      success: (data) => {
        console.log(data.length);
        this.setState({
          items: data
        })
      },
      error: (error) => {
        console.log('error!', error);
      }
    });  
  }
  
  // showRandom () {
  //   var randomNum = Math.floor(Math.random() * this.state.items.length);
  //   this.setState({items: this.state.items[randomNum]});
  // }
  // <button onClick={this.showRandom} >Random!</button>

  componentDidMount() {
    this.showImagesAndQuotes();
  }

  render () {
    return (<div>
      <h1>Art and Quotes</h1>
      <Search handleSearch={this.searchForData}/>
      <Filter onFilter = {this.onFilter}/>
      <button onClick={this.showImagesAndQuotes}> show all </button>
      <List items={this.state.items} addLike={this.addLike} removeLike={this.removeLike} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));