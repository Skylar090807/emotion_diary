import React from 'react'
import { useParams } from 'react-router-dom'

const Diary = () => {
  //Path Variable
  const { id } = useParams()
  console.log(id)

  return <div>Diary</div>
}

export default Diary
