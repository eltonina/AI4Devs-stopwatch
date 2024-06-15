// client/src/App.js
import React from 'react';
import Stopwatch from './components/Stopwatch';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Stopwatch />
      </div>
    </Provider>
  );
}

export default App;
