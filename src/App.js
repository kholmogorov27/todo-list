import React, { useState, useEffect, useRef } from 'react'
import ContextProvider from './MainContext'
import SideBar from './Components/SideBar/SideBar'
import Content from './Components/Content/Content'
import VerticalSeparator from './Components/VerticalSeparator/VerticalSeparator'
import styles from './App.module.css'

function App() {

  //--- Container's height block
    const [containerHeight, setContainerHeight] = useState(0)
    // Main container ref
    const mainContainerEl = useRef(null)
    // Getting container's height to pass to the VerticalSeparator
    useEffect(() => {
      setContainerHeight(mainContainerEl.current.clientHeight)
    }, [])
  //---

  return (
    <ContextProvider>
      <div className={styles['main-container']} ref={mainContainerEl}>
        <h1 className={styles['logo']}>ToDo List</h1>
        <SideBar/>
        <VerticalSeparator height={containerHeight}></VerticalSeparator>
        <Content/>
      </div>
    </ContextProvider>
  )
}

export default App