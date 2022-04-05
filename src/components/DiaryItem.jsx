import React from 'react'

const DiaryItem = ({ id, emotion, content, date }) => {
  const env = process.env
  env.PUBLIC_URL = env.PUBLIC_URL || ''

  return (
    <div className="DiaryItem">
      <div className={['emotion_img_wrap', `emtion_img_wrapper_${emotion}`].join(' ')}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="" />
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

export default DiaryItem
