import React, { Component } from 'react';
import NavBar from './components/NavBar'
import Signup from './components/Signup';

class App extends Component {
  render() {
    return (
        <div>
          <NavBar />
          <Signup />
        </div>
    )
  }
}

export default App;
