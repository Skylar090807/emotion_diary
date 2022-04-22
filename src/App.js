import { createContext, useEffect, useReducer, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

//useReducer() 첫번째 인자 reducer 함수 구현
//state는 action을 수행 이전 state 값이다. 초기화된 빈 배열 상태.(로컬스토리지 사용 중 이므로 로컬스토리지에 남아있는 data)
//action은 switch 조건문에 따라 실행 될 type. action엔 list와 type이 있다.
const reducer = (state, action) => {
  let newState = []
  console.log('action', action)
  console.log('state', state)

  switch (action.type) {
    case 'INIT': {
      return action.list
      //action.list는 현재 다이어리 리스트가 담겨있으므로 return action.list는 현재 일기를 return하는 것.
    }
    case 'CREATE': {
      // const newItem = {
      //   ...action.data,
      // }
      // newState = [newItem, ...state]
      newState = [action.list, ...state] // state.unshift(action.list)
      break
      //reducer 함수 안에서 멤버 변수로 선언한 빈 배열 newState에 action.list를 담고, 이전 state를 복사해 담는다.
      //따라서 현재 일기와 이전 일기를 보여주는 것이다.
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId)
      break
      //state의 이전 값을 filter해 이전 값에 있는 id와 action.targetId 현재 수행된 아이디가 다른 것만 보여준다.
      //따라서 전달 받은 targetId와 다른 것만 보여주는 것이므로 전달 받은 targetId data는 보여주지 않는다.
    }
    case 'EDIT': {
      newState = state.map((it) => (it.id === action.list.id ? { ...action.list } : it))
      break
      //이전 값인 state를 map으로 순회하하며 state id와 action.list.id가 같으면 현재 수행하는 action.list를 복사해 보여주고
      //아니라면 state를 보여준다. 즉 현재 수행 중인 id의 변경 사항을 복사해 보여주므로 결과적으로는 수정 된다.
    }
    default:
      return state
  }

  localStorage.setItem('diary', JSON.stringify(newState))
  return newState
}

export const DiaryStateContext = createContext()

export const DiaryDispatchContext = createContext()

function App() {
  /*
    useReducer()
    배열 형태로 구조할당 받는 list, dispatch 설명.
    -list : 추적 할 state, 초기값을 빈 배열로 줬으니 빈 배열로 시작
    -dispatch : reducer에서 따로 구현해 준 action을 dispatch해주는 함수
    useRedcer() arguments 설명.
    -reducer: 이전 값 state, type이 실행 될 action을 arguments로 받아 따로 구현하는 함수. 
  */
  const [list, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const localStorageData = localStorage.getItem('diary')
    if (localStorageData) {
      const diaryList = JSON.parse(localStorageData).sort((a, b) => Number(b.id) - Number(a.id))

      dataId.current = Number(diaryList[0].id) + 1

      console.log('localStorage diaryList', diaryList)
      console.log('dataId', dataId)

      dispatch({ type: 'INIT', list: diaryList })
    }
  }, [])

  const dataId = useRef(0)

  //useReducer dispatch 함수 구현
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      list: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    })
    dataId.current += 1
  }

  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId })
  }

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      list: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    })
  }

  return (
    <DiaryStateContext.Provider value={list}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary" element={<Diary />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  )
}

export default App
