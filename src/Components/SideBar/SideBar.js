import TextBox from '../TextBox/TextBox'
import styles from './SideBar.module.css'

function SideBar({ categories, selectedCategory }) {
  return (
    <div className={styles['side-bar']}>
      <ul className={styles['category-list']}>
        {categories.map(category => {
          return (
            <li className={category === selectedCategory && styles.active} key={category}>{category}</li>
          )
        })}
      </ul>
      <TextBox placeholder="Add a new category"></TextBox>
    </div>
  )
}

export default SideBar