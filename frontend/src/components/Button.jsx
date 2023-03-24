import React from 'react'

const Button = (props) => {
  return (
    <div>
      <a href={props.link}>{props.name}</a>
    </div>
  )
}

export default Button