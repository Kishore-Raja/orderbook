import React, { createContext } from 'react'
import {
    addSnapshot,
    removeFromBid,
    removeFromAsk,
    addOrUpdateBid,
    addOrUpdateAsk,
    getPrecision,
  } from './orderBookSlice';
import { useDispatch, useSelector } from 'react-redux';

const WebSocketContext = createContext(null)

export { WebSocketContext }

const Socket = ({ children }) => {
    let socket;
    const precision = useSelector(getPrecision);
 //   const socketConnection = useSelector(getSocketConnection)
    const dispatch = useDispatch();
    const subscribe = {
        "event": "subscribe",
        "channel": "book",
        "symbol": "tBTCUSD",
        "prec": `P${precision}`,
        "freq": "F1"
    };

    if (!socket) {
        socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
        
        socket.onopen = () => {
           // console.log("entering");
            socket.send(JSON.stringify(subscribe));
        };

        socket.onmessage = e => {
            const value = JSON.parse(e.data);
           if(Array.isArray(value) && value[1].length>3){
                dispatch(addSnapshot(value))
            } else if(Array.isArray(value) && value[1].length===3) {
                let channelData = value[1];
                if(channelData[1]===0){
                    if(channelData[2] === 1){
                        console.log("remove from bid");
                        dispatch(removeFromBid(value))
                    } else if(channelData[2] === -1){
                        console.log("remove from ask");
                     dispatch(removeFromAsk(value))
                    }
                } else {
                  if(channelData[2]>0){
                        console.log("update bid or add");
                      dispatch(addOrUpdateBid(value))
                    } else if(channelData[2]<0) {
                            console.log("update ask or add");
                      dispatch(addOrUpdateAsk(value))
                    }
                }
                 
             //   dispatch()
            }
            
        };
        

        
    }

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default Socket