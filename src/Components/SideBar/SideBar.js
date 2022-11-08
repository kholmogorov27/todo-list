import TextBox from '../TextBox/TextBox'
import RemoveButton from '../RemoveButton/RemoveButton'
import styles from './SideBar.module.css'

const UNREMOVABLE_CATEGORIES = ['All']

function SideBar({ categories, selectedCategory, onCategoryChange, onNewCategory, onCategoryDelete }) {
  return (
    <div className={styles['side-bar']}>
      <ul className={styles['category-list']}>
        {categories.map(category => {
          return (
            <li 
              className={category === selectedCategory ? styles.active : ''} 
              name={category} 
              key={category} 
              onClick={onCategoryChange}>
                {category} {' '} 
                {UNREMOVABLE_CATEGORIES.indexOf(category) === -1 &&
                  <RemoveButton onClick={e => {
                    e.stopPropagation()
                    onCategoryDelete(category)
                  }}/>
                }
            </li>
          )
        })}
      </ul>
      <TextBox placeholder="Add a new category" onDone={onNewCategory}></TextBox>
    </div>
  )
}

export default SideBar