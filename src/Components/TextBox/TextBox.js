import { useState } from 'react'
import styles from './TextBox.module.css'

function TextBox({ placeholder, onDone }) {
  const [value, setValue] = useState('')

  const handleInput = e => {
    setValue(e.target.value)
  }
  const handleBlur = e => {
    if (value !== '') {
      onDone(value)
      setValue('')
    }
  }

  return (
    <div className={styles['wrapper']}>
      <input 
        className={value ? styles['text-box'] + ' ' + styles['active'] : styles['text-box']} 
        placeholder={placeholder} 
        onChange={handleInput} 
        onBlur={handleBlur} 
        value={value}
        type="text" />
      <div className={value ? styles['button-wrapper'] + ' ' + styles['active'] : styles['button-wrapper']}>
        <span className={styles['button']}>👌</span>
      </div>
    </div>
  )
}

export default TextBox