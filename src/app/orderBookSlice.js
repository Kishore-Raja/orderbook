import { createSlice, current } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

export const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState: {
    snapshot: {},
    bids:{},
    asks:{}
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
      let prevData = current(state.bids);
    if(isEmpty(prevData)){
      state.bids = snapshotData;
    } else {
      state.asks = snapshotData;
    }
      
    },
    removeFromBid: (state, action) => {
      let payload = action.payload;
      console.log("payload",payload);
      let payloadData = payload[1];
      let prevData = current(state.bids);
      console.log("before delete", prevData["channelData"])
      let oldData = [...prevData["channelData"]]; 
      for(var i=0; i<oldData.length; i++) {
        if (oldData[i].price === payloadData[0]) {
            oldData.splice(i, 1);
            break;
        }
      }
      let snapshotData ={
        "channelID": JSON.stringify(payload[0]),
        "channelData": oldData,
      };
      console.log("after delete", oldData)
      state.bids = snapshotData;

    },
    removeFromAsk: (state, action) => {
      let payload = action.payload;
      console.log("payload",payload);
      let payloadData = payload[1];
      let prevData = current(state.asks);
      console.log("before delete", prevData["channelData"])
      let oldData = [...prevData["channelData"]]; 
      for(var i=0; i<oldData.length; i++) {
        if (oldData[i].price === payloadData[0]) {
            oldData.splice(i, 1);
            break;
        }
      }
      let snapshotData ={
        "channelID": JSON.stringify(payload[0]),
        "channelData": oldData,
      };
      console.log("after delete", oldData)
      state.asks = snapshotData;

    },
    addOrUpdateBid: (state, action) => {
      let payload = action.payload;
      console.log("payload",payload);
      let payloadData = payload[1];
      let prevData = current(state.bids);
      console.log("before delete", prevData["channelData"])
      let oldData = [...prevData["channelData"]]; 
      let updateBid = false;
      let updateObject = {
        price: payloadData[0],
        count: payloadData[1],
        amount: payloadData[2]
      }
      if(oldData[0].price < payloadData[0]){
        oldData.unshift(updateObject)
      } else {
      for(var i=0; i<oldData.length; i++) {
        if (oldData[i].price === payloadData[0]) {
         
            oldData[i] = updateObject;
            updateBid = true;
            console.log("updated")
            break;
        }
      }
      if(!updateBid){
        oldData.push(updateObject);
        console.log("added")
      }
    }
      let snapshotData ={
        "channelID": JSON.stringify(payload[0]),
        "channelData": oldData,
      };
      console.log("after delete", oldData)
      state.bids = snapshotData;

    },
    addOrUpdateAsk: (state, action) => {
      let payload = action.payload;
      console.log("payload",payload);
      let payloadData = payload[1];
      let prevData = current(state.asks);
      console.log("before delete", prevData["channelData"])
      let oldData = [...prevData.channelData] 
      let updateAsk = false;
      let updateObject = {
        price: payloadData[0],
        count: payloadData[1],
        amount: payloadData[2]
      }
      if(oldData[0].price < payloadData[0]){
        oldData.unshift(updateObject)
      } else {
      for(var i=0; i<oldData.length; i++) {
        if (oldData[i].price === payloadData[0]) {
         
            oldData[i] = updateObject;
            updateAsk = true;
            console.log("updated")
            break;
        }
      }
    
      if(!updateAsk){
        oldData.push(updateObject);
        console.log("added at the end");
      }
    }
      let snapshotData ={
        "channelID": JSON.stringify(payload[0]),
        "channelData": oldData,
      };
      console.log("after delete", oldData)
      state.asks = snapshotData;

    }
  },
});

export const { addSnapshot, removeFromBid, removeFromAsk, addOrUpdateBid, addOrUpdateAsk } = orderBookSlice.actions;

export const selectOrderBid = state => {
  console.log(state)
  return state.orderBook.bids;
}
export const selectOrderAsk = state => {
  console.log(state)
  return state.orderBook.asks;
}

export default orderBookSlice.reducer;
