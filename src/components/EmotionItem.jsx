import React from 'react'

const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, clickEvent, isSelected }) => {
  const clickEventHandler = () => {
    clickEvent(emotion_id)
  }

  return (
    <div //
      className={['EmotionItem', isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`].join(' ')}
      onClick={clickEventHandler}
    >
      <img src={emotion_img} alt="" />
      <span>{emotion_descript}</span>
    </div>
  )
}

export default EmotionItem
