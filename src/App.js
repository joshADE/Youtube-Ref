import React, { useEffect } from 'react';
import {  useDispatch } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';
import Sidebar from './components/Sidebar';
import VideoReferences from './components/VideoReferences';
import EditReference from './components/EditReference';
import CreateReference from './components/CreateReference';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AuthOptions from './components/auth/AuthOptions';
import { loadUser } from './features/user/userSlice';
import PlayReference from './components/PlayReference';
const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(loadUser());
  }, [])


  return (
    <Router>
      <div className="App">
        
        <Sidebar />
          <div className="routes">
            <div className="inner">
              <Switch>
                <ProtectedRoute exact path="/" component={VideoReferences} />
                <ProtectedRoute path="/edit/:id" component={EditReference} />
                <ProtectedRoute path="/create" component={CreateReference} />
                <ProtectedRoute path="/play/:id" component={PlayReference} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="*" component={() => "Page Not Found"} />
              </Switch>
            </div>
          </div>
          <AuthOptions />
        </div>
      
    </Router>
  );
}

export default App;
