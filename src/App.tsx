import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './pages/HomePage'; // You need to create this component

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={HomePage} />
        {/* Add more routes for other pages if needed */}
      </Switch>
    </Router>
  );
};

export default App;


