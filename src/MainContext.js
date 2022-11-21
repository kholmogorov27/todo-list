import { v4 as uuid } from 'uuid'
import { createContext } from 'react'
import { useImmerReducer } from 'use-immer'
import dataFromStorage from './sampleData'

export const MainContext = createContext(null)
export const MainDispatchContext = createContext(null)

export default function ContextProvider({ children }) {
  const [context, dispatch] = useImmerReducer(mainReducer, {
    data: dataFromStorage,
    selectedCategory: 'All'
  })

  return (
    <MainContext.Provider value={context}>
      <MainDispatchContext.Provider value={dispatch}>
        {children}
      </MainDispatchContext.Provider>
    </MainContext.Provider>
  )
}

function mainReducer(draft, action) {
  switch (action.category) { // Category of an action
    case 'category': {
      switch (action.type) {
        case 'added': {
          runWithDependencies(() => {
            if (!draft.hasOwnProperty(action.name)) {
              draft.data[action.name] = []
            }
          }, [['action.name', action.name]])
          break
        }
        case 'removed': {
          runWithDependencies(() => {
            // Change category to 'All' if the removed category was selected
            if (action.name === draft.selectedCategory) {
              draft.selectedCategory = 'All'
            }
            delete draft.data[action.name]
          }, [['action.name', action.name]])

          break
        }
        case 'changed': {
          runWithDependencies(() => {
            draft.selectedCategory = action.name
          }, [['action.name', action.name]])
          break
        }
        default: {
          throw Error(`Unknown type: ${action.type} for ${action.category} category`)
        }
      }
      break
    }
    case 'task': {
      switch (action.type) {
        case 'added': {
          runWithDependencies(() => {
            if (action.taskCategory === 'All' || typeof action.taskCategory === 'undefined') {
              action.taskCategory = 'Uncategorized'
            }
            draft.data[action.taskCategory].push({title: action.title, category: action.taskCategory, id: uuid(), checked: false})
          }, [['action.title', action.title], ['action.taskCategory', action.taskCategory]])
          break
        }
        case 'removed': {
          runWithDependencies(() => {
            for (const category in draft.data) {
              if (draft.data.hasOwnProperty(category)) {
                const index = draft.data[category].findIndex(task => task.id === action.id)
                if (index !== -1) {
                  draft.data[category].splice(index, 1)
                  break
                }
              }
            }
          }, [['action.id', action.id]])
          break
        }
        default: {
          throw Error(`Unknown type: ${action.type} for ${action.category} category`)
        }
      }
      break
    }
    case 'checkbox': {
      switch (action.type) {
        case 'changed': {
          runWithDependencies(() => {
            for (const category in draft.data) {
              if (draft.data.hasOwnProperty(category)) {
                const index = draft.data[category].findIndex(task => task.id === action.id)
                if (index !== -1) {
                  draft.data[category][index].checked = action.value
                  break
                }
              }
            }
          }, [['action.value', action.value], ['action.id', action.id]])
          break
        }
        default: {
          throw Error(`Unknown type: ${action.type} for ${action.category} category`)
        }
      }
      break      
    }
    default: {
      throw Error('Unknown category: ' + action.category)
    }
  }
}

function runWithDependencies(callback, dependencies) {
  // Checking the dependencies
  const map = new Map(dependencies)
  if (!checkDependencies(map)) return
  //---

  callback()
}

// Check whether all the dependencies satisfied or not
function checkDependencies(dependencies, throwError=true) {
  for (const [name, dependency] of dependencies) {
    if (typeof dependency === 'undefined') {
      if (throwError) {
        throw Error('Dependency "' + name + '" is undefined')
      }
      return false
    }
  }
  return true
}