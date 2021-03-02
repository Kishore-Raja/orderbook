import { createSlice, current } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

export const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState: {
    snapshot: {},
  },
  reducers: {
    addSnapshot: (state, action) => {
      let payload = action.payload;
     // let payloadID = payload[0]
      let payloadData = payload[1]
      let channelData = payloadData.map(item => {
        let obj = {
          price: item[0],
          count: item[1],
          amount: item[2]
        };
        return obj;
      })
      let snapshotData ={
        "channelID": JSON.stringify(payload[0]),
        "channelData": channelData,
      };
      let prevData = current(state.snapshot);
      console.log(prevData.length);
    //  let snapshot =  isEmpty(prevData)?[snapshotData]:[prevData[0], snapshotData];
    let snapshot = {};
    if(isEmpty(prevData)){
      snapshot["bids"] = snapshotData;
    } else {
      snapshot["bids"] = prevData["bids"];
      snapshot["asks"] = snapshotData;
    }
      state.snapshot = snapshot;
    },
  },
});

export const { addSnapshot } = orderBookSlice.actions;

export const selectOrder = state => {
  console.log(state)
  return state.orderBook.snapshot;
}

export default orderBookSlice.reducer;
