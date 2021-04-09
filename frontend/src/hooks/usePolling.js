import { useState, useEffect } from "react";
import axios from "axios";

export default function useAxios() {

  const dash_id = 1; // <-------- TEMP. DASHBOARD_ID FOR TESTING

  //set initial state
  const [state, setState] = useState({
    polls: [],
  });

  //fetch db data 
  useEffect(() => {
    Promise.all([
      axios.get(`/dashboard/${dash_id}/polls`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        polls: all[0].data,
      
      }));
     
    });
  }, []);

  return { state };
}