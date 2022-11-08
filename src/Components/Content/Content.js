import TextBox from '../TextBox/TextBox'
import CheckBox from '../CheckBox/CheckBox'
import RemoveButton from '../RemoveButton/RemoveButton'
import styles from './Content.module.css'

function Content({ selectedCategory, data, onCategoryChange, onNewTask, onCheckBoxChange, onTaskDelete }) {
  let tasks = []
  
  // Getting all the tasks
  const _tasks = tasks
  for (const category in data) {
    if (Object.hasOwnProperty.call(data, category)) {
      data[category].forEach(task => {
        _tasks.push(task)
      })
    }
  }
  
  // Filtering tasks according to the selected category
  if (selectedCategory !== 'All') {
    tasks = tasks.filter(t => t.category === selectedCategory)
  }

  return (
    <div className={styles['content']}>
      <h1>{selectedCategory}</h1>
      <form>
        <TextBox 
          placeholder={`Add a new task inside "${selectedCategory}" category`} 
          onDone={taskTitle => onNewTask(taskTitle, selectedCategory)}/>
        <ul className={styles['list']}>
          {tasks.map(task => {
            const label = 
            <>
              {task.title}
              {task.category !== 'Uncategorized' && 
                <span 
                  className={styles['task-tag']} 
                  name={task.category} 
                  onClick={onCategoryChange}>
                    {task.category}
                </span>}
            </>
            return (
              <li key={task.id}>
                <CheckBox 
                  id={task.id} 
                  label={label} 
                  onChange={onCheckBoxChange} 
                  additional={task.category} 
                  initiallyChecked={task.checked}/>
                {' '}
                <RemoveButton onClick={e => onTaskDelete(task.category, task.id)}/>
              </li>
            )
          })}
        </ul>
      </form>
    </div>
  )
}

export default Content