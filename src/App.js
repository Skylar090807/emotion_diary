import { createContext, useReducer, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

//useReducer() 첫번째 인자 reducer 함수 구현
const reducer = (state, action) => {
  let newState = []
  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE': {
      // const newItem = {
      //   ...action.data,
      // }
      // newState = [newItem, ...state]
      newState = [action.data, ...state]
      break
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId)
      break
    }
    case 'Edit': {
      newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it))
      break
    }
    default:
      return state
  }
  return newState
}

export const DiaryStateContext = createContext()

export const DiaryDispatchContext = createContext()

const dummyData = [
  //date = 4월 1일 기준
  {
    id: 1,
    emotion: 1,
    content: 'Emotion Diary 01',
    date: 1648799995447,
  },
  {
    id: 2,
    emotion: 2,
    content: 'Emotion Diary 02',
    date: 1648799995448,
  },
  {
    id: 3,
    emotion: 3,
    content: 'Emotion Diary 03',
    date: 1648799995449,
  },
  {
    id: 4,
    emotion: 4,
    content: 'Emotion Diary 04',
    date: 1648799995450,
  },
  {
    id: 5,
    emotion: 5,
    content: 'Emotion Diary 05',
    date: 1648799995451,
  },
]

function App() {
  console.log(new Date().getTime())
  const [data, dispatch] = useReducer(reducer, dummyData)

  const dataId = useRef(0)

  //useReducer dispatch함수 구현
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
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
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={(onCreate, onRemove, onEdit)}>
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
