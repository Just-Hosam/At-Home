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

    const ENDPOINT = window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://api-dot-dashboard-310905.wl.r.appspot.com:8080';

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
  
    const socket = socketConn; 
    socket.emit('input', widget);
    
  }

return {sendSocketMessage,broadcast}
}