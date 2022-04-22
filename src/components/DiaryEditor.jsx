import React, { useState, useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DiaryDispatchContext } from './../App'
import Button from './Button'
import EmotionItem from './EmotionItem'
import Header from './Header'
import { getStringDate } from '../util/date'
import { emotionList } from '../util/emotionList'
import { useCallback } from 'react'

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ''

//isEdit, originData는 Edit 컴포넌트에서 보낸 props.
const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate()

  const contentRef = useRef()

  const [date, setDate] = useState(getStringDate(new Date()))

  //emotionList의 emotion_id: 3을 초기값으로 준다.
  const [emotion, setEmotion] = useState(3)
  const [content, setContent] = useState('')

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext)

  const pagebackHandler = () => {
    navigate(-1)
  }

  const emotionClickHandler = useCallback((emotion) => {
    setEmotion(emotion)
  }, [])

  const onChangeHandler = (event) => {
    setContent(event.target.value)
  }

  const submitHandler = () => {
    // if (!content) {
    //   contentRef.current.focus()
    //   return
    // }
    if (content.length < 1) {
      contentRef.current.focus()
      return
    }

    if (window.confirm(isEdit ? '수정된 일기를 저장할까요?' : '새로운 일기를 저장할까요?')) {
      if (!isEdit) {
        // isEdit이 아니면 onCreate()을 수행한다.
        onCreate(date, content, emotion)
      } else {
        // isEdit이면 onEdit()을 수행한다.
        // useContext()로 주입된 src/App.js의 함수 onEdit의 parameter targetId는 argument originData.id로 받는다.
        onEdit(originData.id, date, content, emotion)
      }
    }

    navigate('/', { replace: true })
  }

  const removeHandler = () => {
    if (window.confirm('확인을 누르면 일기가 삭제됩니다.')) {
      onRemove(originData.id)
      navigate('/', { replace: true })
    }
  }

  //page/Editor 컴포넌트에서 넘겨받은 props처리
  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(Number(originData.date))))
      setEmotion(originData.emotion)
      setContent(originData.content)
    }
  }, [isEdit, originData])

  console.log('origindata', originData)

  return (
    <div className="DiaryEditor">
      <Header //
        headText={isEdit ? '일기 수정하기' : '새로운 일기'}
        leftChild={<Button text={'< 뒤로가기'} onClick={pagebackHandler} />}
        // rightChild={isEdit ? <Button text={'삭제하기'} onClick={() => {}} /> : ''}
        rightChild={isEdit && <Button text={'삭제하기'} type={'negative'} onClick={removeHandler} />}
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
