import TimersContextProvider from './store/timersCtx.tsx'
import Header from './components/Header.tsx'  // <h1> and <button> to start/stop timer
import AddTimer from './components/AddTimer.tsx'  // Form to add timer
import Timers from './components/Timers.tsx'  // Display list of timers

const App = () => {
  return (
    <TimersContextProvider>
      <Header />

      <main>
        <AddTimer />
        <Timers />
      </main>
    </TimersContextProvider>
  )
}

export default App
