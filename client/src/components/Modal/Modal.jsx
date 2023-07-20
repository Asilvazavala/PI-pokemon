import styles from './Modal.module.css'

export const Modal = ({ 
  setShowModal, 
  titulo='titulo', 
  mensaje='mensaje', 
  textButton1='aceptar', 
  textButton2='cancelar', 
  handleFunction 
}) => {
  
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseButton}>
          <i onClick={() => setShowModal(false)} className='bx bx-window-close'></i> 
        </div>

        <div className={styles.title}>
          <h3>{titulo}</h3>
        </div>

        <div className={styles.body}>
          <p>{mensaje}</p>
        </div>

        <div onClick={() => setShowModal(false)} className={styles.footer}>
          <span className={styles.fisrtButton} onClick={handleFunction}>{textButton1}</span>
          <span className={styles.secondButton} onClick={() => setShowModal(false)}>{textButton2}</span>
        </div>

      </div>
    </div>
  )
}