import React from 'react'

export default function Grocery(props) {
  return (
    <div id='grocery-item'>
      <p>{props.item}</p>
      <button onClick={() => props.onClick(props.dashboardId, props.itemId)}>X</button>
    </div>
  )
}
