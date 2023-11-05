import {type ReactNode, createContext, useReducer} from 'react'

export type TimerType = {  // Export for Timer.tsx
  name:string
  duration:number
}

type TimersStateType = {
  isRunning:boolean
  timers:TimerType[]
}

const initialState:TimersStateType = {  // Initial state for reducer
  isRunning: true,
  timers: []
}

type TimersContextType = TimersStateType & {  // Merge with methods to manipulate timer data
  addTimer: (timerData:TimerType) => void
  startTimers: () => void
  stopTimers: () => void
}

export const TimersContext = createContext<TimersContextType | null>(null)  // Export for custom hook useTimerCtx.ts

type TimersContextProviderProps = {
  children:ReactNode
}

type StartActionType = {
  type:'START'
}

type StopActionType = {
  type:'STOP'
}

type AddActionType = {
  type:'ADD'
  payload:TimerType
}

type ActionType = StartActionType | StopActionType | AddActionType  // Discriminated union because only 'ADD' has payload

const timersReducer = (state:TimersStateType, action:ActionType):TimersStateType => {
  if (action.type === 'START') return {...state, isRunning: true}
  if (action.type === 'STOP') return {...state, isRunning: false}
  if (action.type === 'ADD') return {...state, timers: [
    ...state.timers,
    {name: action.payload.name, duration:action.payload.duration}
  ]}
  return state  // If name is none of above
}

const TimersContextProvider = ({children}:TimersContextProviderProps) => {
  const [timersState, dispatch] = useReducer(timersReducer, initialState)

  const ctx:TimersContextType = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer: (timerData) => {
      dispatch({type: 'ADD', payload: timerData})
    },
    startTimers: () => {
      dispatch({type: 'START'})
    },
    stopTimers: () => {
      dispatch({type: 'STOP'})
    }
  }

  return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}

export default TimersContextProvider
