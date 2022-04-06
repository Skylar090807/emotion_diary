import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Header from '../components/Header'

// '오늘의 날짜 선택' 캘린더에서 오늘의 날짜가 default로 떠있게 하기 위해서는 new Date()객체를 함수
// 안에서 가공 해준 후 useState() 초기값으로 할당해줘야 한다.
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10)
}

const New = () => {
  const navigate = useNavigate()

  const [date, setDate] = useState()

  const pagebackHandler = () => {
    navigate(-1)
  }
  return (
    <div>
      <Header headText={'새로운 일기'} leftChild={<Button text={'< 뒤로가기'} onClick={pagebackHandler} />} />
      <div>
        <section>
          <h4>오늘의 날짜 선택</h4>
          <div className="input-box">
            <input type="date" onChange={(e) => setDate(e.target.value)} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default New
