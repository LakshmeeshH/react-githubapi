import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      id: '',
      avatar_url: '',
      html_url: '',
      bio: '',
      location: '',
      public_repos: '',
      followers: '',
      following: ''
    };
  }

  getUser(username) {
    return fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(res => {
        return res;
      });
  }

  async handleSubmit(e) {
    e.preventDefault();

    let user = await this.getUser(this.refs.username.value);

    this.setState({
      username: user.name,
      id: user.id,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
      bio: user.bio,
      location: user.location,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following
    });
  }

  render() {
    let user;
    if (this.state.username) {
      user = (
        <div className="row">
          <div className="col s12 m6 push-m6">
            <div className="card ">
              <div className="card-image">
                <img src={this.state.avatar_url} alt="Profile" />
                <span className="card-title">{this.state.username}</span>
              </div>
              <div className="card-content">
                <p>{this.state.bio}</p>
              </div>
              <div className="card-action">{this.state.html_url}</div>
            </div>
          </div>
          <div className="col s12 m6 pull-m6">
            <ul className="collection">
              <li className="collection-item">
                <span style={{ color: 'red' }}> Location: </span>
                {this.state.location}
              </li>
              <li className="collection-item">
                <span style={{ color: 'red' }}> Public Repos: </span>
                {this.state.public_repos}
              </li>
              <li className="collection-item">
                <span style={{ color: 'red' }}> Followers: </span>
                {this.state.followers}
              </li>
              <li className="collection-item">
                <span style={{ color: 'red' }}> Following: </span>
                {this.state.following}
              </li>
            </ul>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <div className="container">
          <ul className="collection with-header">
            <li className="collection-header">
              <h4 className="red-text text-lighten-2">GitHub Finder</h4>
            </li>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div className="container">
                <input ref="username" type="text" placeholder="username" />
              </div>
            </form>
            <div className="container">{user}</div>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
