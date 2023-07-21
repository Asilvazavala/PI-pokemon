import styles from './Landing.module.css'
import { useFunctions } from '../../hooks/useFunctions'

export const Landing = () => {
  const { Link } = useFunctions();

  return (
    <main className={styles.containerLanding}>
       <section className={styles.home}>
         <header className={styles.homeContent}>
          <h1>Welcome POKEFAN</h1>
          <h3>Catch ´em all</h3>
          <aside className={styles.btnBox}>
            <Link className={styles.Link} to='/home'>
              <button>LET´S GO</button>
            </Link>
          </aside>
        </header>

        <footer className={styles.homeSci}>
          <a target="_blank" rel="noopener noreferrer" href="https://antonio-silva-portfolio.onrender.com/"><i className='bx bxs-briefcase'></i></a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/antonio-silva-developer/"><i className='bx bxl-linkedin'></i></a>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Asilvazavala?tab=repositories"><i className='bx bxl-github'></i></a>
        </footer>
      </section>
    </main>
  )
}
