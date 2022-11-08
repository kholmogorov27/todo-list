import styles from './RemoveButton.module.css'

function RemoveButton({ onClick }) {
  return (
    <div 
      className={styles['remove-button'] + ' hover-active'} 
      onClick={onClick}>
        ❌
    </div>
  )
}

export default RemoveButton