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
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  )
}

//diaryList prop은 Home.jsx에서 useContext로 받아 온 data를 대입해준 것.
const DiaryList = ({ diaryList }) => {
  //정렬 기준이 되는 state
  const [sortType, setSortType] = useState('latest')

  //ControlMenu option 선택 시 해당 일기 보여주는 기능 구현.

  //diaryList를 최신 순으로 정렬하는 함수 getProcessedDiaryList 구현.
  //배열 diaryList prop 깊은 복사!
  //diaryList.sort()를 사용하면 기존 배열 자체가 변경되기 때문에
  // 깊은 복사를 한 후 JSON.parse(JSON.stringify())함수를 사용해 데이터를 붙여 넣어 주고 copyList에 대입한다.
  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date)
      } else {
        return parseInt(a.date) - parseInt(b.date)
      }
    }

    const copyList = JSON.parse(JSON.stringify(diaryList))
    const sortedList = copyList.sort(compare)
    return sortedList
  }

  return (
    <div>
      {/* controlMenu의 value prop역할은 정렬기준이 되는 sortType을 변화시키는 select의 역할을 하기때문에 value에 sortType을 내려준다. */}
      {/* onChange prop의 역할은 select가 변화 되었을 때 수행되어야 하므로 setSortType을 내려준다. */}
      {/* optionList prop의 역할은 어떤 일기인지 option을 보여주는 것이므로 일기 종류를 배열로 담고있는 sortOptionList를 내려준다. */}
      <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: [],
}
export default DiaryList
