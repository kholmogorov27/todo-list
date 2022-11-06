import TextBox from '../TextBox/TextBox'
import styles from './SideBar.module.css'

function SideBar({ categories, selectedCategory, handleCategoryChange }) {
  return (
    <div className={styles['side-bar']}>
      <ul className={styles['category-list']}>
        {categories.map(category => {
          return (
            <li className={category === selectedCategory ? styles.active : ''} name={category} key={category} onClick={handleCategoryChange}>{category}</li>
          )
        })}
      </ul>
      <TextBox placeholder="Add a new category"></TextBox>
    </div>
  )
}

export default SideBar