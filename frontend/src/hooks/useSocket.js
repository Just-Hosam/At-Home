import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import socketIOClient from "socket.io-client";
import axios from 'axios';

 
export default function useSocket() {
  const [cookies, setCookie] = useCookies(['userID']);
  const [socketConn, setSocket] = useState(null);

  const [broadcast, setBroadcast] = useState({
    polls: false,
    photo: false,
    groceries: false,
    recipes: false,
    calendar: false,
    chores: false,
    invite: false
  });

 
  useEffect(() => {

    if(window.location.hostname !== 'localhost'){
      return;
    }

    const ENDPOINT = 'http://localhost:8080';
    const socket = socketIOClient(ENDPOINT);
    setSocket(socket);
   
    socket.on("message", widget => {

        if(widget){
         
          if(widget.includes('@')){
           
          return  setBroadcast((prev) => ({
            ...prev,
            invite: widget,
          }));
        
          } else  {

         return setBroadcast((prev) => ({
            ...prev,
            [widget]: Date.now(),
          }));

          }
        } 

        console.log('Error => @ websocket broadcast')

    });

  }, []);



  const sendSocketMessage = widget => {
  
  if(window.location.hostname !== 'localhost'){
    return;
  }

    let socket = socketConn; 
    
    if (!socket){
    const API = 'http://localhost:8080';
    socket = socketIOClient(API);
    setSocket(socket);
    socket.emit('input', widget);
    } else {
    socket.emit('input', widget);
    } 
  }

return {sendSocketMessage,broadcast}
}