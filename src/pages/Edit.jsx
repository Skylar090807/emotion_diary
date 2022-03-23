import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Edit = () => {
  //Query String useSearchParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get(`id`)
  console.log('id :', id)

  const mode = searchParams.get(`mode`)
  console.log('mode :', mode)

  const SearchParamsHandler = () => {
    setSearchParams({
      who: 'skylar',
      id: 10,
      mode: 'dark',
    })
  }

  return (
    <div>
      <h1>Edit</h1>
      <p>일기 작성 페이지</p>
      <button onClick={SearchParamsHandler}>Query String 변경</button>
    </div>
  )
}

export default Edit
