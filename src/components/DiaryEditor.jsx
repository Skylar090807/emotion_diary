import React, { useState } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import EmotionItem from './EmotionItem'
import Header from './Header'

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ''

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion1.png`,
    emotion_descript: '행복해',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion2.png`,
    emotion_descript: '즐거워',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion3.png`,
    emotion_descript: '그냥 그래',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion4.png`,
    emotion_descript: '짜증나',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion5.png`,
    emotion_descript: '최악이야',
  },
]

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

const DiaryEditor = () => {
  //getStringDate 출력 확인
  console.log(getStringDate(new Date()))
  //getStringDate에 new Date()를 할당한 것과 아래는 동일하다.
  console.log(new Date().toISOString().slice(0, 10))

  const navigate = useNavigate()

  const contentRef = useRef()

  const [date, setDate] = useState(getStringDate(new Date()))
  const [emotion, setEmotion] = useState(3)
  const [content, setContent] = useState()

  const pagebackHandler = () => {
    navigate(-1)
  }

  const emotionClickHandler = (emotion) => {
    setEmotion(emotion)
  }

  const onChangeHandler = (event) => {
    setContent(event.target.value)
  }

  return (
    <div className="DiaryEditor">
      <Header headText={'새로운 일기'} leftChild={<Button text={'< 뒤로가기'} onClick={pagebackHandler} />} />
      <div>
        <section>
          <h4>날짜 선택</h4>
          <div className="input_box">
            <input className="input_date" value={date} type="date" onChange={(e) => setDate(e.target.value)} />
          </div>
        </section>
        <section>
          <h4>나의 감정</h4>
          <div className="input_box emotion_list_wrap">
            {emotionList.map((it) => (
              <EmotionItem //
                key={it.emotion_id}
                {...it}
                clickEvent={emotionClickHandler}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea //
              ref={contentRef}
              value={content}
              onChange={onChangeHandler}
              placeholder="어떤 하루를 보냈나요?"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default DiaryEditor
