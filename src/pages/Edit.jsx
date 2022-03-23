import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Edit = () => {
  //Page Moving useNavigate()
  const navigate = useNavigate()

  const navigateHandler = () => {
    navigate('/')
  }

  const pagebackHandler = () => {
    navigate(-1)
  }

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
      <button onClick={pagebackHandler}>뒤로가기</button>
      <h1>Edit</h1>
      <p>일기 작성 페이지</p>
      <button onClick={SearchParamsHandler}>Query String 변경</button>

      <button onClick={navigateHandler}>Home으로 가기</button>
    </div>
  )
}

export default Edit
