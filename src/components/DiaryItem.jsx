import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate()

  const env = process.env
  env.PUBLIC_URL = env.PUBLIC_URL || ''

  const strDate = new Date(parseInt(date)).toLocaleDateString()

  const goDetail = () => {
    navigate(`/diary/${id}`)
  }

  const goEdit = () => {
    navigate(`/edit/${id}`)
  }
  return (
    <div className="DiaryItem">
      <div onClick={goDetail} className={['emotion_img_wrap', `emtion_img_wrapper_${emotion}`].join(' ')}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="" />
      </div>
      <div onClick={goDetail} className="info_wrap">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrap">
        <Button text={'수정하기'} type={'negative'} onClick={goEdit} />
      </div>
    </div>
  )
}

export default DiaryItem
