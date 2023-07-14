import styles from './Footer.module.css';
import { usePaginate } from '../../hooks/usePaginate';
import { useFunctions } from '../../hooks/useFunctions';

export const Footer = () => {
  const { Link } = useFunctions();
  
  return (
    <div>
    
    <footer className="seccion-oscura d-flex flex-column align-items-center justify-content-center">
      <div className={styles.containerFooterIcons}>
        <a href="https://www.linkedin.com/in/antonio-silva-developer/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-linkedin"></i>
        </a>
        <a href="https://github.com/Asilvazavala?tab=repositories" target="_blank" rel="noopener noreferrer" >
          <i className="bi bi-github"></i>
        </a>
        <Link to='/contact' target="_blank" rel="noopener noreferrer">
          <i className="bi bi-envelope"></i>
        </Link>
      </div>
      <div className={styles.footerDerechosAutor}>
        Creado por Antonio Silva (2023) &#169;
      </div>
    </footer>

    </div>
  )
}