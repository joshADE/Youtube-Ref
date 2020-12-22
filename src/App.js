import React, { useState, useEffect } from 'react';
import VidoePlayer from './components/VidoePlayer';
import VidoeReferencer from './components/VideoReferencer'
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import VideoSearch from './components/VideoSearch';
import Sidebar from './components/Sidebar';
import VideoReferences from './components/VideoReferences';
import EditReference from './components/EditReference';
import CreateReference from './components/CreateReference';

const App = () => {



  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="routes">
          <Route exact path="/" component={VideoReferences} />
          <Route path="/edit/:id" component={EditReference} />
          <Route path="/create" component={CreateReference} />
        </div>
      </div>
    </Router>
  );
}

export default App;
