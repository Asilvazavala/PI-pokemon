import styles from './NavBar.module.css';
import { SearchBar } from './SearchBar/SearchBar';
import { useSearchBar } from '../../hooks/useSearchBar';
import { useFunctions } from '../../hooks/useFunctions';
import { MenuMobile } from '../../images/SVG/MenuMobile'
import { CloseMenuMobile } from '../../images/SVG/CloseMenuMobile'
import { PlusIcon } from '../../images/SVG/PlusIcon'
import { HomeIcon } from '../../images/SVG/HomeIcon'
import { ToastContainer } from 'react-toastify'

export const NavBar = () => {
  const { sidebarState, setSidebarState } = useSearchBar();
  const { location, NavLink } = useFunctions();

  return (
    <section className={styles.container}>
      <ToastContainer />
      <nav className={styles.navbar}>
        <ul className={styles.link_group}>
          <li><a className={styles.logo} href="/">POKEMON</a></li>
          <NavLink 
            to="/home" 
            style={{textDecoration: 'none', color: 'rgba(255, 255, 255, 0.8)'}} 
            className={location.pathname === "/home" ? styles.activeLink : styles.link}>
            <h2>Home</h2>
          </NavLink>
          <NavLink 
            to="/create" 
            style={{textDecoration: 'none', color: 'rgba(255, 255, 255, 0.8)'}} 
            className={location.pathname === "/create" ? styles.activeLink : styles.link}>
            <h2>Create your game!</h2>
          </NavLink>
        </ul>

        <article className={styles.link_group}>
          <SearchBar setSidebarState={setSidebarState} />
        </article>
      </nav>     

      {/* Mobile navbar */}
      <nav className={styles.mobile_navbar}>
        <NavLink style={{textDecoration: 'none'}} to="/">
          <h1 className={styles.logo}>POKEMON</h1>
        </NavLink>
        <span
          className={styles.sidebar_trigger}
          onClick={() => setSidebarState(true)}
        >
          <MenuMobile />
        </span>
      </nav>

      { sidebarState &&
      <main
        className={`${styles.sidebar} ${
          sidebarState ? styles.active_sidebar : null
        }`}
      >
        <aside className={styles.sidebar_content}>
          <span
            onClick={() => setSidebarState(false)}
            className={styles.close_sidebar}
          >
            <CloseMenuMobile />
          </span>
          <hr />
          <NavLink
            to="/home"
            style={{textDecoration: 'none', color: 'rgba(255, 255, 255, 0.8)', height: '5rem', display: 'flex', alignItems: 'center'}} 
            className={location.pathname === "/home" ? styles.activeLink : styles.link}
            onClick={() => setSidebarState(false)}
          >
            <h2>Home</h2>
            <HomeIcon />
          </NavLink>
          <NavLink
            to="/create"
            style={{textDecoration: 'none', color: 'rgba(255, 255, 255, 0.8)', height: '5rem', display: 'flex', alignItems: 'center'}} 
            className={location.pathname === "/create" ? styles.activeLink : styles.link}
            onClick={() => setSidebarState(false)}
          >
            <h2>Create your pokemon!</h2>
            <PlusIcon />
          </NavLink>
          <footer>
            <SearchBar setSidebarState={setSidebarState} />
          </footer>
        </aside>
      </main>
      }
    </section>
  )
}
