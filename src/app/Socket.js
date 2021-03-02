import React, { createContext } from 'react'
//import { WS_BASE } from './config';
import {
    addSnapshot,
  } from './orderBookSlice';
import { useDispatch } from 'react-redux';

const WebSocketContext = createContext(null)

export { WebSocketContext }

const Socket = ({ children }) => {
    let socket;
    const dispatch = useDispatch();
    const subscribe = {
        "event": "subscribe",
        "channel": "book",
        "symbol": "tBTCUSD",
        "pair": "BTCUSD",
        "prec": "P0",
        "freq":"F0"
    };

    if (!socket) {
        socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
        
        socket.onopen = () => {
            socket.send(JSON.stringify(subscribe));
        };

        socket.onmessage = e => {
            const value = JSON.parse(e.data);
           if(Array.isArray(value) && value[1].length>3){
            //    console.log("channel id", value);
               
                dispatch(addSnapshot(value))
            } else if(Array.isArray(value) && value[1].length===3) {
                console.log("channel data",value);
                let channelID = value[0];
                let channelData = value[1];
                if(channelData[1]==0){
                    if(channelData[2] == 1){
                        console.log("remove from bid");
                       // dispatch(removeFromBid(value))
                    } else {
                        console.log("remove from ask");
                    }
                } else {
                  if(channelData[2]>0){
                        console.log("update bid or add");
                    } else {
                            console.log("update ask or add");
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