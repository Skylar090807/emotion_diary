import React from 'react'

const Button = ({ text, type, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
