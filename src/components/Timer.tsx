import {useEffect, useRef, useState} from 'react'
import Container from './ui/Container.tsx'  // Section 4
import {type TimerType} from '../store/timersCtx.tsx'  // Section 5
import { useTimersContext } from '../hooks/useTimersCtx.ts'

// let timer  // Won't work because it will be shared across all instances of <Timer>

const Timer = ({name, duration}:TimerType) => {
  const {isRunning} = useTimersContext()

  // Initialize state to duration in ms set by user
  const [remainingTime, setRemainingTime] = useState(duration * 1000)

  // Create ref to interval in useEffect() initalized to null but will eventually store a number
  const intervalRef = useRef<number | null>(null)

  // 'intervalRef.current' could be null, so add a type check and clear interval in useEffect()
  if (intervalRef.current && remainingTime <= 0) clearInterval(intervalRef.current)

  // let timer  // Won't work because it will get recreated every time <Timer> runs

  useEffect(() => {
    let timer:number

    if (isRunning) {
      timer = setInterval(() => {
        setRemainingTime(prev => prev <= 0 ? prev : prev - 50)  // See video 78
      }, 50)  // Update remaining time every 50ms
      
      // 'timer' is not available for if-check outside useEffect(), so use a reference
      intervalRef.current = timer
    } else if (intervalRef.current) {  // 'isRunning' is definitely false here
      // Clean up when <Timer> unmounts
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(timer)
  }, [isRunning])  // Will run twice in React.StrictMode or when 'isRunning' changes

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2)  // Convert time in ms to s
  
  return (
    <Container as='article'>
      <h2>{name}</h2>
      <p>
        <progress max={duration} value={formattedRemainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  )
}

export default Timer
