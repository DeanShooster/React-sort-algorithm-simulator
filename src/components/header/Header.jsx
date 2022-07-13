import { useState } from 'react';

import './header.scss';
import {RiMenu3Fill} from 'react-icons/ri';

import NavBar from './navBar/NavBar';

const Header = () => {

    const [windowWidth,setWindowWidth] = useState( window.innerWidth );
    const [navBurgerBar,setNavBurgerBar] = useState(false);

    window.addEventListener('resize',()=>{
        setWindowWidth( window.innerWidth );
    })

    const navBurgerBarHandler = () => setNavBurgerBar(!navBurgerBar);

    return (
        <header>
            <div className='website-title'>
                <h1>XAcademy</h1>
                <p>Sorting and Algorithms Simulator</p>
            </div>
            { windowWidth > 800 ? <NavBar className='nav' /> : null }
            { windowWidth > 800 ? null : <RiMenu3Fill className='burger-menu-svg' onClick={navBurgerBarHandler}/> }
            { windowWidth < 800 && navBurgerBar && <NavBar className='nav-burger-bar' />}
        </header>
    )
}

export default Header;