import React from 'react'

export default function Grocery(props) {

  return (
    <div id='grocery-item'>
      <p>{props.item}</p>
      <button>X</button>
    </div>
  )
}
