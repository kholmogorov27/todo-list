import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuid } from 'uuid' //to remove
import { useImmer } from 'use-immer'
import ContextProvider from './MainContext'
import SideBar from './Components/SideBar/SideBar'
import Content from './Components/Content/Content'
import VerticalSeparator from './Components/VerticalSeparator/VerticalSeparator'
import styles from './App.module.css'

import dataFromStorage from './sampleData'

function App() {
  
  const [data, setData] = useImmer(Object.assign({ // Merging initial data with the data from a storage
    Uncategorized: [] // "Uncategorized" is a hidden category that doesn't show in the SideBar
  }, dataFromStorage))
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  //--- Handlers
  const handleNewCategory = name => { // 'category added'
    setData(draft => {
      if (!draft.hasOwnProperty(name)) {
        draft[name] = []
      }
    })
  }
  
  const handleRemoveCategory = (category) => { // 'category removed'
    setData(draft => {
      if (category === selectedCategory) {
        setSelectedCategory('All')
      }
      delete draft[category]
    })
  }

  const handleChangeCategory = e => { // 'category changed'
    setSelectedCategory(e.target.getAttribute('name'))
  }

  const handleCheckBoxChange = (value, id, category) => { // 'checkbox changed'
      setData(draft => {
        draft[category].find(el => el.id === id).checked = value
      })
    }
    
  const handleNewTask = (taskTitle, category) => { // 'task added'
    category = category || 'Uncategorized'
    if (category === 'All') {
      category = 'Uncategorized'
    }

    setData(draft => {
      draft[category].push({title: taskTitle, category: category, id: uuid(), checked: false})
    })
  }
  
  const handleRemoveTask = (category, id) => { // 'task removed'
    setData(draft => {
      draft[category].splice(draft[category].findIndex(el => el.id === id), 1)
    })
  }
  //---


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
        <Content 
          selectedCategory={selectedCategory} 
          data={data} 
          onCategoryChange={handleChangeCategory} 
          onNewTask={handleNewTask} 
          onCheckBoxChange={handleCheckBoxChange}
          onTaskDelete={handleRemoveTask}>
        </Content>
      </div>
    </ContextProvider>
  )
}

export default App