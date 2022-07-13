import {NavLink, useLocation} from 'react-router-dom';

const NavBar = ( {className} ) => {

    const {pathname} = useLocation();

    const nestedPages = ( {isActive} ) =>{
        return isActive ? { color: 'rgb(236, 204, 75)',transform: 'scale(1.15)', textDecoration: 'underline' } : null
    }

    const mainPage = ( {isActive} ) => {
        if(pathname === '/emulator')
            return isActive ? { color: 'rgb(236, 204, 75)',transform: 'scale(1.15)', textDecoration: 'underline' } : null
    }

    return (
        <nav className={className}>
            <NavLink to='/' style={mainPage}>Main</NavLink>
            <NavLink to='/sort' style={nestedPages}>Sort</NavLink>
            <NavLink to='/algorithm' style={nestedPages}>Algorithm</NavLink>
        </nav>
    )
}

export default NavBar;