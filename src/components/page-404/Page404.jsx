import { NavLink } from 'react-router-dom';

import './page404.scss';

const Page404 = () => {
    return (
        <div className='page404'>
            <h1>Sorry !</h1>
            <p>The page you have been looking for could not been found...<br></br> This error is probably a wrong URL address so please recheck your URL address.</p>
            <p>Please return to: <NavLink to='/emulator'>HomePage</NavLink></p>
        </div>
    )
}

export default Page404;