import React, { Component } from 'react';
import NavBar from './components/NavBar'
import LeaveApplication from './components/Application';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
          <LeaveApplication />
      </div>
    )
  }
}

export default App;
