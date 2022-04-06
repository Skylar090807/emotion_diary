import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Header from '../components/Header'

// '오늘의 날짜 선택' 캘린더에서 오늘의 날짜가 default로 떠있게 하기 위해서는 new Date()객체를 함수
// 안에서 .toISOString().slice(0, 10)로 가공 해준 후 useState() 초기값으로 할당해줘야 한다.
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10)
  //toISOString은 new Date()객체의 메서드.
  //toISOString() 출력
  // 2022-04-06T02:07:07.202Z

  //date.toISOString().slice(0, 10) 출력
  // 2022-04-06
}

const New = () => {
  //getStringDate 출력 확인
  console.log(getStringDate(new Date()))
  //getStringDate에 new Date()를 할당한 것과 아래는 동일하다.
  console.log(new Date().toISOString().slice(0, 10))

  const navigate = useNavigate()

  const [date, setDate] = useState(getStringDate(new Date()))

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
            <input value={date} type="date" onChange={(e) => setDate(e.target.value)} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default New
