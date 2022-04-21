import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DiaryStateContext } from '../App'
import DiaryEditor from '../components/DiaryEditor'

const Edit = () => {
  const [originData, setOriginData] = useState()

  //Page Moving useNavigate()
  const navigate = useNavigate()

  const { id } = useParams()
  console.log(id)

  const diaryList = useContext(DiaryStateContext)
  console.log('useContext() diaryList', diaryList)

  // id를 기준으로 해당 id에 맞는 diaryList의 data를 꺼내온다.
  // useEffect를 사용해 Edit component가 mount될 때 수행하도록 한다.
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        //
        (it) => Number(it.id) === parseInt(id),
      )
      console.log('targetDiary', targetDiary)

      // targetDiary는 truthy.
      if (targetDiary) {
        setOriginData(targetDiary)
      } else {
        //replace:true 는 navigate()로 해당 경로로 page 이동 시킨 뒤 그 경로로 replace해 뒤로가기가 되지 않는다.
        alert('존재하지 않는 일기입니다. 메인 페이지로 돌아갑니다. ')
        navigate('/', { replace: true })
      }
    }
  }, [id, diaryList])

  //useState() originData는 useEffect()에서 setOriginData(targetDiary)를 통해
  //targetDiary를 추적하고 있다.
  console.log('originData', originData)

  //originData가 있으면 <DiaryEditor/> 컴포넌트를 보여준다.
  //props를 전달하지 않으면 origin data가 적용되지 않으므로 props를 전달해 DiaryEditor가 해당 props들을
  //처리하도록 한다.
  return <div>{originData && <DiaryEditor isEdit={true} originData={originData} />}</div>
}

export default Edit
