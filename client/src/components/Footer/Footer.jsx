import styles from './Footer.module.css';

export const Footer = () => {  
  return (
    <main className={styles.containerFooter}>
      <section className={styles.textFooter}>
        Made by Antonio Silva (2023)
      </section>

      <section className={styles.iconsFooter}>
        <a href="https://www.linkedin.com/in/antonio-silva-developer/" target="_blank" rel="noopener noreferrer">
          <i className='bx bxl-linkedin-square'></i>
        </a>
        <a href="https://github.com/Asilvazavala" target="_blank" rel="noopener noreferrer" >
          <i className='bx bxl-github'></i>
        </a>
        <a href="https://antonio-silva-portfolio.onrender.com/" target="_blank" rel="noopener noreferrer" >
          <i className='bx bxs-briefcase'></i>
        </a>
      </section>
    </main>
  )
}