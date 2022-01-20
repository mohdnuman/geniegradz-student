import React, { Component } from 'react';
import {Navbar, CreateDoubtPage} from './index'

class App extends Component {
  render() {
    return (
      <div>
       <Navbar/>    
       <CreateDoubtPage />
      </div>
    )

  }
}

export default App;