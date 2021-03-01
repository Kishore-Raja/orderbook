import { createSlice, current } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

export const socketSlice = createSlice({
  name: 'orderBook',
  initialState: {
    snapshot: [],
  },
  reducers: {
    addSnapshot: (state, action) => {
      let payload = action.payload;
      let snapshotData ={
        "channelID": JSON.stringify(payload[0]),
        "channelData": payload[1],
      };
      let prevData = current(state.snapshot);
      let snapshot =  isEmpty(prevData)?[snapshotData]:[prevData[0], snapshotData];
      state.snapshot = snapshot;
    
    },
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, addSnapshot} = socketSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.socket.value)`
export const selectOrder = state => state.snapshot;

export default socketSlice.reducer;
