import React, { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DiaryDispatchContext } from './../App'
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

const getStringDate = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (month < 10) {
    month = `0${month}`
  }

  if (day < 10) {
    day = `0${day}`
  }

  return `${year}-${month}-${day}`
}

const DiaryEditor = () => {
  const navigate = useNavigate()

  const contentRef = useRef()

  const [date, setDate] = useState(getStringDate(new Date()))
  const [emotion, setEmotion] = useState(3)
  const [content, setContent] = useState()

  const { onCreate } = useContext(DiaryDispatchContext)

  const pagebackHandler = () => {
    navigate(-1)
  }

  const emotionClickHandler = (emotion) => {
    setEmotion(emotion)
  }

  const onChangeHandler = (event) => {
    setContent(event.target.value)
  }

  const submitHandler = () => {
    if (!content) {
      contentRef.current.focus()
    } else {
      onCreate(date, content, emotion)
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="DiaryEditor">
      <Header //
        headText={'새로운 일기'}
        leftChild={<Button text={'< 뒤로가기'} onClick={pagebackHandler} />}
      />
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
        <section>
          <div className="control_button_wrap">
            <Button text={'작성 취소'} type={'negative'} onClick={pagebackHandler} />
            <Button text={'일기 저장'} type={'positive'} onClick={submitHandler} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default DiaryEditor
