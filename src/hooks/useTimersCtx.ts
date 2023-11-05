import {useContext} from 'react'
import {TimersContext} from '../store/timersCtx.tsx'

// Custom hook to export context and make sure it's not null
export const useTimersContext = () => {
  const ctx = useContext(TimersContext)

  if (ctx === null) throw new Error('TimersContext is null - that should not be the case!')

  return ctx
}
