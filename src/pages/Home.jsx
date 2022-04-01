import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import { DiaryStateContext } from '../App'

const Home = () => {
  //useContext 사용해 DiaryStateContext.Provider에서 value로 공급한 data를 diaryList에 대입.
  const diaryList = useContext(DiaryStateContext)

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
