import React, { useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'

const Home = () => {
  const [curDate, setCurDate] = useState(new Date())
  console.log(curDate)

  //getMonth는 0월 부터 시작해서 +1 해줘야 한다.
  const headerTxt = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()))
  }

  const decreseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()))
  }
  return (
    <div>
      <Header
        headText={headerTxt}
        leftChild={<Button text={'<'} onClick={decreseMonth} />}
        rightChild={<Button text={'>'} onClick={increaseMonth} />}
      />
    </div>
  )
}

export default Home
