import React from 'react'
import { useState } from 'react'

const sortOptionList = [
  { value: 'latest', name: '최신 일기' },
  { value: 'oldest', name: '오랜 일기' },
]

const ControlMenu = ({ value, onChange, optionList }) => {
  //value prop: ControlMenu가 렌더링 하는 select가 어떤 것을 선택하고 있는지 알려주는 역할.
  //onChange prop: select가 변경되었을 때 바꿀 기능을 하는 함수.
  //optionList prop: select 태그 안의 options.
  return <select></select>
}

const DiaryList = ({ diaryList }) => {
  //정렬 기준이 되는 state
  const [sortType, setSortType] = useState('latest')

  return (
    <div>
      {/* controlMenu의 value prop역할은 정렬기준이 되는 sortType을 변화시키는 select의 역할을 하기때문에 value에 sortType을 내려준다. */}
      {/* onChange prop의 역할은 select가 변화 되었을 때 수행되어야 하므로 setSortType을 내려준다. */}
      {/* optionList prop의 역할은 어떤 일기인지 option을 보여주는 것이므로 일기 종류를 배열로 담고있는 sortOptionList를 내려준다. */}
      <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
      {diaryList.map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: [],
}
export default DiaryList
