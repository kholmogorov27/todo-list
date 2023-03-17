import { useContext } from 'react'
import TextBox from '../TextBox/TextBox'
import RemoveButton from '../RemoveButton/RemoveButton'
import { MainContext, MainDispatchContext } from '../../MainContext'
import styles from './SideBar.module.css'

// Unremovable categories 
const UNREMOVABLE_CATEGORIES = ['All']
// Categories to hide
const HIDDEN_CATEGORIES = ['Uncategorized']

// Filtering (excluding) keys out of an object by names from the filter
function filterObjectKeys(object, filter) {
  return Object.keys(object)
    .filter(category => filter.indexOf(category) === -1)
}

function SideBar() {
  const context = useContext(MainContext)
  const dispatch = useContext(MainDispatchContext)

  function handleAddCategory(name) {
    dispatch({
      category: 'category',
      type: 'added',
      name: name
    })
  }
  function handleRemoveCategory(name) {
    dispatch({
      category: 'category',
      type: 'removed',
      name: name
    })
  }
  function handleChangeCategory(e) {
    const category = e.target.getAttribute('name')
    
    dispatch({
      category: 'category',
      type: 'changed',
      name: category
    })
  }

  // Getting filtered list of categories (w/o HIDDEN_CATEGORIES)
  const categories = filterObjectKeys(context.data, HIDDEN_CATEGORIES)
  // Adding the abstract category "All" to the list
  categories.unshift('All')

  return (
    <div className={styles['side-bar']}>
      <ul className={styles['category-list']}>
        {categories.map(category => {
          return (
            <li 
              className={category === context.selectedCategory ? styles.active : ''} 
              name={category}
              key={category}
              onClick={handleChangeCategory}>
                {category} {' '} 
                {UNREMOVABLE_CATEGORIES.indexOf(category) === -1 &&
                  <RemoveButton onClick={e => {
                    e.stopPropagation()
                    handleRemoveCategory(category)
                  }}/>
                }
            </li>
          )
        })}
      </ul>
      <TextBox 
        className='add-new'
        placeholder="Add a new category" 
        onDone={handleAddCategory}/>
    </div>
  )
}

export default SideBar