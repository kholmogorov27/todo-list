import styles from './VerticalSeparator.module.css'

function VerticalSeparator({ height }) {
  return (
    <div className={styles['vertical-separator']} style={{height: height}}></div>
  )
}

export default VerticalSeparator