import React, { useState, useEffect } from 'react'

import Grocery from './Grocery';

export default function Groceries() {
  // const dashboardId = 1;

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/dashboards/${dashboardId}/groceries/`)
  //     .then((res) => setGroceries(res))
  //     .catch(err => console.log('I AM A COMPONENT ERROR', err))
  // })
  const tempGroceries = [
    {
      "id": 1,
      "dashboard_id": 1,
      "text": "milk",
      "done": false
    },
    {
      "id": 2,
      "dashboard_id": 1,
      "text": "cereal",
      "done": false
    },
    {
      "id": 4,
      "dashboard_id": 1,
      "text": "juice",
      "done": false
    },
    {
      "id": 5,
      "dashboard_id": 1,
      "text": "cheese",
      "done": true
    },
    {
      "id": 16,
      "dashboard_id": 1,
      "text": "pens",
      "done": true
    },
    {
      "id": 3,
      "dashboard_id": 1,
      "text": "chicken",
      "done": true
    }
  ]

  const [groceries, setGroceries] = useState(tempGroceries);

  const unCheckedList = groceries.filter(grocery => !grocery.done);
  const checkedList = groceries.filter(grocery => grocery.done);

  const unCheckedComponents = unCheckedList.map(grocery => <Grocery itemId={grocery.id} item={grocery.text} />)
  const checkedComponents = checkedList.map(grocery => <Grocery itemId={grocery.id} item={grocery.text} />)
  
  return (
    <div id='widget-groceries'>
      <h1>Groceries</h1>
      <div id='input-groceries'>
        <input type="text"/>
        <button>Hello</button>
      </div>
      {unCheckedList.length > 0 && unCheckedComponents}
      <p>checked list</p>
      {checkedList.length > 0 && checkedComponents}
    </div>
  )
}
