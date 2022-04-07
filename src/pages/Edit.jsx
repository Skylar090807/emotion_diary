import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
  //Page Moving useNavigate()
  const navigate = useNavigate()

  const { id } = useParams()
  console.log(id)

  return (
    <div>
      <h2>Edit</h2>
    </div>
  )
}

export default Edit
