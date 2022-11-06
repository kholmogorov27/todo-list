import React, { useState, useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'
import SideBar from './Components/SideBar/SideBar'
import Content from './Components/Content/Content'
import VerticalSeparator from './Components/VerticalSeparator/VerticalSeparator'
import styles from './App.module.css'

// Filtering keys of an object
const filterObjectKeys = (object, filter) => Object.keys(object).filter(category => filter.indexOf(category) === -1)

function App({ storage }) {
  const HIDDEN_CATEGORIES = ['Uncategorized']

  const [data, setData] = useImmer(Object.assign({
    // The "All" getter combines all the tasks in one array
    get All() {
      const allTasks = []
      const keys = Object.keys(this)

      // Excluding the "All" getter
      keys.splice(keys.indexOf('All'), 1)
      
      keys.forEach(category => allTasks.push(...this[category]))
      return allTasks
    },
    // Uncategorized is a hidden category that doesn't show in the SideBar
    Uncategorized: []
  }, storage))
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  //--- Handlers
    const handleChangeCategory = e => {
      setSelectedCategory(e.target.getAttribute('name'))
    }
  //---
  /*
  const addTask = (taskTitle, category) => {
    category = category || 'Uncategorized'
    setData(draft => {
      draft[category].push({title: taskTitle, category: category})
    })
  }

  const addCategory = (name) => {
    setData(draft => {
      draft[name] = []
    })
  }
  */

  
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
    <div className={styles['main-container']} ref={mainContainerEl}>
      <SideBar categories={filterObjectKeys(data, HIDDEN_CATEGORIES)} selectedCategory={selectedCategory} handleCategoryChange={handleChangeCategory}></SideBar>
      <VerticalSeparator height={containerHeight}></VerticalSeparator>
      <Content selectedCategory={selectedCategory} tasks={data[selectedCategory]} handleCategoryChange={handleChangeCategory}></Content>
    </div>
  );
}

export default App