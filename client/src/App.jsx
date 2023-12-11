import { useEffect, useState } from "react"
import Todo from "./components/Todo"


const App = () => {
  const [darkMode, setdarkMode] = useState(false)

  const ThemeMode = () => {


    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setdarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setdarkMode(false)
    }

    // Whenever the user explicitly chooses light mode
    localStorage.theme = 'light'

    // Whenever the user explicitly chooses dark mode
    localStorage.theme = 'dark'

    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem('theme')
  }

  useEffect(() => {
    ThemeMode()
  }, [])


  const handleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setdarkMode((prevDarkMode)=>{
      return !prevDarkMode
    })
  }
  return (
    <div className="dark:bg-slate-800 w-full min-h-screen">
      <div className="checkbox-wrapper-51 py-5 px-3">
        <input checked={darkMode} id="cbx-51" type="checkbox" onClick={handleDarkMode} />
        <label className="toggle" htmlFor="cbx-51">
          <span>
            <svg viewBox="0 0 10 10" height="10px" width="10px">
              <path d="M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z"></path>
            </svg>
          </span>
        </label>
      </div>



      <Todo  />
    </div>
  )
}

export default App