import ContextProvider from './MainContext'
import SideBar from './Components/SideBar/SideBar'
import Content from './Components/Content/Content'
import styles from './App.module.css'

function App() {
  return (
    <ContextProvider>
      <div className={styles['main-container']}>
        <SideBar/>
        <Content/>
      </div>
    </ContextProvider>
  )
}

export default App