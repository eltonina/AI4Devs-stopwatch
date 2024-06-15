// client/src/store/reducers/stopwatchReducer.js
const initialState = {
    startTime: null,
    currentTime: null,
    laps: [],
    running: false,
  };
  
  const stopwatchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'START':
        return { ...state, running: true, startTime: action.payload };
      case 'STOP':
        return { ...state, running: false };
      case 'RESET':
        return initialState;
      case 'LAP':
        return { ...state, laps: [...state.laps, action.payload] };
      case 'TICK':
        return { ...state, currentTime: action.payload };
      default:
        return state;
    }
  };
  
  export default stopwatchReducer;
  