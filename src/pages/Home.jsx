import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import { DiaryStateContext } from '../App'
import { useEffect } from 'react'
import DiaryList from '../components/DiaryList'

const Home = () => {
  //useContext 사용해 DiaryStateContext.Provider에서 value로 공급한 data를 diaryList에 대입.
  const diaryList = useContext(DiaryStateContext)

  // data 가공위해 useState() 💽
  const [data, setData] = useState([])

  const [curDate, setCurDate] = useState(new Date())
  console.log(curDate)

  //getMonth는 0월 부터 시작해서 +1 해줘야 한다.
  const headerTxt = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

  // data 가공위해 useEffect() 💽
  useEffect(() => {
    //diaryList가 비어있을 때는 수행하지 않도록 if문 걸기.
    if (diaryList.length >= 1) {
      //firstDay는 오늘 날짜 해당 월에 첫번째 날
      const firstDay = new Date(
        //
        curDate.getFullYear(),
        curDate.getMonth(),
        1,
      ).getTime()
      console.log('firstDay : ', new Date(firstDay))

      //lastDay는 오늘 날짜 해당 월에 마지막 날
      const lastDay = new Date(
        //
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59,
      ).getTime()
      console.log('lastDay : ', new Date(lastDay))

      //setData에서 diaryList는(App.js에서 공급받은  data) filter()를 사용하여 가공한다.
      setData(
        diaryList.filter(
          //
          (it) => firstDay <= it.date && lastDay >= it.date,
        ),
      )
    }
  }, [curDate, diaryList]) // diaryList를 deps에 전달하지 않으면 diaryList가 변경 되었을 때 useEffect가 동작하지 않는다.

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()))
  }

  const decreseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()))
  }

  useEffect(() => {
    console.log('data 변경 : ', data)
  }, [data])
  return (
    <div>
      <Header
        headText={headerTxt}
        leftChild={<Button text={'<'} onClick={decreseMonth} />}
        rightChild={<Button text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  )
}

export default Home
