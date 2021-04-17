import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function AddChore(props) {
  const dashboardId = 1; // TODO: needs useContext
  const [input, setInput] = useState("");

  const addNewChore = (input) => {
    axios
      .post(`/dashboards/${dashboardId}/chores/`, { text: input })
      .then((res) => {
        props.setChoresList([...props.choresList, res.data]);
        setInput("");
      })
      .catch((err) => console.log("ERROR AT addNewChore", err));
  };

  return (
    <form
      style={{ display: "flex", justifyContent: "center" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        id="chores-text"
        label="Add Chore"
        variant="outlined"
        size="small"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
      />
      <Button
        id="chores-btn"
        variant="contained"
        onClick={() => addNewChore(input)}
      >
        <i className="fas fa-plus"></i>
      </Button>
    </form>
  );
}
