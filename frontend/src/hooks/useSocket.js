import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080"; // <--- change for production

export default function useSocket() {

  const [socketConn, setSocket] = useState(null);

  const [broadcast, setBroadcast] = useState({
    polls: false,
    photos: false,
    groceries: false,
    recipes: false,
    calendar: false,
    chores: false
  });

  useEffect(() => {

    const socket = socketIOClient(ENDPOINT);
    setSocket(socket);

    socket.on("message", widget => {
     
        if(widget){
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
  
    const socket = socketConn;  
    socket.emit('input', widget);
  }

return {sendSocketMessage,broadcast}
}