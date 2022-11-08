import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { useImmer } from 'use-immer'
import SideBar from './Components/SideBar/SideBar'
import Content from './Components/Content/Content'
import VerticalSeparator from './Components/VerticalSeparator/VerticalSeparator'
import styles from './App.module.css'

// Categories to hide
const HIDDEN_CATEGORIES = ['Uncategorized']

// Filtering keys of an object
const filterObjectKeys = (object, filter) => Object.keys(object).filter(category => filter.indexOf(category) === -1)

function App({ storage }) {

  const [data, setData] = useImmer(Object.assign({ // Merging initial data with the data from a storage
    Uncategorized: [] // "Uncategorized" is a hidden category that doesn't show in the SideBar
  }, storage))
  const [selectedCategory, setSelectedCategory] = useState('All')

  //--- Handlers
    const handleChangeCategory = e => {
      setSelectedCategory(e.target.getAttribute('name'))
    }

    const handleCheckBoxChange = (value, id, category) => {
      setData(draft => {
        draft[category].find(el => el.id === id).checked = value
      })
    }
    
    const handleNewTask = (taskTitle, category) => {
      category = category || 'Uncategorized'
      if (category === 'All') {
        category = 'Uncategorized'
      }

      setData(draft => {
        draft[category].push({title: taskTitle, category: category, id: uuid(), checked: false})
      })
    }
  
    const handleNewCategory = name => {
      setData(draft => {
        if (!draft.hasOwnProperty(name)) {
          draft[name] = []
        }
      })
    }

    const handleRemoveTask = (category, id) => {
      setData(draft => {
        draft[category].splice(draft[category].findIndex(el => el.id === id), 1)
      })
    }

    const handleRemoveCategory = (category) => {
      setData(draft => {
        if (category === selectedCategory) {
          setSelectedCategory('All')
        }
        delete draft[category]
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

  const categoriesForSideBar = filterObjectKeys(data, HIDDEN_CATEGORIES)
  categoriesForSideBar.unshift('All')

  return (
    <div className={styles['main-container']} ref={mainContainerEl}>
      <SideBar 
        categories={categoriesForSideBar} 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleChangeCategory} 
        onNewCategory={handleNewCategory}
        onCategoryDelete={handleRemoveCategory}>
      </SideBar>
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
  );
}

export default App