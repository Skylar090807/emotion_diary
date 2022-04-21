import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DiaryStateContext } from '../App'
import Button from '../components/Button'
import Header from '../components/Header'
import { getStringDate } from '../util/date'
import { emotionList } from '../util/emotionList'

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ''

const Diary = () => {
  //Path Variable
  const { id } = useParams()
  console.log(id)

  const [diaryDetail, setDiaryDetail] = useState()

  const navigate = useNavigate()

  const diaryList = useContext(DiaryStateContext)

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        //
        (it) => Number(it.id) === Number(id),
      )
      console.log(targetDiary)

      if (targetDiary) {
        setDiaryDetail(targetDiary)
      } else {
        alert('존재하지 않는 일기입니다. 메인 페이지로 돌아갑니다. ')
        navigate('/', { replace: true })
      }
    }
  }, [id, diaryList])

  const pagebackHandler = () => {
    navigate(-1)
  }

  const goEditHandler = () => {
    navigate(`/edit/${diaryDetail.id}`)
  }

  //useEffect()의 diaryDetail은 useEffect()에서 setDiary(targetDiary)를 통해
  //targetDiary를 추적 중.
  console.log('diaryDetail', diaryDetail)

  if (!diaryDetail) {
    return <div>다이어리가 없습니다.</div>
  } else {
    const currentEmotion = emotionList.find(
      //
      (it) => Number(it.emotion_id) === Number(diaryDetail.emotion),
    )
    console.log('emotionList', emotionList)
    console.log('currentEmotion', currentEmotion)

    return (
      <div className="DiaryPage">
        <Header //
          headText={`${getStringDate(new Date(diaryDetail.date))} 나의 감정`}
          leftChild={
            <Button //
              text={'< 뒤로가기'}
              onClick={pagebackHandler}
            />
          }
          rightChild={
            <Button //
              text={'수정하기'}
              onClick={goEditHandler}
            />
          }
        />
        <article>
          <section>
            <h4>오늘 나의 감정</h4>
            <div className={['diary_img_wrapper', `diary_img_wrapper_${diaryDetail.emotion}`].join(' ')}>
              <img src={currentEmotion.emotion_img} alt="" />
              <div className="emotion_descript">{currentEmotion.emotion_descript}</div>
            </div>
          </section>
          <section>
            <h4>나의 일기</h4>
            <div className="diary_content_wrapper">
              <div className="diary_content">{diaryDetail.content}</div>
            </div>
          </section>
        </article>
      </div>
    )
  }
}

export default Diary
