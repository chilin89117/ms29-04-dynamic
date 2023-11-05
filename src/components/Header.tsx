import {useTimersContext} from '../hooks/useTimersCtx.ts'
import Button from './ui/BtnNoCustomIdentifier.tsx'

const Header = () => {
  // Use custom hook instead of useContext() to ensure context is not null
  const {isRunning, startTimers, stopTimers} = useTimersContext()

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={isRunning ? stopTimers : startTimers}>
        {isRunning ? 'Stop' : 'Start'} Timers
      </Button>
    </header>
  )
}

export default Header
