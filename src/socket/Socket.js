import React, { createContext } from 'react'
//import io from 'socket.io-client';
//import { WS_BASE } from './config';
import {
    addSnapshot,
  } from './socketSlice';
import { useDispatch } from 'react-redux';
//import { updateChatLog } from './actions';

const WebSocketContext = createContext(null)

export { WebSocketContext }

const Socket = ({ children }) => {
    let socket;
  //  let ws;

    const dispatch = useDispatch();

    const subscribe = {
        "event": "subscribe",
        "channel": "book",
        "symbol": "tBTCUSD",
        "pair": "BTCUSD",
        "prec": "P0",
        "freq":"F0",
        "len": 100
    };

    if (!socket) {
        socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
        /*,{
            extraHeaders: {
                'Access-Control-Allow-Origin': "*"
            }
        });*/
        
        socket.onopen = () => {
            socket.send(JSON.stringify(subscribe));
        };

        socket.onmessage = e => {
            const value = JSON.parse(e.data);
            let snapshot = {}
           if(Array.isArray(value) && value[1].length>3){
                console.log("channel id", value);
               
                dispatch(addSnapshot(value))
            } else {
        //        console.log("object",value);
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