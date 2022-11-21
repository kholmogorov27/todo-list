import { useContext } from 'react'
import TextBox from '../TextBox/TextBox'
import CheckBox from '../CheckBox/CheckBox'
import RemoveButton from '../RemoveButton/RemoveButton'
import { MainContext, MainDispatchContext } from '../../MainContext'
import styles from './Content.module.css'

function Content() {
  const context = useContext(MainContext)
  const dispatch = useContext(MainDispatchContext)
  
  function handleChangeCategory(e) {
    const category = e.target.getAttribute('name')
    
    dispatch({
      category: 'category',
      type: 'changed',
      name: category
    })
  }
  function handleAddTask(title, taskCategory) {
    dispatch({
      category: 'task',
      type: 'added',
      title: title,
      taskCategory: taskCategory
    })
  }
  function handleRemoveTask(id) {
    dispatch({
      category: 'task',
      type: 'removed',
      id: id
    })
  }
  function handleChangeCheckBox(value, id) {
    dispatch({
      category: 'checkbox',
      type: 'changed',
      value: value,
      id: id
    })
  }

  let tasks = []
  
  // Getting all the tasks
  const _tasks = tasks
  for (const category in context.data) {
    if (context.data.hasOwnProperty(category)) {
      context.data[category].forEach(task => {
        _tasks.push(task)
      })
    }
  }
  
  // Filtering tasks according to the selected category
  if (context.selectedCategory !== 'All') {
    tasks = tasks.filter(t => t.category === context.selectedCategory)
  }

  return (
    <div className={styles['content']}>
      <h1>{context.selectedCategory}</h1>
      <form>
        <TextBox 
          placeholder={`Add a new task inside "${context.selectedCategory}" category`} 
          onDone={title => handleAddTask(title, context.selectedCategory)}/>
        <ul className={styles['list']}>
          {tasks.map(task => {
            const label = 
            <>
              {task.title}
              {task.category !== 'Uncategorized' && 
                <span 
                  className={styles['task-tag']} 
                  name={task.category} 
                  onClick={handleChangeCategory}>
                    {task.category}
                </span>}
            </>
            return (
              <li key={task.id}>
                <CheckBox 
                  id={task.id} 
                  label={label} 
                  onChange={handleChangeCheckBox}
                  initiallyChecked={task.checked}/>
                {' '}
                <RemoveButton onClick={e => handleRemoveTask(task.id)}/>
              </li>
            )
          })}
        </ul>
      </form>
    </div>
  )
}

export default Content