import React from 'react'

const EmotionItem = ({ emotion_id, emotion_img, emotion_descript }) => {
  return (
    <div>
      <img src={emotion_img} alt="" />
      <span>{emotion_descript}</span>
    </div>
  )
}

export default EmotionItem
