import { Fragment, useState } from 'react';
import { useLocation } from 'react-router';

import './footer.scss';
import {AiTwotoneHome} from 'react-icons/ai';
import {BsInfoCircleFill} from 'react-icons/bs';

import AboutModal from './about-modal/AboutModal';
import { useEffect } from 'react';

const Footer = () => {

    const [homeBubble,setHomeBubble] = useState(false);
    const [aboutBubble,setAboutBubble] = useState(false);
    const [showAboutModal,setShowAboutModal] = useState(false);
    const [homePage,setHomePage] = useState(null);
    const {pathname} = useLocation();


    useEffect( ()=>{
        if(pathname === '/emulator')
            setHomePage(true)
        else
            setHomePage(false);
    },[pathname])

    const HomeSiteHandler = () => alert('Under Construction. Sorry !');
    const AboutEmulatorHandler = () => setShowAboutModal(!showAboutModal);

    const OpenHomeBubble = () => setHomeBubble(true), CloseHomeBubble = () => setHomeBubble(false);
    const OpenAboutBubble = () => setAboutBubble(true), CloseAboutBubble = () => setAboutBubble(false);
 
    return (
        <Fragment>
            <footer className={homePage ? 'footer' : 'footer footer-color-outside-home-page'}>
                <AiTwotoneHome className='icon' onClick={HomeSiteHandler} onMouseEnter={OpenHomeBubble} onMouseLeave={CloseHomeBubble}/>
                <BsInfoCircleFill className='icon' onClick={AboutEmulatorHandler} onMouseEnter={OpenAboutBubble} onMouseLeave={CloseAboutBubble}/>
                { homeBubble && <div className='info-bubble'>Home</div>}
                { aboutBubble && <div className='info-bubble'>About</div>}
            </footer>
            {showAboutModal && <AboutModal closeModal={AboutEmulatorHandler}/> }
        </Fragment>
    )
}

export default Footer;