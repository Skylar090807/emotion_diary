import { createContext, useEffect, useReducer, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

//useReducer() 첫번째 인자 reducer 함수 구현
//state는 action을 수행 이전 state 값이다.
//action은 switch 조건문에 따라 실행 될 type.
const reducer = (state, action) => {
  let newState = []
  console.log('action', action)
  console.log('state', state)

  switch (action.type) {
    case 'INIT': {
      return action.list
    }
    case 'CREATE': {
      // const newItem = {
      //   ...action.data,
      // }
      // newState = [newItem, ...state]
      newState = [action.list, ...state] // state.unshift(action.list)
      break
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId)
      break
    }
    case 'Edit': {
      newState = state.map((it) => (it.id === action.list.id ? { ...action.list } : it))
      break
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
