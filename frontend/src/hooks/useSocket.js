import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

 
export default function useSocket() {
  
  const [socketConn, setSocket] = useState(null);

  const [broadcast, setBroadcast] = useState({
    polls: false,
    photo: false,
    groceries: false,
    recipes: false,
    calendar: false,
    chores: false
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
          console.log('Websocket Widget: ', widget);
          setBroadcast((prev) => ({
            ...prev,
            [widget]: Date.now(),
          }));

        } else {
          console.log('Error => @ websocket broadcast')
        }

    });

  

  }, []);


  const sendSocketMessage = widget => {
  
  if(window.location.hostname !== 'localhost'){
    return;
  }

    const socket = socketConn; 
    socket.emit('input', widget);
    
  }

return {sendSocketMessage,broadcast}
}