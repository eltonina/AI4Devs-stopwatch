// client/src/components/Stopwatch.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Stopwatch from './Stopwatch';

const mockStore = configureStore([]);

test('renders stopwatch component', () => {
  const store = mockStore({
    stopwatch: {
      startTime: null,
      currentTime: null,
      laps: [],
      running: false,
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <Stopwatch />
    </Provider>
  );

  expect(getByText('0.00s')).toBeInTheDocument();
});

test('start and stop stopwatch', () => {
  const store = mockStore({
    stopwatch: {
      startTime: null,
      currentTime: null,
      laps: [],
      running: false,
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <Stopwatch />
    </Provider>
  );

  fireEvent.click(getByText('▶️'));
  expect(getByText('⏸️')).toBeInTheDocument();

  fireEvent.click(getByText('⏸️'));
  expect(getByText('▶️')).toBeInTheDocument();
});

test('reset stopwatch', () => {
  const store = mockStore({
    stopwatch: {
      startTime: null,
      currentTime: null,
      laps: [],
      running: false,
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <Stopwatch />
    </Provider>
  );

  fireEvent.click(getByText('▶️'));
  fireEvent.click(getByText('🔄'));
  expect(getByText('0.00s')).toBeInTheDocument();
});
