import { v4 as uuid } from 'uuid'
import TextBox from '../TextBox/TextBox'
import CheckBox from '../CheckBox/CheckBox'
import styles from './Content.module.css'

function Content({ selectedCategory, tasks }) {
  return (
    <div className={styles['content']}>
      <h1>{selectedCategory}</h1>
      <form>
        <TextBox placeholder={`Add a new task inside "${selectedCategory}" category`}/>
        <ul className={styles['list']}>
          {tasks.map(task => {
            const id = uuid()
            const label = <>{task.title}{task.category !== 'Uncategorized' && <span className={styles['task-tag']}>{task.category}</span>}</>
            return (
              <li key={id}><CheckBox label={label}/></li>
            )
          })}
        </ul>
      </form>
    </div>
  )
}

export default Content