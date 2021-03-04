import { createSlice, current } from '@reduxjs/toolkit';

export const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState: {
    zoomLevel: 1,
    precision: 0,
    bids:{},
    asks:{},
    isCumulative:true,
    colOrder:"catp",
    isNormalView: true,
    socketConnection: "open",
    newFetch:true,
    fetchComplete:false,
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
      let prevData = current(state);
     // let isNewFetch = state.newFetch;
     console.log("prev", prevData)
    if(prevData.newFetch){
      console.log("enters asks")
      state.asks = snapshotData;
      state.newFetch = false;
    } else {
      console.log("enters bids")
      state.bids = snapshotData;
      state.fetchComplete = true;
    }
      
    },
    removeFromBid: (state, action) => {
      let payload = action.payload;
      let payloadData = payload[1];
      let prevData = current(state.bids);
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
      state.bids = snapshotData;
    },
    removeFromAsk: (state, action) => {
      let payload = action.payload;
      let payloadData = payload[1];
      let prevData = current(state.asks);
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
      state.asks = snapshotData;

    },
    addOrUpdateBid: (state, action) => {
      let payload = action.payload;
      let payloadData = payload[1];
      let prevData = current(state.bids);
      let oldData = [...prevData["channelData"]]; 
      let updateBid = false;
      let updateObject = {
        price: payloadData[0],
        count: payloadData[1],
        amount: payloadData[2]
      }
      for(var i=0; i<oldData.length; i++) {
        if (oldData[i].price === payloadData[0]) {
         
            oldData[i] = updateObject;
            updateBid = true;
            break;
        }
      }
      if(!updateBid){
        oldData.push(updateObject)
      }
      oldData.sort(function(a, b) {
        return b.price - a.price;
      });
      let snapshotData ={
        "channelID": JSON.stringify(payload[0]),
        "channelData": oldData,
      };
      state.bids = snapshotData;
    },
    addOrUpdateAsk: (state, action) => {
      let payload = action.payload;
      let payloadData = payload[1];
      let prevData = current(state.asks);
      let oldData = [...prevData.channelData] 
      let updateAsk = false;
      let updateObject = {
        price: payloadData[0],
        count: payloadData[1],
        amount: payloadData[2]
      }
      for(var i=0; i<oldData.length; i++) {
        if (oldData[i].price === payloadData[0]) {
         
            oldData[i] = updateObject;
            updateAsk = true;
            break;
        }
      }
      if(!updateAsk){
        oldData.push(updateObject)
      }
      oldData.sort(function(a, b) {
        return b.price - a.price;
      });
      let snapshotData ={
        "channelID": JSON.stringify(payload[0]),
        "channelData": oldData,
      };
      state.asks = snapshotData;

    },
    zoomIn: state => { 
      state.zoomLevel += 1 
    },
    zoomOut: state => { 
     state.zoomLevel -= 1  
    },
    increasePrecision: state => { 
      state.newFetch=true;
      state.fetchComplete=false;
     state.precision -= 1; 
    },
    decreasePrecision: state => { 
      state.newFetch=true;
      state.fetchComplete=false;
     state.precision += 1;  
    },
    updateDepthViz: (state,action) => {
      let payload =action.payload;
      state.isCumulative = (payload==="cumulative")?true:false;
    },
    updateColOrder: (state,action) => {
      let payload =action.payload;
      state.colOrder = payload;
    },
    updateView: (state,action) => {
      let payload =action.payload;
      state.isNormalView = (payload==="normal")?true:false;
    },
    updateSocketConnection: state => {
      state.socketConnection = "open"
    },
    closeSocketConnection: state => {
      state.socketConnection = "close"
    }

    
  },
});

export const { addSnapshot, removeFromBid, removeFromAsk, addOrUpdateBid, addOrUpdateAsk, zoomIn, zoomOut, increasePrecision, decreasePrecision, updateDepthViz, updateColOrder, updateView, closeSocketConnection, updateSocketConnection } = orderBookSlice.actions;

export const selectOrderBid = state => {
  return state.orderBook.bids;
}
export const selectOrderAsk = state => {
  return state.orderBook.asks;
}

export const getZoomLevel = state => {
  return state.orderBook.zoomLevel;
}

export const getPrecision = state => {
  return state.orderBook.precision;
}

export const getColOrder = state => {
  return state.orderBook.colOrder;
}

export const getDepthViz = state => {
  return state.orderBook.isCumulative;
}

export const getTableView = state => {
  return state.orderBook.isNormalView;
}

export const getSocketConnection = state => {
  return state.orderBook.socketConnection;
}

export const getFetchCompleteStatus = state => {
  return state.orderBook.fetchComplete;
}

export default orderBookSlice.reducer;
