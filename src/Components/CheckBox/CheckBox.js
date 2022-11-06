import { useState } from 'react'
import styles from './CheckBox.module.css'

function CheckBox({ label, initiallyChecked=false }) {
  const [checked, setChecked] = useState(initiallyChecked)

  const handleChange = e => {
    setChecked(c => !c)
  }

  return (
    <label className={styles['container']}>
      {label}
      <input type="checkbox" defaultChecked={checked} onChange={handleChange} />
      <span className={styles['checkmark']} />
    </label>
  )
}

export default CheckBox