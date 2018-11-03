import React from 'react';


const IngredientName = (props) => {
  return (
  <li>
    <a onClick={() => props.update(props.value)}>{props.value}</a>
  </li>
  )
}



export default IngredientName
