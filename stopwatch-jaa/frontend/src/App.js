import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TimerPage from './pages/TimerPage';
import { TimerProvider } from './context/TimerContext';

const App = () => (
  <TimerProvider>
    <Router>
      <Switch>
        <Route path="/" component={TimerPage} />
      </Switch>
    </Router>
  </TimerProvider>
);

export default App;
