import styles from './TextBox.module.css'

function TextBox({ placeholder }) {
  return (
    <input className={styles['text-box']} type="text" placeholder={placeholder} />
  )
}

export default TextBox