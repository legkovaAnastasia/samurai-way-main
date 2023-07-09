import s from './Navbar.module.css'
export const NavBar = () => {
    return    <nav className={s.nav}>
        <div className={`${s.item} ${s.active}`}><a>profile</a></div>
        <div className={s.item}><a>messages</a></div>
        <div className={s.item}><a>news</a></div>
        <div className={s.item}><a>music</a></div>
        <div className={s.item}><a>settings</a></div>
    </nav>
}