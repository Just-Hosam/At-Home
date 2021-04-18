import React, { useState } from 'react';
import Chores from './Chores';
import DoneChores from './DoneChores';

export default function Chore() {
  const [choresList, setChoresList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [progress, setProgress] = useState({
    total: 0,
    current: 0,
  });

  return (
    <>
      <Chores
        choreState={{
          choresList,
          setChoresList,
          doneList,
          setDoneList,
          progress,
          setProgress,
        }}
      />
      <DoneChores
        choreState={{
          choresList,
          setChoresList,
          doneList,
          setDoneList,
          progress,
          setProgress,
        }}
      />
    </>
  );
}
